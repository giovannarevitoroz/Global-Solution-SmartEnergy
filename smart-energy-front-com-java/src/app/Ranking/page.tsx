"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/page";

const Ranking = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar usuários do endpoint
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/smart-energy/rest/usuarios");
        if (!response.ok) {
          throw new Error("Erro ao buscar os usuários.");
        }
        const data = await response.json();
        
        // Ordenando os usuários por gastoMensal em ordem decrescente
        const usuariosOrdenados = data.sort((a, b) => a.gastoMensal - b.gastoMensal);
        
        setUsuarios(usuariosOrdenados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Exibir os dados ou mensagem de erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Sidebar />
      <div>
        <h1>Ranking de Gasto Mensal</h1>
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Gasto Mensal</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={usuario.cpfUsuario}>
                <td>{index + 1}</td>
                <td>{usuario.nomeUsuario}</td>
                <td>{usuario.gastoMensal.toFixed(2)} KWh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Ranking;