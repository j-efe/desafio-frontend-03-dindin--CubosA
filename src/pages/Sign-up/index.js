import './styles.css';
import logo from '../../assets/Logo.svg'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '../../services/api';


function SignUp() {

  const navigate = useNavigate();
  const [warning, setWarning] = useState({ message: '', show: false })
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  function onChange(evt) {
    const value = evt.target.value;
    const key = evt.target.name;

    setForm(old => ({
      ...old,
      [key]: value
    }))
  }


  async function handleSignUp(evt) {
    evt.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setWarning({ message: 'Todos os campos devem ser preenchidos!', show: true });
      setTimeout(() => setWarning({ message: '', show: false }), 5000);
      return
    }

    if (form.password !== form.confirmPassword) {
      setWarning({ message: 'As senhas devem ser iguais!', show: true });
      setTimeout(() => setWarning({ message: '', show: false }), 5000);
      return
    }

    const response = await register({ nome: form.name, email: form.email, senha: form.password });

    if (!response.error) {
      navigate('/');

    } else {
      setWarning({
        message: response.message.mensagem,
        show: true
      });

      setTimeout(() => setWarning({ message: '', show: false }), 5000)
    }
  }


  return (

    <div className='container__Signup'>

      <header className='container__header__Signup'>
        <img src={logo} alt='logo' />
      </header>

      <div className='container__SignUp__Data'>
        <h1>Cadastre-se</h1>
        <form>

          <label  >Nome</label>
          <input id='name' type="text" name='name'
            value={form.name} onChange={onChange} required />

          <label>E-mail</label>
          <input id='email' type="text" name='email'
            value={form.email} onChange={onChange} required />

          <label >Senha</label>
          <input id='password' type="password" name='password'
            value={form.password} onChange={onChange} required />

          <label >Confirmação de senha</label>
          <input id='confirmPassword' type="password" name='confirmPassword'
            value={form.confirmPassword} onChange={onChange} required />

          <span className='error'>{true && warning.message}</span>
          <button onClick={handleSignUp}>Cadastrar</button>
        </form>

        <p>Já tem Cadastro? <a className='linkToSignIn' onClick={() => navigate('/')}>Clique aqui!</a> </p>
      </div>
    </div>
  );
}

export default SignUp;
