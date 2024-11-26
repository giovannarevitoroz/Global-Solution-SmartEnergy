import style from "./TermosDeUso.module.css"
import Link from 'next/link';

const TermosDeUso = () => {

    return (

        <>
            <h1 className={style.title}>Termos de uso</h1>

            <div className={style.DivContent}>
                <h2>Lorem ipsun</h2>
                <p>s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

            <div className={style.DivContent}>
                <h2>Lorem ipsun</h2>
                <p>s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

            <div className={style.DivContent}>
                <h2>Lorem ipsun</h2>
                <p>s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            
            <div className={style.DivEspaco}></div>
            <Link href="./Cadastro" className={style.voltar}>Voltar</Link>
            <div className={style.DivEspaco}></div>
        </>
    )
}

export default  TermosDeUso;