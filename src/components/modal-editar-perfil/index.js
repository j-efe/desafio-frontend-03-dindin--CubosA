import './styles.css';

import cross from '../../assets/cross.png'


import { getItem, setItem } from '../../utils/storage';
import { useState } from 'react';

export default function ModalEditarPerfil({ clearModal, editarPerfil, setUsuario }) {

    const [warning, setWarning] = useState({ message: '', show: false })

    const tokenUsuario = getItem('token');
    const emailUsuario = getItem('email');
    const nomeUsuario = getItem('nome');

    const [infosAtuais, setInfosAtuais] = useState({
        "nome": nomeUsuario,
        "email": emailUsuario,
        "senha": '',
        "confirmarSenha": ''
    })

    function onChange(evt) {
        const value = evt.target.value;
        const key = evt.target.name;

        setInfosAtuais(old => ({
            ...old,
            [key]: value
        }))
    }

    async function handleSubmitProfile() {

        if (!infosAtuais.nome || !infosAtuais.email || !infosAtuais.senha || !infosAtuais.confirmarSenha) {
            setWarning({ message: 'Todos os campos devem ser preenchidos!', show: true });
            setTimeout(() => setWarning({ message: '', show: false }), 5000);
            return
        }

        if (infosAtuais.senha !== infosAtuais.confirmarSenha) {
            setWarning({ message: 'As senhas devem ser iguais!', show: true });
            setTimeout(() => setWarning({ message: '', show: false }), 5000);
            return
        }

        await editarPerfil({
            "nome": infosAtuais.nome,
            "email": infosAtuais.email,
            "senha": infosAtuais.senha
        }, tokenUsuario)

        setItem('nome', infosAtuais.nome)
        setItem('email', infosAtuais.email)

        clearModal();

    }

    return (

        <div className='modal-background'>

            <div className='modal__registro__transacao'>
                <h1>Editar Perfil <img
                    onClick={clearModal}
                    className='modal__perfil__transacao__cross' src={cross} alt="cross" /></h1>


                <div className='modal__registro__transacao__inputs'>

                    <label>Nome</label>
                    <input name='nome' id='nome' type="text"
                        value={infosAtuais.nome} onChange={onChange} />

                    <label>Email</label>
                    <input name='email' id='email' type="text"
                        value={infosAtuais.email} onChange={onChange} />

                    <label>Senha</label>
                    <input name='senha' id='senha' type="password"
                        value={infosAtuais.senha} onChange={onChange} />

                    <label>Confirmar Senha</label>
                    <input name='confirmarSenha' id='confirmarSenha' type="password"
                        value={infosAtuais.confirmarSenha} onChange={onChange} />

                    <span className='error'>{true && warning.message}</span>

                    <button onClick={() => handleSubmitProfile()}>Confirmar</button>

                </div>
            </div>
        </div>
    )
}


