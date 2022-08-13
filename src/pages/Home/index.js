import './styles.css'

import logo from '../../assets/Logo.svg'
import usuarioIcon from '../../assets/usuario.png'
import sair from '../../assets/sair.png'
import filtro from '../../assets/filtro.png'
import polygon from '../../assets/Polygon.png'

import { useNavigate } from "react-router-dom";

import { useState } from 'react'

import { transacoesUsuario, extratoUsuario, categoriasProdutos, adicionarTransacao, editarTransacao, editarPerfil, filtroTransacoes } from '../../services/api'

import { getItem, clearAll } from '../../utils/storage';

import { useEffect } from 'react';

import ModalTransacoes from '../../components/modal-registro';
import ModalEditarTransacoes from '../../components/modal-editar-registro';
import ModalEditarPerfil from '../../components/modal-editar-perfil';
import MapTransacoes from '../../components/transacoes';
import AbaFiltro from '../../components/aba-filtro'


function Home() {

  const diaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const navigate = useNavigate();

  const nomeUsuario = getItem('nome');
  const tokenUsuario = getItem('token');
  const emailUsuario = getItem('email');

  const [atualizarTransacoes, setAtualizarTransacoes] = useState(false)
  const [transacoes, setTransacoes] = useState([])
  const [extrato, setExtrato] = useState(false)
  const [categorias, setCategorias] = useState(false)
  const [changeType, setChangeType] = useState('saida')
  const [modalRegistroTransacao, setModalRegistroTransacao] = useState(false)
  const [modalEditarTransacaoInfos, setModalEditarTransacaoInfos] = useState(false)
  const [modalEditarPerfil, setModalEditarPerfl] = useState(false)
  const [filterInfos, setFilterlInfos] = useState(false)
  const [dataOrder, setDataOrder] = useState(true);
  const [transacoesGerais, setTransacoesGerais] = useState(false);

  const [formRegistro, setFormRegistro] = useState({
    valor: '',
    categoria_id: '0',
    data: '',
    descricao: ''
  });

  const [usuario, setUsuario] = useState({
    nome: nomeUsuario,
    email: emailUsuario,
    token: tokenUsuario
  })



  function handleLeave() {
    navigate('/')
    clearAll()

  }

  function onChange(evt) {
    const value = evt.target.value;
    const key = evt.target.name;

    setFormRegistro(old => ({
      ...old,
      [key]: value
    }))
  }

  function clearModal() {

    setUsuario({
      nome: getItem('nome'),
      email: getItem('email')
    });

    setModalRegistroTransacao(false);
    setModalEditarTransacaoInfos(false);
    setModalEditarPerfl(false);

    setFormRegistro({
      valor: '',
      categoria_id: '0',
      data: '',
      descricao: ''
    });

  }

  function handleOrderDate() {

    const transacoesAtuais = [...transacoes];

    if (dataOrder) {
      setDataOrder(!dataOrder)
      transacoesAtuais.sort((a, b) => {
        return +(new Date(b.data)) - (new Date(a.data));
      })
    }

    else {
      setDataOrder(!dataOrder)
      transacoesAtuais.sort((a, b) => {
        return +(new Date(a.data)) - (new Date(b.data));
      })
    }

    setTransacoes(transacoesAtuais);

  }

  async function loadcategoriasProdutos(tokenUsuario) {

    const response = await categoriasProdutos(tokenUsuario);

    setCategorias(response.message)
  }

  async function loadTransacoes(tokenUsuario) {

    const response = await transacoesUsuario(tokenUsuario);

    setTransacoes(response.message)

    setTransacoesGerais(response.message)

  }

  async function loadExtrato(tokenUsuario) {

    const response = await extratoUsuario(tokenUsuario);

    setExtrato(response.message)
  }



  useEffect(() => {

    loadExtrato(tokenUsuario);
    loadTransacoes(tokenUsuario);
    loadcategoriasProdutos(tokenUsuario);

  }, [atualizarTransacoes])


  return (

    <div className='container__Home'>

      {modalRegistroTransacao &&
        <ModalTransacoes
          changeType={changeType}
          formRegistro={formRegistro}
          setChangeType={setChangeType}
          onChange={onChange}
          categorias={categorias}
          clearModal={clearModal}
          adicionarTransacao={adicionarTransacao}
          atualizarTransacoes={atualizarTransacoes}
          setAtualizarTransacoes={setAtualizarTransacoes}
        />
      }

      {
        modalEditarTransacaoInfos &&
        <ModalEditarTransacoes
          changeType={changeType}
          formRegistro={formRegistro}
          setChangeType={setChangeType}
          onChange={onChange}
          categorias={categorias}
          clearModal={clearModal}
          editarTransacao={editarTransacao}
          modalEditarTransacaoInfos={modalEditarTransacaoInfos}
          atualizarTransacoes={atualizarTransacoes}
          setAtualizarTransacoes={setAtualizarTransacoes}
        />
      }

      {modalEditarPerfil &&
        <ModalEditarPerfil
          clearModal={clearModal}
          editarPerfil={editarPerfil}
          setUsuario={setUsuario}
        />
      }

      <header className='container__header__Home'>

        <img className='container__header__Home__logo' src={logo} alt='logo' />

        <div className='container__header__Home__left'>

          <img className='container__header__Home__left__usuario' src={usuarioIcon} alt="usuarioIcon"
            onClick={() => setModalEditarPerfl(true)} />

          <p>{usuario.nome}</p>

          <img src={sair} alt="sair"
            onClick={() => handleLeave()} />
        </div>

      </header>

      <div className='container__Home__content'>

        <button
          onClick={() => setFilterlInfos(!filterInfos)}
          className='container__Home__content__filtro'><img src={filtro} alt="filtro" /> Filtrar</button>

        {filterInfos &&
          <AbaFiltro
            categorias={categorias}
            filtroTransacoes={filtroTransacoes}
            setTransacoes={setTransacoes}
            transacoesGerais={transacoesGerais}
          />
        }

        <div className='container__Home__content__infos'>

          <div className='container__Home__content__infos__left'>

            <div className='container__Home__content__infos__left__data'>
              <p
                onClick={() => handleOrderDate()}
                className='infos__left__date'>Data
                <img className={dataOrder === true ? 'seta__baixo' : 'seta__cima'}
                  src={polygon} alt="polygon" />
              </p>
              <p>Dia da Semana</p>
              <p>Descrição</p>
              <p>Categoria</p>
              <p>Valor</p>
            </div>

            {transacoes && transacoes.map((registro) => {
              return <MapTransacoes
                key={registro.id}
                registro={registro}
                diaSemana={diaSemana}
                setModalEditarTransacaoInfos={setModalEditarTransacaoInfos}
                atualizarTransacoes={atualizarTransacoes}
                setAtualizarTransacoes={setAtualizarTransacoes}
              />
            })
            }

          </div>

          <div className='container__Home__content__infos__right'>

            <div className='container__Home__content__infos__right__resume'>
              <h1>Resumo</h1>
              <p>Entradas <span className='resume__entry'>R$ {(extrato.entrada / 100).toFixed(2)}</span></p>
              <p>Saídas <span className='resume__exits'>R$ {(extrato.saida / 100).toFixed(2)}</span></p>
              <h4>Saldo <span className='resume__sale'>R$ {((extrato.entrada - extrato.saida) / 100).toFixed(2)}</span></h4>
            </div>

            <button onClick={() => setModalRegistroTransacao(true)}>Adicionar Registro</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
