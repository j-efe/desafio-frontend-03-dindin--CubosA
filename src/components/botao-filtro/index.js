import './styles.css';

import simboloMais from '../../assets/+.png';
import { useEffect, useState } from 'react';

export default function BotaoFiltro({ categoria, acumuladorDeFiltro, setAcumuladorDeFiltro, resetarFiltros }) {

    const [corBotao, setCorBotao] = useState(true)

    function handleBotao() {
        setCorBotao(!corBotao)
        if (corBotao) {
            setAcumuladorDeFiltro([...acumuladorDeFiltro, categoria.descricao])

        } else {
            const filtoArray = acumuladorDeFiltro.filter((event) => {
                return event !== categoria.descricao
            })
            setAcumuladorDeFiltro(filtoArray)
        }

    }

    useEffect(() => {
        setCorBotao(true)

    }, [resetarFiltros])

    return (

        <button
            className={corBotao ? 'cor__botao__cinza' : 'cor__botao__roxo'}
            onClick={() => handleBotao()}
            key={categoria.id}
        >{categoria.descricao} <img src={simboloMais} alt="simboloMais" /></button>

    )
}