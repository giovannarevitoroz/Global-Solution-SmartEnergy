"use client";
import Sidebar from "../Sidebar/page";
import { useEffect, useState } from "react";
import styles from "./CalculadoraEnergetica_Responses.module.css";

const CalculadoraEnergeticaResponse = () => {
  const [dados, setDados] = useState(null);
  const [corDiv, setCorDiv] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [statusPost, setStatusPost] = useState<string>("");
  const [envioConcluido, setEnvioConcluido] = useState(false); 
  const [cpfUsuario, setCpfUsuario] = useState(null);  // Estado para armazenar o CPF

  const mediaConsumo = 150; // Média estimada de consumo mensal em kWh.

  useEffect(() => {
    // Pegar os dados armazenados no localStorage
    const dadosArmazenados = JSON.parse(localStorage.getItem("calculoEnergia"));
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (dadosArmazenados && dadosArmazenados.totalMensal) {
      setDados(dadosArmazenados);
      setCpfUsuario(usuario?.cpfUsuario || null); 
      calcularStatus(dadosArmazenados.totalMensal);
    } else {
      setMensagem("Não há dados suficientes para exibir o consumo.");
      setCorDiv("grey");
    }
  }, []);  // Executa apenas uma vez, quando o componente for montado

  const calcularStatus = (consumo) => {
    if (consumo < mediaConsumo) {
      setCorDiv("lightgreen");
      setMensagem("Parabéns! Seu consumo está abaixo da média.");
    } else if (consumo === mediaConsumo) {
      setCorDiv("yellow");
      setMensagem("Seu consumo está na média.");
    } else {
      setCorDiv("salmon");
      setMensagem(
        "Seu consumo está acima da média. Considere seguir as dicas para economizar."
      );
    }
  };

  const criarPrevisaoEnergetica = (gastoMensal: number) => {
    // Verifica se o envio já foi feito
    if (envioConcluido || !cpfUsuario) return;

    const dataHoje = new Date().toISOString().split('T')[0]; // Formata a data de hoje no formato YYYY-MM-DD

    // Recupera os dados do usuário
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Monta a previsão com o usuário
    const previsao = {
      data: dataHoje,
      previsaoGasto: gastoMensal,
      statusPrevisao: "CONCLUIDO",
      usuario: {
        cpfUsuario: usuario?.cpfUsuario,
        nomeUsuario: usuario?.nomeUsuario,
        senha: usuario?.senha,
        email: usuario?.email,
        telefone: usuario?.telefone,
        gastoMensal: usuario?.gastoMensal,
      }
    };

    const residencia = JSON.parse(localStorage.getItem("residencia")); 
    if (residencia && residencia.usuario) {
      // Atualiza o gastoMensal no objeto 'usuario' dentro de 'residencia'
      residencia.usuario.gastoMensal = gastoMensal;
      
      localStorage.setItem("residencia", JSON.stringify(residencia));
    }

    // Exibe os dados de previsão para depuração
    console.log("Dados da previsão:", previsao);

    // Envia a previsão para a API
    fetch("http://localhost:8080/smart-energy/rest/previsao-energetica", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(previsao),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta da API:", data);
        setStatusPost("Previsão energética criada com sucesso!");
        setEnvioConcluido(true);  // Marca o envio como concluído
        
        // Atualiza o gasto mensal no localStorage e no estado
        usuario.gastoMensal = gastoMensal;  // Atualiza o gasto mensal do usuário
        localStorage.setItem("usuario", JSON.stringify(usuario));

        setDados((prevDados) => ({ ...prevDados, totalMensal: gastoMensal }));
      })
      .catch((error) => {
        console.error("Erro ao criar a previsão energética:", error);
        setStatusPost(`Erro ao criar a previsão energética: ${error.message}`);
      });
  };

  useEffect(() => {
    if (dados && !envioConcluido && dados.totalMensal) {
      criarPrevisaoEnergetica(dados.totalMensal);
    }
  }, [dados, envioConcluido]);

  return (
    <>
      <Sidebar />
      <h2 className={styles.titulo}>O seu gasto mensal é de {dados?.totalMensal || "0"} kWh</h2>
      <div
        className={styles.div}
        style={{
          backgroundColor: corDiv,
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <p>{mensagem}</p>
      </div>
      {dados?.totalMensal > mediaConsumo && (
        <div className={styles.contprincipal}>
          <h2>Considere experimentar as seguintes dicas para economizar energia:</h2>
          <p>
            1 - Desligue aparelhos em stand-by.<br />
            2 - Troque lâmpadas por LEDs.<br />
            3 - Ajuste a temperatura da geladeira.<br />
            4 - Use ventiladores em vez de ar-condicionado.<br />
            5 - Lave roupas com água fria.<br />
          </p>
        </div>
      )}
      <div className={styles.status}>{statusPost && <p>{statusPost}</p>}</div>
    </>
  );
};

export default CalculadoraEnergeticaResponse;

