// "use client";
// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useRouter } from 'next/navigation';
// import styles from './Login.module.css';
// import Link from 'next/link';
// import '../reset.css';

// interface LoginData {
//     nomeUsuario: string; // Campo para o nome do usuário
//     senha: string; // Campo para a senha
// }

// // Validação dos campos de login com Yup
// const schema = yup.object().shape({
//     nomeUsuario: yup.string().required('Nome é obrigatório'),
//     senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
// });

// const Login: React.FC = () => {
//     const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
//         resolver: yupResolver(schema),
//     });

//     const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro exibida ao usuário
//     const router = useRouter();

//     const onSubmit = async (data: LoginData) => {
//         // try {
//         //     // Conexão com a API para autenticação
//         //     const response = await fetch('http://localhost:8080/sprint4-java/rest/auth/login', {
//         //         method: 'POST', // Método POST para enviar os dados do login
//         //         headers: {
//         //             'Content-Type': 'application/json', // Especifica que o corpo da requisição está em JSON
//         //         },
//         //         body: JSON.stringify(data), // Dados de login enviados no corpo da requisição
//         //     });

//         //     if (response.ok) {
//         //         const result = await response.json(); // Obtém os dados retornados pela API em caso de sucesso
//         //         const usuarioData = {
//         //             cpfUsuario: result.cpfUsuario, // CPF retornado pela API
//         //             nomeUsuario: result.nomeUsuario, // Nome do usuário retornado
//         //             email: result.email, // Email retornado
//         //             senha: data.senha, // Senha enviada (não retorna da API)
//         //             telefone: result.telefone, // Telefone retornado
//         //         };
//         //         // Armazena os dados do usuário no localStorage
//         //         localStorage.setItem('usuario', JSON.stringify(usuarioData));

//         //         alert('Login realizado com sucesso!'); // Mensagem de sucesso
//         //         router.push('/'); // Redireciona para a página inicial
//         //     } else {
//         //         const errorData = await response.json(); // Obtém a mensagem de erro retornada pela API
//         //         setErrorMessage(errorData.message || 'Erro no login. Verifique suas credenciais.');
//         //     }
//         // } catch (error) {
//         //     setErrorMessage('Erro ao tentar conectar à API.'); // Mensagem de erro em caso de falha na conexão
//         // }
//     };

//     useEffect(() => {
//         // Verifica se o usuário já está logado ao carregar a página
//         const usuario = localStorage.getItem('usuario');
//         if (usuario) {
//             router.push('/'); // Redireciona para a página inicial se o usuário já estiver logado
//         }
//     }, [router]);

//     return (
//         <>
//             <div className={styles.container}>

//                 <img src="./Imagens/Login.png" alt="" className={styles.imgmaior}/>



//                 <h1 className={styles.titulo}>Login</h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className={styles.formulario}>
//                         <Controller
//                             name="nomeUsuario"
//                             control={control}
//                             defaultValue=""
//                             render={({ field }) => (
//                                 <input
//                                     {...field}
//                                     placeholder="Nome de usuário"
//                                     className={`${errors.nomeUsuario ? styles.inputError : ''} ${styles.input}`}

//                                 />
//                             )}
//                         />
//                         {errors.nomeUsuario && <p className={styles.error}>{errors.nomeUsuario.message}</p>}
//                     </div>
//                     <div className={styles.formulario}>
//                         <Controller
//                             name="senha"
//                             control={control}
//                             defaultValue=""
//                             render={({ field }) => (
//                                 <input
//                                     {...field}
//                                     type="password"
//                                     placeholder="Senha"
//                                     className={`${errors.senha ? styles.inputError : ''} ${styles.input}`}
//                                 />
//                             )}
//                         />
//                         {errors.senha && <p className={styles.error}>{errors.senha.message}</p>}
//                     </div>
//                     {errorMessage && <p className={styles.error}>{errorMessage}</p>}
//                     <button className={styles.botao} type="submit">
//                         Entrar
//                     </button>
//                     <div className={styles.linkCadastro}>
//                         <Link href="/Cadastro">Não tem uma conta? Cadastre-se</Link>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default Login;


"use client";
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import Link from 'next/link';
import '../reset.css';

interface LoginData {
    email: string; // Campo para o nome do usuário
    senha: string; // Campo para a senha
}

// Validação dos campos de login com Yup
const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

const Login: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro exibida ao usuário
    const router = useRouter();

    const onSubmit = async (data: LoginData) => {
        try {
            const response = await fetch('http://localhost:8080/smart-energy/rest/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                const usuarioData = {
                    cpfUsuario: result.cpfUsuario,
                    nomeUsuario: result.nomeUsuario,
                    email: result.email,
                    senha: result.senha,
                    telefone: result.telefone,
                    gastoMensal: result.gastoMensal
                };
                localStorage.setItem('usuario', JSON.stringify(usuarioData));

                // Verificar se o usuário tem uma residência associada
                const residenciaResponse = await fetch(`http://localhost:8080/smart-energy/rest/residencias/por-cpf/${result.cpfUsuario}`);
                if (residenciaResponse.ok) {
                    const residenciaData = await residenciaResponse.json();
                    localStorage.setItem('residencia', JSON.stringify(residenciaData)); // Salva a residência na localStorage
                } else {
                    console.log('Usuário não tem residência associada.');
                }

                alert('Login realizado com sucesso!');
                router.push('/');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Erro no login. Verifique suas credenciais.');
            }
        } catch (error) {
            setErrorMessage('Erro ao tentar conectar à API.');
        }
    };

    useEffect(() => {
        // Verifica se o usuário já está logado ao carregar a página
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            router.push('/'); // Redireciona para a página inicial se o usuário já estiver logado
        }
    }, [router]);

    return (
        <>
            <div className={styles.container}>
                <img src="./Imagens/Login.png" alt="" className={styles.imgmaior} />
                <h1 className={styles.titulo}>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formulario}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder={errors.email ? errors.email.message : 'Email'}
                                    className={`${errors.email ? styles.inputError : ''} ${styles.input}`}
                                />
                            )}
                        />
                    </div>
                    <div className={styles.formulario}>
                        <Controller
                            name="senha"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="password"
                                    placeholder={errors.senha ? errors.senha.message : 'Senha'}
                                    className={`${errors.senha ? styles.inputError : ''} ${styles.input}`}
                                />
                            )}
                        />
                    </div>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                    <div className={styles.divisor1}></div>
                    <div className={styles.divisor2}></div>

                    <button className={styles.botao} type="submit">
                        Entrar
                    </button>
                    <div className={styles.linkCadastro}>
                        <Link href="/Cadastro">Não tem uma conta? Cadastre-se</Link>
                    </div>

                    <div className={styles.desistirbotao}>
                        <Link className={styles.voltabotao} href={"/"}>Voltar</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
