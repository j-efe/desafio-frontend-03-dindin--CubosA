import './styles.css';
import logo from '../../assets/Logo.svg'

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { login } from '../../services/api';
import { setItem, getItem } from '../../utils/storage'

function SignIn() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [warning, setWarning] = useState({ message: '', show: false });

  function onChange(evt) {
    const value = evt.target.value;
    const key = evt.target.name;

    setForm(old => ({
      ...old,
      [key]: value
    }))
  }

  async function handleSingIn(evt) {
    evt.preventDefault();

    if (!form.email || !form.senha) {
      setWarning({ message: 'Todos os campos devem ser preenchidos!', show: true });
      setTimeout(() => setWarning({ message: '', show: false }), 5000);
      return
    }

    const response = await login(form);

    if (!response.error) {

      setItem('token', response.message.token)
      setItem('id', response.message.usuario.id)
      setItem('nome', response.message.usuario.nome)
      setItem('email', response.message.usuario.email)
      navigate('/home');

    } else {
      setWarning({
        message: response.message,
        show: true
      });

      setTimeout(() => setWarning({ message: '', show: false }), 5000)
    }
  }

  useEffect(() => {

    const isAuthenticated = getItem('token');

    if (isAuthenticated) {
      navigate('/home')
    }

  }, [])

  return (

    <div className='container__Signin'>

      <header className='container__header__Signin'>
        <img src={logo} alt='logo' />
      </header>

      <div className='container__content'>

        <div className='container__content__left'>

          <h1>Controle suas <b className='container__content__left__financas'>finanças</b>,
            sem planilha chata.</h1>

          <p> Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>

          <button onClick={() => navigate('/sign-up')}>Cadastre-se</button>

        </div>

        <div className='container__content__right'>

          <h1>Login</h1>

          <form>
            <div className='container__content__right__inputs'>

              <label>Email</label>
              <input name='email' id='email' type="text"
                value={form.email} onChange={onChange} />

              <label>Senha</label>
              <input type="password" id='senha' name='senha'
                value={form.senha} onChange={onChange} />
            </div>

            {warning.show && <span className='error'>{warning.message}</span>}

            <button onClick={handleSingIn}>Entrar</button>

          </form>
        </div>
      </div>
    </div>

  );
}


export default SignIn;
