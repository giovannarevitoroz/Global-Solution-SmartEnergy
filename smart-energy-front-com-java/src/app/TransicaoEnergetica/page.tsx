
// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar/page";
// import styles from "./TransicaoEnergetica.module.css";

// const CalculadoraEnergeticaRequest = () => {
//   const [nome, setNome] = useState("");
//   const [gastoMensal, setGastoMensal] = useState("");
//   const [areaDisponivel, setAreaDisponivel] = useState("");
//   const [rendaMensal, setRendaMensal] = useState("");
//   const [resultado, setResultado] = useState(null);

//   // Carregar informações do Local Storage
//   useEffect(() => {
//     const nomeSalvo = localStorage.getItem("nome");
//     if (nomeSalvo) setNome(nomeSalvo);
//   }, []);

//   const handleCalcular = () => {
//     // Verificar se todos os campos foram preenchidos
//     if (!gastoMensal || !areaDisponivel || !rendaMensal) {
//       alert("Por favor, preencha todos os campos.");
//       return;
//     }

//     // Cálculos básicos
//     const consumoMensal = parseFloat(gastoMensal) / 0.9; // Conversão para consumo bruto
//     const placasNecessarias = Math.ceil(consumoMensal / 330); // Considerando placas de 330W
//     const economiaMensal = parseFloat(rendaMensal) * 0.05; // 5% da renda
//     const tempoParaTransicao = Math.ceil((placasNecessarias * 800) / economiaMensal); // Supondo custo médio de R$800 por placa

//     // Salvar no Local Storage
//     const dados = {
//       nome,
//       gastoMensal,
//       areaDisponivel,
//       rendaMensal,
//       resultado: {
//         placasNecessarias,
//         economiaMensal,
//         tempoParaTransicao,
//         consumoMensal,
//       },
//     };
//     localStorage.setItem("dadosEnergiaSolar", JSON.stringify(dados));

//     setResultado({
//       placasNecessarias,
//       economiaMensal,
//       tempoParaTransicao,
//       consumoMensal,
//     });
//   };

//   return (
//     <>
//       <Sidebar></Sidebar>
//       <h2 className={styles.estilo01}>O Futuro Chegou! Mude para Energia Solar</h2>
//       <p className={styles.paragrafo01}>
//         Está pronto para reduzir sua conta de luz e investir em um futuro mais
//         sustentável? A transição para energia solar é mais fácil do que você
//         imagina.
//       </p>

//       <h2 className={styles.estilo02}>Para te ajudar, basta informar:</h2>
//       <p className={styles.paragrafo02}>
//         Seu Nome.
//         <br />
//         Quanto você gasta de energia por mês.            
//         <br />
//         Qual a área disponível para instalar os painéis.
//         <br />
   
//         Sua renda mensal.
//       </p>


//       <div className={styles.container}>
//         <h2 className={styles.titulodiv}>Calculadora</h2>
       
//           <input
//           className={styles.input}
//             type="text"
//             value={nome}
//             onChange={(e) => setNome(e.target.value)}
//             placeholder="Seu nome"
//           />
    
//         <br />
//           <input
//           className={styles.input}
//             type="number"
//             value={gastoMensal}
//             onChange={(e) => setGastoMensal(e.target.value)}
//             placeholder="Gasto em kwh por mês"
//           />

//         <br />


//           <input
//           className={styles.input}
//             type="number"
//             value={areaDisponivel}
//             onChange={(e) => setAreaDisponivel(e.target.value)}
//             placeholder="Área disponível em m2"
//           />

//         <br />

//           <input
//             type="number"
//             className={styles.input}
//             value={rendaMensal}
//             onChange={(e) => setRendaMensal(e.target.value)}
//             placeholder="Sua renda mensal"
//           />

//         <br />
//         <button onClick={handleCalcular} className={styles.botao}>Calcular</button>
    

//       <div className={styles.divisor}></div>

//       {resultado && (
//         <div>
//           <h2 className={styles.tituloresukltadio}>Resultados</h2>
//           <p className={styles.paragraforesultado}>
//             {nome}, com base nas informações fornecidas, você pode realizar a
//             transição para a energia solar em apenas{" "}
//             <strong>{resultado.tempoParaTransicao} meses</strong>, guardando{" "}
//             <strong>5% do seu salário</strong>, o equivalente a{" "}
//             <strong>R$ {resultado.economiaMensal.toFixed(2)}</strong> mensais.
//           </p>
//           <p className={styles.paragraforesultado}>
//             Com essa economia, você será capaz de instalar{" "}
//             <strong>{resultado.placasNecessarias} placas solares</strong>{" "}
//             (330W cada), cobrindo seu consumo médio de{" "}
//             <strong>{resultado.consumoMensal.toFixed(2)} kWh/mês</strong>.
//           </p>
//           <p className={styles.paragraforesultadoultimo}>
//             Essa transição vai permitir que você comece a economizar na sua
//             conta de energia imediatamente e invista no futuro de forma
//             sustentável.
//           </p>
//         </div>
//       )}

// </div>
//     </>
//   );
// };

// export default CalculadoraEnergeticaRequest;


"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/page";
import styles from "./TransicaoEnergetica.module.css";

const CalculadoraEnergeticaRequest = () => {
  const [nome, setNome] = useState("");
  const [gastoMensal, setGastoMensal] = useState("");
  const [areaDisponivel, setAreaDisponivel] = useState("");
  const [rendaMensal, setRendaMensal] = useState("");
  const [resultado, setResultado] = useState(null);

  // Carregar informações do Local Storage
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nome");
    if (nomeSalvo) setNome(nomeSalvo);
  }, []);

  const handleCalcular = () => {
    if (!gastoMensal || !areaDisponivel || !rendaMensal) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Cálculos revisados
    const consumoMensal = parseFloat(gastoMensal); // consumo bruto em kWh
    const horasSolDiarias = 5; // média Brasil
    const energiaPorPlacaMensal = 330 * horasSolDiarias * 30 / 1000; // kWh/mês
    const placasNecessarias = Math.ceil(consumoMensal / energiaPorPlacaMensal);

    const custoPorPlaca = 800; // custo médio de cada placa solar
    const economiaMensal = parseFloat(rendaMensal) * 0.05; // 5% da renda
    const custoTotal = placasNecessarias * custoPorPlaca;
    const tempoParaTransicao = Math.ceil(custoTotal / economiaMensal);

    // Validar área disponível
    const areaPorPlaca = 1.7 * 1; // 1,7m x 1m por placa
    const areaNecessaria = placasNecessarias * areaPorPlaca;
    if (areaNecessaria > parseFloat(areaDisponivel)) {
      alert("A área disponível não é suficiente para instalar as placas necessárias.");
      return;
    }

    // Salvar no Local Storage
    const dados = {
      nome,
      gastoMensal,
      areaDisponivel,
      rendaMensal,
      resultado: {
        placasNecessarias,
        economiaMensal,
        tempoParaTransicao,
        consumoMensal,
        areaNecessaria,
      },
    };
    localStorage.setItem("dadosEnergiaSolar", JSON.stringify(dados));

    setResultado({
      placasNecessarias,
      economiaMensal,
      tempoParaTransicao,
      consumoMensal,
      areaNecessaria,
    });
  };

  return (
    <>
      <Sidebar></Sidebar>
      <h2 className={styles.estilo01}>O Futuro Chegou! Mude para Energia Solar</h2>
      <p className={styles.paragrafo01}>
        Está pronto para reduzir sua conta de luz e investir em um futuro mais
        sustentável? A transição para energia solar é mais fácil do que você
        imagina.
      </p>

      <h2 className={styles.estilo02}>Para te ajudar, basta informar:</h2>
      <p className={styles.paragrafo02}>
        Seu Nome.
        <br />
        Quanto você gasta de energia por mês.
        <br />
        Qual a área disponível para instalar os painéis.
        <br />
        Sua renda mensal.
      </p>

      <div className={styles.container}>
        <h2 className={styles.titulodiv}>Calculadora</h2>

        <input
          className={styles.input}
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
        />
        <br />
        <input
          className={styles.input}
          type="number"
          value={gastoMensal}
          onChange={(e) => setGastoMensal(e.target.value)}
          placeholder="Gasto em kWh por mês"
        />
        <br />
        <input
          className={styles.input}
          type="number"
          value={areaDisponivel}
          onChange={(e) => setAreaDisponivel(e.target.value)}
          placeholder="Área disponível em m²"
        />
        <br />
        <input
          type="number"
          className={styles.input}
          value={rendaMensal}
          onChange={(e) => setRendaMensal(e.target.value)}
          placeholder="Sua renda mensal"
        />
        <br />
        <button onClick={handleCalcular} className={styles.botao}>
          Calcular
        </button>

        <div className={styles.divisor}></div>

        {resultado && (
          <div>
            <h2 className={styles.tituloresukltadio}>Resultados</h2>
            <p className={styles.paragraforesultado}>
              {nome}, com base nas informações fornecidas, você pode realizar a
              transição para a energia solar em apenas{" "}
              <strong>{resultado.tempoParaTransicao} meses</strong>, guardando{" "}
              <strong>5% do seu salário</strong>, o equivalente a{" "}
              <strong>R$ {resultado.economiaMensal.toFixed(2)}</strong> mensais.
            </p>
            <p className={styles.paragraforesultado}>
              Com essa economia, você será capaz de instalar{" "}
              <strong>{resultado.placasNecessarias} placas solares</strong>{" "}
              (330W cada), cobrindo seu consumo médio de{" "}
              <strong>{resultado.consumoMensal.toFixed(2)} kWh/mês</strong>.
            </p>
            <p className={styles.paragraforesultado}>
              A área necessária para instalação será de{" "}
              <strong>{resultado.areaNecessaria.toFixed(2)} m²</strong>.
            </p>
            <p className={styles.paragraforesultadoultimo}>
              Essa transição vai permitir que você comece a economizar na sua
              conta de energia imediatamente e invista no futuro de forma
              sustentável.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CalculadoraEnergeticaRequest;
