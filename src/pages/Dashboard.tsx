import NavBar from '../components/NavBar'
import { Editor } from '@tinymce/tinymce-react'
import React, { FormEvent, useEffect, useState } from 'react'
import { handleAdd, handleShow, handleDelete, handleSetStatus, handleEdit } from '../services/task'
import { useNavigate } from 'react-router-dom'
import DynamicMessage from '../types/DynamicMessage'

import '../assets/css/dashboard.css'

const Dashboard = () => {
  
  document.title = 'Dashboard ― To-Do List | Snarloff (Adonis.js 5)'

  const cardStyle = {
    borderRadius: '.75rem', 
    backgroundColor: '#eff1f2'
  }
  
  const navigate = useNavigate()
  
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')

  const [editDescription, setEditDescription] = useState('')
  const [editTitle, setEditTitle] = useState('')
  
  const [tasks, setTasks] = useState([])
  const [data, setMessage] = useState<DynamicMessage>({ message: '', type: '' })

  useEffect(() => {
    getTasks()
  }, [setTasks])
  
  const getTasks = async () => {
    const response = await handleShow()
    setTasks(response.data.tasks)    
  }
  
  const changeTitle = (value: string) => {
    setEditTitle(value)
  }
  
  const setEditValue = (value: string) => {
    setEditTitle(value)
  }

  const clearInputs = () => {
    setTitle('')
    setDescription('')
  }
  
  function onTodoChange(value: string) {
    setTitle(value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearInputs()

    const response = await handleAdd(title, description)
    
    if(!response?.status) {
      setMessage({ message: response?.message, type: 'danger' }) // failure
    } else {
      navigate('/dashboard')
      getTasks()
      setMessage({ message: response?.message, type: 'success'}) // success
    }
  
  }

  async function handleEditSubmit(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault()

    const response = await handleEdit(editTitle, editDescription, id)
    
    if(!response?.status) {
      setMessage({ message: response?.message, type: 'danger' }) // failure
    } else {
      navigate('/dashboard')
      getTasks()
      setMessage({ message: response?.message, type: 'success'}) // success
    }
  
  }

  return (
    <div>
      <NavBar/>
      <div className="contaner">
        <div className="row">
          <div className="col-md-12">

            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col">
                  <div className="card" id="list1" style={cardStyle}>
                    <div className="card-body py-4 px-4 px-md-5">

                      <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                        <i className="fas fa-check-square me-1"></i>
                        <u>Todo List</u>
                      </p>

                      {data.message != '' &&
                        <div className={`alert alert-${data.type}`} role="alert">
                          <span className="alert-icon"><i className="ni ni-like-2"></i></span>
                          <span className="alert-text"><strong>Alert!</strong> {data.message}</span>
                        </div>
                      }

                      <div className="pb-2">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex flex-row align-items-center">
                              <input value={title} onChange={e => {onTodoChange(e.target.value)}} type="text" className="form-control form-control-lg" placeholder="Adicionar..."
                                id="form-init" />
                              <a href="#!"><i className="fas fa-calendar-alt fa-lg mr-3"></i></a>
                              <div>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-form"
                                >Add</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal fade" id="modal-form" tabIndex={-1} role="dialog" aria-labelledby="modal-form"
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Add task</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">

                              <form role="form" onSubmit={handleSubmit}>

                                <div className="form-group mb-3">
                                  <div className="input-group input-group-merge input-group-alternative">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text"><i className="fas fa-pencil-alt"></i></span>
                                    </div>
                                    
                                   <input value={title} onChange={e => {onTodoChange(e.target.value)}} 
                                    minLength={10} 
                                    maxLength={120} 
                                    className="form-control"
                                    placeholder="Tasks to do tomorrow..." type="text" id="task-title" name="title" required/>
  
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="input-group input-group-merge input-group-alternative">
                                    
                                  <Editor
                                    initialValue="
                                      <h3>To-do list to do tomorrow:</h3>
      
                                      <ul>
                                        <li>Buy dog food</li>
                                        <li>Go to the market to buy fruit</li>
                                        <li>Read 10 pages of the book</li>
                                        <li>Send an email to the manager</li>
                                      </ul>
                                    "
                                    apiKey="okeqjzzgyb6rkdcbyw88be533oghaqv6nlc495c7o8njbtm3"
                                    init={{
                                      height: 300,
                                      menubar: false,
                                      branding: false,
                                      plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                      ],
                                      toolbar: 'undo redo | formatselect | ' +
                                      'bold italic backcolor | alignleft aligncenter ' +
                                      'alignright alignjustify | bullist numlist outdent indent | ' +
                                      'removeformat | help',
                                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={( content ) => {
                                      setDescription(content)
                                    }}
                                  />

                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                  <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                              </form>

                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="card">
                    {/* <!-- Card header --> */}
                    <div className="card-header">
                      {/* <!-- Title --> */}
                      <h5 className="h3 mb-0">All your tasks</h5>
                    </div>
                    {/* <!-- Card body --> */}
                    <div className="card-body">
                      {/* <!-- List group --> */}

                      { tasks.map((item) => (
                        <React.Fragment key={item['id']}>

                          <ul className="list-group list-group-flush list my--3">
                            <li className="list-group-item px-0">
                              <div className="row align-items-center">
                                <div className="col ml--2">
                                  <h4 className="mb-0">
                                    <a href="#!" data-toggle="modal" data-target={`#taskview-${item['id']}`}>{item['title']}</a>
                                  </h4>
                                  <span className={`text-${item['status'] == 'Done' ? 'success' : 'warning'}`}>● </span>
                                  <small>Status: {item['status']} </small>
                                </div>
                                <div className="col-auto d-flex justify-content-end">
                          
                                  {
                                    item['status'] == 'Done' ? (
                                      <button onClick={() => {
                                        handleSetStatus(item['id'], 'Pending')
                                        getTasks()
                                      }} type="submit" className="btn btn-sm btn-warning mr-1"><i className="fas fa-link"></i> Make Pending</button>
                                    ): (
                                      <button onClick={() => {
                                        handleSetStatus(item['id'], 'Done')
                                        getTasks()
                                      }} type="submit" className="btn btn-sm btn-success mr-1"><i className="far fa-check-circle"></i> Make Done</button>
                                    )
                                  }

                                  <button onClick={e => { setEditValue(item['title']) }} type="button" className="btn btn-sm btn-primary ml-1" data-toggle="modal"
                                    data-target={`#edit-${item['id']}`}><i className="far fa-edit"></i> Edit</button>
                          
                                  <button 
                                    type="submit" 
                                    className="btn btn-sm btn-danger" 
                                    onClick={() => {
                                    handleDelete(item['id'])
                                    getTasks()}}
                                  >
                                    <i className="far fa-trash-alt"></i> Remove
                                  </button>
                          
                                </div>
                              </div>
                            </li>
                          </ul>

                          <div className="modal fade" id={`edit-${item['id']}`} tabIndex={-1} role="dialog"
                          aria-labelledby={`edit-${item['id']}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit task</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">

                                    <form role="form" method="POST" onSubmit={e => handleEditSubmit(e, item['id'])}>

                                      <div className="form-group mb-3">
                                        <div className="input-group input-group-merge input-group-alternative">
                                          <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-pencil-alt"></i></span>
                                          </div>
                                          <input minLength={10} maxLength={120} className="form-control"
                                            placeholder="Tasks to do tomorrow..." type="text" id="task-title" name="title"
                                            required value={editTitle} onChange={e => {changeTitle(e.target.value)}} />
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <div className="input-group input-group-merge input-group-alternative">
                                        <Editor
                                          initialValue={item['description']}
                                          apiKey="okeqjzzgyb6rkdcbyw88be533oghaqv6nlc495c7o8njbtm3"
                                          init={{
                                            height: 300,
                                            menubar: false,
                                            branding: false,
                                            plugins: [
                                              'advlist autolink lists link image charmap print preview anchor',
                                              'searchreplace visualblocks code fullscreen',
                                              'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                          }}
                                          onEditorChange={( content ) => {
                                            setEditDescription(content)
                                          }}
                                        />
                                        </div>
                                      </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                  </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="modal fade" id={`taskview-${item['id']}`} tabIndex={-1} role="dialog"
                          aria-labelledby="taskview" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">{item['title']}</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>

                                <div className="modal-body" dangerouslySetInnerHTML={{ __html: item['description'] }}>
                                </div>

                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>

                      )) }
                      
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
