"use client";
import Sidebar from "../Sidebar/page";
import { useEffect, useState } from "react";
import styles from "./Projetos.module.css";

interface TipoFonte {
  idTipoFonte: number;
  nome: string | null;
}

interface RegiaoSustentavel {
  idRegiaoSustentavel: number;
  nome: string | null; 
}

interface Projeto {
  idProjeto: number;
  descricao: string;
  custo: number;
  status: string;
  tipoFonte: TipoFonte;
  regiaoSustentavel: RegiaoSustentavel;
}

const tipoFonteMap: { [key: number]: string } = {
  1: "Solar",
  2: "Eólica",
  3: "Hidrelétrica",
  4: "Geotérmica",
  5: "Biomassa",
};

const regiaoMap: { [key: number]: string } = {
  1: "Norte",
  2: "Sul",
  3: "Leste",
  4: "Oeste",
  5: "Centro-Oeste",
};

const Projetos = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/smart-energy/rest/projetos-sustentaveis")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar projetos");
        }
        return response.json();
      })
      .then((data) => setProjetos(data))
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <h1 className={styles.titulo}>Projetos</h1>
      <div className={styles.container}>
        {projetos.length > 0 ? (
          projetos.map((projeto) => (
            <div key={projeto.idProjeto} className={styles.projetoContainer}>
              <h2 className={styles.nomeProjeto}>Projeto ID: {projeto.idProjeto}</h2>
              <p className={styles.descricao}>Descrição: {projeto.descricao}</p>
              <p className={styles.custo}>Custo: R$ {projeto.custo.toFixed(2)}</p>
              <p className={styles.status}>Status: {projeto.status}</p>
              <p className={styles.tipoFonte}>
                Tipo de Fonte: {tipoFonteMap[projeto.tipoFonte.idTipoFonte]}
              </p>
              <p className={styles.regiao}>
                Região: {regiaoMap[projeto.regiaoSustentavel.idRegiaoSustentavel]}
              </p>
            </div>
          ))
        ) : (
          <p>Carregando projetos...</p>
        )}
      </div>
    </>
  );
};

export default Projetos;