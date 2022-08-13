import './styles.css';

import cross from '../../assets/cross.png'

import InputMask from 'react-input-mask';

import { parse } from 'date-fns'

import { getItem } from '../../utils/storage';
import { useState } from 'react';

export default function ModalTransacoes({ changeType, formRegistro, setChangeType, onChange, categorias, clearModal, adicionarTransacao, atualizarTransacoes, setAtualizarTransacoes }) {

    const [warning, setWarning] = useState({ message: '', show: false })

    const tokenUsuario = getItem('token');

    async function handleSubmitTranslation() {

        if (!formRegistro.valor || !formRegistro.categoria_id || !formRegistro.data || !formRegistro.descricao) {
            setWarning({ message: 'Todos os campos devem ser preenchidos!', show: true });
            setTimeout(() => setWarning({ message: '', show: false }), 5000);
            return
        }

        const date = parse((formRegistro.data), "dd/MM/yyyy", new Date())
        const money = parseInt(formRegistro.valor * 100);

        await adicionarTransacao({
            ...formRegistro,
            "tipo": changeType,
            "data": date,
            "valor": money
        }, tokenUsuario)

        clearModal();

        setAtualizarTransacoes(!atualizarTransacoes);
    }


    return (
        <div className='modal-background'>

            <div className='modal__registro__transacao'>
                <h1>Adicionar Registro <img
                    onClick={clearModal}
                    className='modal__registro__transacao__cross' src={cross} alt="" /></h1>

                <div className='modal__registro__transacao__buttons'>

                    <button
                        className={changeType === 'entrada' ? 'entrada__selecionado' : 'nao__Selecionado'}
                        onClick={() => setChangeType('entrada')} >Entrada</button>

                    <button
                        className={changeType === 'saida' ? 'saida__selecionado' : 'nao__Selecionado'}
                        onClick={() => setChangeType('saida')} >Saída</button>

                </div>

                <div className='modal__registro__transacao__inputs'>

                    <label>Valor</label>
                    <input name='valor' id='valor' type="number"
                        value={formRegistro.valor} onChange={onChange} />

                    <label>Categoria</label>
                    <select
                        id='categoria_id'
                        name='categoria_id'
                        value={formRegistro.categoria_id}
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
                        value={formRegistro.data} onChange={onChange} />

                    <label>Descrição</label>
                    <input name='descricao' id='descricao' type="text"
                        value={formRegistro.descricao} onChange={onChange} />

                    <span className='error'>{true && warning.message}</span>

                    <button onClick={(() => handleSubmitTranslation())}>Confirmar</button>

                </div>
            </div>
        </div>
    )
}


