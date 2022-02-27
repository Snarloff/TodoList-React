import React, { FormEvent, ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleLogin } from '../services/auth'

import NavBar from '../components/NavBar'
import DynamicMessage from '../types/DynamicMessage'

interface LoginData {
  uid: string;
  password: string;
}

const Login: React.FC = () => {

  document.title = 'Login ― To-Do List | Snarloff (Adonis.js 5)'

  
  /* Global Variables */
  
  const navigate = useNavigate()
  
  const [form, setForm] = useState<LoginData>({ uid: '', password: '' })
  const [data, setMessage] = useState<DynamicMessage>({ message: '', type: '' })
  const [counter, setCounter] = useState(3)

  /* End Global Variables */

  /* Functions */

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { uid, password } = form
    const response = await handleLogin(uid, password)

    if(!response?.status) {
      setMessage({ message: response?.message, type: 'danger' }) // failure
    } else {
      setMessage({ message: response?.message, type: 'success'}) // success
      
      counter > 1 && setTimeout(() => setCounter(counter - 1), 1000)

      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)

    }
    
    
  }

  /* End Functions */

  return <React.Fragment>
    <NavBar />

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card bg-secondary border-0 mb-0 mt-6">
            <div className="card-body px-lg-5 py-lg-5">

              <div className="text-center text-muted mb-4">
                <small>Entre abaixo com seus dados</small>
              </div>

              <form role="form" onSubmit={handleSubmit}>

                {data.message != '' &&
                  <div className={`alert alert-${data.type}`} role="alert">
                    <span className="alert-text"><strong>Alert!</strong> {data.message + `${data.type == 'success' ? counter + 's' : ''} `}</span>
                  </div>
                }

                <div className="form-group mb-3">
                  <div className="input-group input-group-merge input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                    </div>

                    <input onChange={handleChange} className="form-control" placeholder="Usuário / Email" type="text" name="uid" />
                  
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-merge input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input onChange={handleChange} className="form-control" placeholder="Senha" type="password" name="password" />
                  </div>
                </div>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                  <label className="custom-control-label" htmlFor="customCheckLogin">
                    <span className="text-muted">Lembrar de mim</span>
                  </label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary my-4">Entrar na conta</button> <br />
                  <small className="text-muted">Ou crie sua conta <Link to="/register">clicando aqui</Link></small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </React.Fragment>
}

export default Login