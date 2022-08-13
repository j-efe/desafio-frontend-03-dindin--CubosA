import './styles.css';
import { getItem } from '../../utils/storage';
import { useState } from 'react';
import BotaoFiltro from '../botao-filtro';


export default function AbaFiltro({ categorias, filtroTransacoes, setTransacoes, transacoesGerais }) {

    const tokenUsuario = getItem('token');

    const [acumuladorDeFiltro, setAcumuladorDeFiltro] = useState([]);

    const [resetarFiltros, setResetarFiltros] = useState(false)

    async function handleSubmitFilter() {
        if (acumuladorDeFiltro.length >= 1) {
            const arrayFormatado = acumuladorDeFiltro.join("&filtro[]=")

            const response = await filtroTransacoes(tokenUsuario, arrayFormatado);

            setTransacoes(response.message)

            setAcumuladorDeFiltro([]);

        } else {
            setTransacoes(transacoesGerais)
        }
    }

    function handleClearFilters() {
        setResetarFiltros(!resetarFiltros)

        setTransacoes(transacoesGerais)

    }


    return (
        <div className='aba__filtro'>
            <h1>Categoria</h1>

            <div className='aba__filtro__categorias'>
                {categorias.map((categoria) => (
                    <BotaoFiltro
                        key={categoria.id}
                        categoria={categoria}
                        acumuladorDeFiltro={acumuladorDeFiltro}
                        setAcumuladorDeFiltro={setAcumuladorDeFiltro}
                        resetarFiltros={resetarFiltros}
                    />
                ))}
            </div>

            <div className='aba__filtro__botoes'>
                <button
                    onClick={() => handleClearFilters()}
                    className='aba__filtro__botoes__limpar'>Limpar Filtros</button>


                <button
                    onClick={() => handleSubmitFilter()}
                    className='aba__filtro__botoes__aplicar'>Aplicar Filtros</button>
            </div>
        </div>
    )

}