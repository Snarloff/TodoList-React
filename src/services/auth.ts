import api from './api'

async function handleRegister(username: string, email: string, password: string): Promise<any> {

  const { data } = await api.post('auth/register', {
    username, email, password
  })

  if (data.status == false) {
    return { status: false, message: data.error}
  }

  return { status: true, user: data.user, message: 'Registrado com sucesso. Redirecionando em ' }

}

async function handleLogin(uid: string, password: string): Promise<any> {

  const { data } = await api.post('auth/login', {
    uid, password
  })

  if (data.status == false) {
    return { status: false, message: data.error }
  }

  const token = data.token.token

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`    
    localStorage.setItem('@App:token', JSON.stringify(token))
    return { status: true, message: 'Logado com sucesso. Redirecionando em ' }
  }

}

async function getLoggedUser(){

  const token = localStorage.getItem('@App:token')

  const { data } = await api.post('auth/user', {
    token
  })

  return data.user

}

function logout(){
  localStorage.removeItem('@App:token')
}

function isLogged(){

  /* TODO: Check if the token is valid */

  if (localStorage.getItem('@App:token')) {
    return true
  }

  return false
}

export { handleLogin, handleRegister, getLoggedUser, logout, isLogged }