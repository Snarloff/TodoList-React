import { Fragment, useMemo } from 'react'
import Router from './routes'
import api from './services/api'

function App() {

  useMemo(() => 
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@App:token')?.replace('"', '').replace('"', '')}`, ['']
  )

  return (
    <Fragment>
      <Router />
    </Fragment>
  )
}

export default App
