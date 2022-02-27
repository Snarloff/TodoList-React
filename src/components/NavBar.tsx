import { Component } from 'react'
import { Link } from 'react-router-dom'
import { getLoggedUser, logout } from '../services/auth'

/* Add style configuration */

const fontSize = {
  fontSize: '15px'
}

const tabindex = -1

interface IProps {
}

interface IState {
  logged?: boolean;
  user?: object;
}

export default class NavBar extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = { logged: false, user: {} }
    this.logoutMethod = this.logoutMethod.bind(this)
  }

  async componentDidMount() {

    try {
      const user = await getLoggedUser()
      this.setState({ logged: true, user })
    } catch (err) {
      return false
    }
    
  }

  logoutMethod() {
    this.setState({ logged: false})
    logout()
  }

  render() {
    return (
      <nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/" style={fontSize}>Todo List</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default"
            aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            <div className="collapse navbar-collapse" id="navbar-default" />          
          </button>
  
          <div className="collapse navbar-collapse" id="navbar-default">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                </div>
                <div className="col-6 collapse-close">
                  <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-default"
                    aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>

            <ul className="navbar-nav ml-lg-auto">
              { this.state.logged ? (

                <><li className="nav-item">
                  <span onClick={this.logoutMethod}>
                    <a className="nav-link nav-link-icon" href="/" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Log out of Account" rel='tooltip'>
                      <i className="fas fa-sign-out-alt fa-lg"></i>
                    </a>
                  </span>
                </li><li className="nav-item">
                    <Link className="nav-link nav-link-icon" to="/dashboard" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Access Dashboard" rel='tooltip'>
                      <i className="far fa-user-circle fa-lg"></i>                      
                    </Link>
                  </li></>
              ): (
                <li className="nav-item">
                  <Link className="nav-link nav-link-icon" to="/login">
                    <i className="fas fa-sign-in-alt fa-lg"></i>
                  </Link>
                </li>
              )}
            </ul>
  
            <div className="modal fade" id="register-form" tabIndex={tabindex} role="dialog" aria-labelledby="modal-form"
              aria-hidden="true">
              <div className="modal-dialog modal- modal-dialog-centered modal-sm" role="document">
                <div className="modal-content">
  
                  <div className="modal-body p-0">
  
                    <div className="card bg-secondary border-0 mb-0">
                      <div className="card-body px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Crie sua conta abaixo</small>
                        </div>
                        <form role="form" method="POST">
  
                          <div className="form-group mb-3">
                            <div className="input-group input-group-merge input-group-alternative">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                              </div>
                              <input className="form-control" placeholder="Nome" type="text" name="username" />
  
                            </div>
                          </div>
  
                          <div className="form-group mb-3">
                            <div className="input-group input-group-merge input-group-alternative">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                              </div>
                              <input className="form-control" placeholder="Email" type="email" name="email" />
  
                            </div>
                          </div>
  
  
                          <div className="form-group">
                            <div className="input-group input-group-merge input-group-alternative">
                              <div className="input-group-prepend">
                                <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                              </div>
                              <input className="form-control" placeholder="Senha" type="password" name="password"/>
  
                            </div>
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary my-4">Criar conta</button> <br/>
                            <small className="text-muted">Ou entre na sua conta <a href="#" type="button" data-toggle="modal" data-target="#login-form">clicando aqui</a></small> {/* onClick="$('#register-form').modal('hide');" */}
                          </div>
                        </form>
                      </div>
                    </div>
  
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </nav>
    )
  }
}
