import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import * as Yup from 'yup'
import DynamicMessage from '../types/DynamicMessage'
import { Link, useNavigate } from 'react-router-dom'
import { handleRegister } from '../services/auth'
import { Formik, Field, Form, ErrorMessage } from 'formik'

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC<{}> = () => {

  document.title = 'Register ― To-Do List | Snarloff (Adonis.js 5)'
  
  const navigate = useNavigate()

  const [data, setMessage] = useState<DynamicMessage>({ message: '', type: '' })
  const [counter, setCounter] = useState(3)

  const initialValues: RegisterData = {
    username: '',
    email: '',
    password: '',
  }

  async function handleSubmit(formValue: { username: string; email: string; password: string }) {

    const { username, email, password } = formValue

    const response = await handleRegister(username, email, password)
    
    console.log(response);

    if(!response?.status) {
      setMessage({ message: response?.message, type: 'danger' }) // failure
    } else {
      setMessage({ message: response?.message, type: 'success'}) // success

      counter > 1 && setTimeout(() => setCounter(counter - 1), 1000)

      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }

  }

  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          'len',
          'The username must be between 3 and 20 characters.',
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required('This field is required!'),
      email: Yup.string()
        .email('This is not a valid email.')
        .required('This field is required!'),
      password: Yup.string()
        .test(
          'len',
          'The password must be between 6 and 40 characters.',
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required('This field is required!'),
      })
  }

  return (
    <React.Fragment>
      <NavBar />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card bg-secondary border-0 mb-0 mt-6">
              <div className="card-body px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Crie sua conta abaixo</small>
                </div>

                  <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema} 
                    onSubmit={handleSubmit}>

                    <Form>

                      {data.message != '' &&
                        <div className={`alert alert-${data.type}`} role="alert">
                          <span className="alert-text"><strong>Alert!</strong> {data.message + `${data.type == 'success' ? counter + 's' : ''} `}</span>
                        </div>
                      }

                      <div>
                        <div className="form-group mb-3">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                            </div>
                            <Field className="form-control is-invalid" placeholder="Username" type="text" name="username" />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="invalid-feedback mb-2 ml-2"
                            />
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                            </div>
                            <Field className="form-control is-invalid" placeholder="Email" type="email" name="email" />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback mb-2 ml-2"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                            </div>
                            <Field className="form-control is-invalid" placeholder="Password" type="password" name="password" />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback mb-2 ml-2"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary my-4">Criar conta</button> <br />
                          <small className="text-muted">Ou entre na sua conta <Link to="/login">clicando aqui</Link></small>
                        </div>

                      </div>

                    </Form>

                  </Formik>
                  
              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Register