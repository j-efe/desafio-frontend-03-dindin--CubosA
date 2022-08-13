import './styles.css';

import { excluirTransacao } from '../../services/api'

import { getItem } from '../../utils/storage';

export default function ModalExcluirTransacoes({ modalExcluirTransacaoInfos, atualizarTransacoes, setAtualizarTransacoes, setmodalExcluirTransacaoInfos }) {

    const tokenUsuario = getItem('token');

    async function handleSubmitDelete() {
        await excluirTransacao(tokenUsuario, modalExcluirTransacaoInfos.id);

        setAtualizarTransacoes(!atualizarTransacoes)
    }

    function clearModal() {
        setmodalExcluirTransacaoInfos(false)
    }

    return (

        <div className='modal__excluir__transacao'>
            <p>Apagar Item?</p>
            <div className='modal__excluir__transacao__botoes'>
                <button className='modal__excluir__transacao__sim'
                    onClick={() => handleSubmitDelete()}
                >Sim</button>
                <button className='modal__excluir__transacao__nao'
                    onClick={() => clearModal()}
                >Não</button>
            </div>
        </div>

    )

}