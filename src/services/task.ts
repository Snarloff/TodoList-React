import api from './api'

async function handleAdd(title: string, description: string) {
  
  const { data } = await api.post('task/create', {
    title, description
  })

  if (data.status == false) {
    return { status: false, message: data.error}
  }

  return { status: true, message: 'Task criada com sucesso!' }
}

async function handleDelete(id: number) {
  return await api.delete(`task/remove/${id}`)
}

async function handleSetStatus(id: number, status: string) {
  return await api.put(`task/status/${id}/${status}`)
}

async function handleEdit(title: string, description: string, id: number) {
  
  const { data } = await api.put('task/edit', {
    title, description, id
  })

  if (data.status == false) {
    return { status: false, message: data.error}
  }

  return { status: true, message: 'Task editada com sucesso!' }
}

async function handleShow() {

  const { data } = await api.get('task/tasks')

  if (data.status === false) {
    return { status: false, message: data.error }
  }

  return { status: true, message: 'Sucesso', data }


}

export { handleAdd, handleDelete, handleSetStatus, handleEdit, handleShow}