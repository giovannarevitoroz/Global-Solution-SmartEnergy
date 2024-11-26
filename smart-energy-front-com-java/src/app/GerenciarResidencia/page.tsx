"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar/page";
import styles from "./GerenciarResidencia.module.css";

const GerenciarResidencia = () => {
  const [idResidencia, setIdResidencia] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState(""); 
  const [complemento, setComplemento] = useState("");
  const [cpfUsuario, setCpfUsuario] = useState("");
  const [usuario, setUsuario] = useState(null); 
  const router = useRouter(); 

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    const residencia = localStorage.getItem('residencia');
    if (!usuario || !residencia) {
      router.push('/Login');
    } else {
      const parsedUsuario = JSON.parse(usuario);
      const parsedResidencia = JSON.parse(residencia);
      setUsuario(parsedUsuario); 

      if (parsedResidencia.cep) {
        const cepSemTraco = parsedResidencia.cep.replace('-', '');
        setIdResidencia(parsedResidencia.idResidencia);
        setCep(cepSemTraco);
        setLogradouro(parsedResidencia.logradouro);
        setBairro(parsedResidencia.bairro);
        setLocalidade(parsedResidencia.localidade);
        setEstado(parsedResidencia.estado);
        setNumero(parsedResidencia.numero);
        setComplemento(parsedResidencia.complemento);
        setCpfUsuario(parsedResidencia.cpfUsuario);
      }
    }
  }, [router]);

  // Função para buscar informações da API ViaCEP
  const buscarEndereco = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setLocalidade(data.localidade);
        setEstado(data.estado);
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  // Handler para o campo CEP
  const handleCepChange = (e) => {
    const newCep = e.target.value;
    setCep(newCep);
    if (newCep.length === 8) {
      buscarEndereco(newCep);
    }
  };

  // Função para salvar ou atualizar a residência
  const salvarResidencia = async () => {
    const formatarCep = (cep: string) => {
      return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const cepFormatado = formatarCep(cep);

    const residencia = {
      idResidencia,
      cep: cepFormatado,
      logradouro,
      complemento,
      bairro,
      localidade,
      estado,
      numero,
      usuario 
    };

    try {
      const response = await fetch(`http://localhost:8080/smart-energy/rest/residencias/${idResidencia}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(residencia),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Erro da API:", errorMessage);
        throw new Error(`Erro: ${errorMessage}`);
      }

      alert("Residência salva/atualizada com sucesso!");
      localStorage.setItem("residencia", JSON.stringify(residencia));
      router.push("/"); 
    } catch (error) {
      console.error("Erro ao salvar a residência:", error);
      alert("Erro ao salvar a residência.");
    }
  };

  // Função para deletar a residência
  const deletarResidencia = async () => {
    try {
      const response = await fetch(`http://localhost:8080/smart-energy/rest/residencias/${idResidencia}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Erro da API:", errorMessage);
        throw new Error(`Erro: ${errorMessage}`);
      }

      alert("Residência deletada com sucesso!");
      localStorage.removeItem("residencia");
      router.push("/"); 
    } catch (error) {
      console.error("Erro ao deletar a residência:", error);
      alert("Erro ao deletar a residência.");
    }
  };

  // Função para voltar à página inicial
  const voltarPagina = () => {
    router.push("/");
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Gerenciar Residência</h1>
        <form onSubmit={(e) => { e.preventDefault(); salvarResidencia(); }}>
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            maxLength="8"
            required
            placeholder="CEP"
            className={styles.input}
          />
          <input
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            required
            placeholder="Logradouro"
            className={styles.input}
          />
          <input
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            placeholder="Complemento"
            className={styles.input}
          />
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
            placeholder="Bairro"
            className={styles.input}
          />
          <input
            type="text"
            value={localidade}
            onChange={(e) => setLocalidade(e.target.value)}
            required
            placeholder="Cidade"
            className={styles.input}
          />
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            placeholder="Estado"
            className={styles.input}
          />
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
            placeholder="Número"
            className={styles.input}
          />
          <div className={styles.divisor}></div>
          <button
            type="submit"
            className={styles.botaoSalvar}
          >
            Salvar/Atualizar Residência
          </button>
        </form>
        <button
          type="button"
          onClick={deletarResidencia}
          className={styles.botaoVoltar}
        >
          Deletar Residência
        </button>
        <button
          type="button"
          onClick={voltarPagina}
          className={styles.botaoVoltar}
        >
          Voltar
        </button>
      </div>
    </>
  );
};

export default GerenciarResidencia;