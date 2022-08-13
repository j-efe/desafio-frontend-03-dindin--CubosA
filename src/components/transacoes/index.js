import './styles.css';

import lapis from '../../assets/lapis.png'
import lixeira from '../../assets/lixeira.png'

import { format } from 'date-fns';
import { useState } from 'react';

import ModalExcluirTransacoes from '../../components/modal-excluir-transacao';

export default function MapTransacoes({ registro, diaSemana, setModalEditarTransacaoInfos, setAtualizarTransacoes, atualizarTransacoes }) {

    const [modalExcluirTransacaoInfos, setmodalExcluirTransacaoInfos] = useState(false)


    return (

        <div className='container__Home__content__infos__left__transactions__each'
            key={registro.id}>

            <span className='transactions__each__date' >{format(new Date(registro.data), "dd/MM/yyyy")}</span>

            <span>{diaSemana[new Date(registro.data).getDay()]}</span>

            <span>{registro.descricao}</span>
            <span>{registro.categoria_nome}</span>
            <span className={`transactions__each__value 
                  ${registro.tipo === 'entrada' ? 'transactions__each__value__entry' : 'transactions__each__value__exit'}`}>
                R${(registro.valor / 100).toFixed(2)}</span>

            <img className='transactions__each__edit' src={lapis} alt="lapis"
                onClick={() => setModalEditarTransacaoInfos(registro)} />
            <img
                onClick={() => setmodalExcluirTransacaoInfos(registro)}
                className='transactions__each__delete' src={lixeira} alt="lixeira"
            />
            {modalExcluirTransacaoInfos &&
                <ModalExcluirTransacoes
                    modalExcluirTransacaoInfos={modalExcluirTransacaoInfos}
                    setAtualizarTransacoes={setAtualizarTransacoes}
                    atualizarTransacoes={atualizarTransacoes}
                    setmodalExcluirTransacaoInfos={setmodalExcluirTransacaoInfos}
                />}

        </div>
    )
}