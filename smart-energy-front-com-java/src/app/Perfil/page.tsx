"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar/page";
import styles from "./Perfil.module.css";

const Perfil = () => {
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [gastoMensal, setGastoMensal] = useState<number>(0);
  const [bio, setBio] = useState<string>("");
  const [imagemUsuario, setImagemUsuario] = useState<string | null>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [usuarioPosicao, setUsuarioPosicao] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userCredentials = localStorage.getItem("usuario");
    let parsedUserCredentials: any = null;

    if (userCredentials) {
      parsedUserCredentials = JSON.parse(userCredentials);
      setGastoMensal(parsedUserCredentials.gastoMensal || 0);
      setNomeUsuario(parsedUserCredentials.email.split("@")[0]);
    } else {
      router.push("/");
      return;
    }

    const userBio = localStorage.getItem("userBio");
    const savedImage = localStorage.getItem("userImage");

    if (userBio) {
      setBio(userBio);
    } else {
      setBio("Bem-vindo(a) ao nosso sistema! Edite sua bio para personalizar esta seção.");
    }

    if (savedImage) {
      setImagemUsuario(savedImage);
    }

    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/smart-energy/rest/usuarios");
        if (!response.ok) {
          throw new Error("Erro ao buscar os usuários.");
        }
        const data = await response.json();
    
        // Ordenar os usuários pelo campo gastoMensal (do menor para o maior)
        const usuariosOrdenados = data.sort((a: any, b: any) => a.gastoMensal - b.gastoMensal);
    
        // Encontrar a posição do usuário específico (compara pelo CPF)
        const posicao = usuariosOrdenados.findIndex(
          (usuario: any) => usuario.cpfUsuario === parsedUserCredentials.cpfUsuario
        );
    
        setUsuarios(usuariosOrdenados);
        setUsuarioPosicao(posicao === -1 ? null : posicao + 1); 
      } catch (err) {
        console.error("Erro ao buscar ou processar os usuários:", err);
      }
    };
    
    fetchUsuarios();
  }, [router]);

  const editarBio = () => {
    router.push("/DashboardsUsuario");
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <img
          src={imagemUsuario || "/Imagens/imagenpadraouser.png"}
          alt="Imagem do usuário"
          className={styles.imagemUsuario}
        />
        <p className={styles.paragrafoBio}>
          Olá, sou {nomeUsuario || "Usuário"}. {bio}
        </p>
        <img
          src="/Imagens/penedit.png"
          alt=""
          onClick={editarBio}
          className={styles.editarBio}
        />
        <div className={styles.fundoAgendamentosPerfil}></div>

        <div className={styles.classificção}>
          <h2 className={styles.classificçãoT}>Classificação</h2>
          {usuarioPosicao !== null ? (
            <p>
              Você ocupa a {usuarioPosicao}° posição no ranking de maiores economistas de energia
            </p>
          ) : (
            <p>Você ainda não foi classificado no ranking.</p>
          )}
        </div>
        <div className={styles.divisor}></div>
        <div className={styles.classificção2}>
          <h2>Seus gastos</h2>
          <p>
            Você gastou {gastoMensal} KWh no mês!
          </p>
        </div>
      </div>
    </>
  );
};

export default Perfil;