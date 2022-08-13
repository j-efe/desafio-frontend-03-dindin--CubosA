import './styles.css';

import cross from '../../assets/cross.png'

import InputMask from 'react-input-mask';

import { parse, format } from 'date-fns'
import { getItem } from '../../utils/storage';
import { useState } from 'react';

export default function ModalEditarTransacoes({ categorias, clearModal, modalEditarTransacaoInfos, editarTransacao, atualizarTransacoes, setAtualizarTransacoes }) {

    const [warning, setWarning] = useState({ message: '', show: false })

    const tokenUsuario = getItem('token');

    const [infosAtuais, setInfosAtuais] = useState({
        "categoria_id": modalEditarTransacaoInfos.categoria_id,
        "categoria_nome": modalEditarTransacaoInfos.categoria_nome,
        "data": format(new Date(modalEditarTransacaoInfos.data), "dd/MM/yyyy"),
        "descricao": modalEditarTransacaoInfos.descricao,
        "id": modalEditarTransacaoInfos.id,
        "tipo": modalEditarTransacaoInfos.tipo,
        "usuario_id": modalEditarTransacaoInfos.usuario_id,
        "valor": (modalEditarTransacaoInfos.valor / 100).toFixed(2)
    })

    function onChange(evt) {
        const value = evt.target.value;
        const key = evt.target.name;

        console.log(value);

        setInfosAtuais(old => ({
            ...old,
            [key]: value
        }))
    }

    async function handleSubmitTranslation() {

        if (!infosAtuais.valor || !infosAtuais.categoria_id || !infosAtuais.data || !infosAtuais.descricao) {
            setWarning({ message: 'Todos os campos devem ser preenchidos!', show: true });
            setTimeout(() => setWarning({ message: '', show: false }), 5000);
            return
        }


        await editarTransacao({
            ...infosAtuais,
            "tipo": infosAtuais.tipo,
            "data": parse(infosAtuais.data, "dd/MM/yyyy", new Date()),
            "valor": parseInt(infosAtuais.valor * 100)
        }, tokenUsuario,
            infosAtuais.id)

        setAtualizarTransacoes(!atualizarTransacoes);

        clearModal();
    }

    return (

        <div className='modal-background'>

            <div className='modal__registro__transacao'>
                <h1>Editar Registro <img
                    onClick={clearModal}
                    className='modal__Editarregistro__transacao__cross' src={cross} alt="" /></h1>

                <div className='modal__registro__transacao__buttons'>

                    <button
                        className={infosAtuais.tipo === 'entrada' ? 'entrada__selecionado' : 'nao__Selecionado'}
                        onClick={() => setInfosAtuais({
                            ...infosAtuais,
                            "tipo": 'entrada'
                        })} >Entrada</button>

                    <button
                        className={infosAtuais.tipo === 'saida' ? 'saida__selecionado' : 'nao__Selecionado'}
                        onClick={() => setInfosAtuais({
                            ...infosAtuais,
                            "tipo": 'saida'
                        })} >Saída</button>

                </div>

                <div className='modal__registro__transacao__inputs'>

                    <label>Valor</label>
                    <input name='valor' id='valor' type="number"
                        value={infosAtuais.valor} onChange={onChange} />

                    <label>Categoria</label>
                    <select
                        id='categoria_id'
                        name='categoria_id'
                        value={infosAtuais.categoria_id}
                        onChange={onChange}
                    >
                        <option value='0' disabled></option>
                        {categorias && categorias.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.descricao}
                            </option>
                        ))}
                    </select>

                    <label>Data</label>
                    <InputMask mask="99/99/9999" name='data' id='data' type="text"
                        value={infosAtuais.data} onChange={onChange} />

                    <label>Descrição</label>
                    <input name='descricao' id='descricao' type="text"
                        value={infosAtuais.descricao} onChange={onChange} />

                    <span className='error'>{true && warning.message}</span>

                    <button onClick={() => handleSubmitTranslation()}>Confirmar</button>

                </div>
            </div>
        </div>
    )
}


