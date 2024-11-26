"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import styles from './Cadastro.module.css';
import Link from 'next/link';
import { useEffect } from "react";
import '../reset.css';

// Adicionando os termos ao schema de validação
const validationSchema = Yup.object().shape({
    cpfUsuario: Yup.string()
        .required("CPF é obrigatório."),
    nomeUsuario: Yup.string()
        .min(3, "Nome deve ter ao menos 3 caracteres.")
        .required("Nome é obrigatório."),
    senha: Yup.string()
        .min(6, "Senha deve ter ao menos 6 caracteres.")
        .required("Senha é obrigatória."),
    email: Yup.string()
        .email("Email inválido.")
        .required("Email é obrigatório."),
    telefone: Yup.string()
        .required("Telefone é obrigatório."),
    termosDeUso: Yup.boolean()
        .oneOf([true], "Você deve aceitar os termos de uso."),
    gastoMensal: Yup.number()
        .default(0) 
        .typeError("Gasto mensal deve ser um número.")
});

const Cadastro = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { gastoMensal: 0 } 
    });

    const onSubmit = async (data : any) => {
        try {
            const formattedData = {
                ...data,
                cpfUsuario: data.cpfUsuario.replace(/\D/g, ''), // Apenas dígitos
                telefone: data.telefone.replace(/\D/g, ''), // Apenas dígitos
            };
            const response = await fetch("http://localhost:8080/smart-energy/rest/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Erro da API:", errorMessage);
                throw new Error(`Erro: ${errorMessage}`);
            }
            alert('Cadastro realizado com sucesso!'); 
            router.push("/Login");
        } catch (error) {
            console.error("Erro ao salvar o usuário: ", error);
        }
    };

    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            router.push('/');
        }
    }, [router]);

    // Função para formatar CPF
    const formatCpf = (value) => {
        return value
            .replace(/\D/g, '') // Remove não números
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    };

    // Função para formatar telefone
    const formatTelefone = (value) => {
        return value
            .replace(/\D/g, '') // Remove não números
            .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona o DDD
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Adiciona o traço
    };

    return (
        <div className={styles.container}>
            <img src="./Imagens/Cadastro.png" alt="" className={styles.imagemcad} />
            <div className={styles.content2}>
                <h1 className={styles.titulo}>Cadastre-se</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formulario}>
                        <input
                            type="text"
                            id="cpfUsuario"
                            {...register("cpfUsuario")}
                            placeholder={errors.cpfUsuario ? errors.cpfUsuario.message : "CPF"}
                            className={errors.cpfUsuario ? styles.inputError : ""}
                            maxLength={14} // Limita ao tamanho formatado
                            onInput={(e) => {
                                e.target.value = formatCpf(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.formulario}>
                        <input
                            type="text"
                            id="nomeUsuario"
                            {...register("nomeUsuario")}
                            placeholder={errors.nomeUsuario ? errors.nomeUsuario.message : "Nome"}
                            className={errors.nomeUsuario ? styles.inputError : ""}
                        />
                    </div>
                    <div className={styles.formulario}>
                        <input
                            type="password"
                            id="senha"
                            {...register("senha")}
                            placeholder={errors.senha ? errors.senha.message : "Senha"}
                            className={errors.senha ? styles.inputError : ""}
                        />
                    </div>
                    <div className={styles.formulario}>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            placeholder={errors.email ? errors.email.message : "Email"}
                            className={errors.email ? styles.inputError : ""}
                        />
                    </div>
                    <div className={styles.formulario}>
                        <input
                            type="text"
                            id="telefone"
                            {...register("telefone")}
                            placeholder={errors.telefone ? errors.telefone.message : "Telefone"}
                            className={errors.telefone ? styles.inputError : ""}
                            maxLength={15} // Limita ao tamanho formatado
                            onInput={(e) => {
                                e.target.value = formatTelefone(e.target.value);
                            }}
                        />
                         <input
                                type="hidden"
                                id="gastoMensal"
                                {...register("gastoMensal")} 
                            />
                    </div>
                    <div className={styles.formulario}>
                        <input
                            type="checkbox"
                            id="termosDeUso"
                            {...register("termosDeUso")}
                            onChange={(e) => {
                                setValue("termosDeUso", e.target.checked);
                                trigger("termosDeUso"); // Força a validação
                            }}
                            className={styles.chekerbotao}
                        />
                        <label htmlFor="termosDeUso" className={styles.labelradio}>
                            <a href="./TermosDeUso" className={styles.linkq}>Aceitar os termos de uso</a>
                        </label>
                        {errors.termosDeUso && <p className={styles.error}>{errors.termosDeUso.message}</p>}
                    </div>
                    <div className={styles.divisor1}></div>
                    <div className={styles.divisor2}></div>

                    <button className={styles.botao} type="submit">Cadastrar</button>
                    <div className={styles.desistirbotao}>
                        <Link className={styles.voltabotao} href={"/"}>Voltar</Link>
                    </div>
                </form>
                <div className={styles.espacadorfinal}></div>
            </div>
        </div>
    );
};

export default Cadastro;
