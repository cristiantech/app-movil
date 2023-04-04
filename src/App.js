import React, {useState, useEffect} from 'react'
//import shortid from 'shortid'
import { getCollection, addDocument, updateDocument, deleteDocument } from './lib/actions'

function App() {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editMute, setEditMute] = useState(false)
  const [id, setId] = useState('')

  // Cuando todo carga llamamos a la base de datos

  useEffect( () => {
    (async () => { 
      const res = await getCollection('tasks')
      if(res.statusResponse){
        setTasks(res.data)
      }
    })()
  }, {})

//-----------------------//

  const addTask = async (e) => {
     e.preventDefault()
     if(!task.length > 0){
       console.log('ok') // Agregar poput
     }

     // Abrimos la conexion a la base de datos

     const result = await addDocument('tasks', {name: task})
     // Id es automatico
     if (!result.statusResponse) {
        console.log(result.error);
        return
     }

    // Sin base de datos
    //  const newTask = {
    //   id: shortid.generate(),
    //   name: task
    //  }
  
     // agreagando tareas al array de atreas
     setTasks([...tasks, { id: result.data.id, name:task}])
    
     setTask('')
  }

  const saveTask = async (e) => {
     e.preventDefault()
     if(!task.length > 0){
       console.log('Error') // Agregar un error
     }
    
     const res = await updateDocument('tasks', id, {name: task})

     if (!res.statusResponse) {
      console.log(res.error)
     }

    const editeTasks = tasks.map(tk => tk.id === id ? {id, name: task}: tk)
     // agreagando tareas al array de atreas
    //  setTasks(editeTasks)
     setTasks(editeTasks)
     setEditMute(false)
     setTask('')
     setId('')
  }

  const deletedTask = async (id) => {

    //Lamamdo ala BD
    const res = await deleteDocument('tasks', id)
    if (!res.statusResponse) {
      console.log(res.error)
      return
    }
    const indexTask = tasks.findIndex(tk => tk.id === id);
    tasks.splice(indexTask, 1)
    const newStatck = [...tasks]
    setTasks(newStatck)
  }

  const editTask = (editTask) => {
    setTask(editTask.name)
    setEditMute(true)
    setId(editTask.id)
  }

  return (
    <div className="container mt-5"> 
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          {
            (!tasks.length > 0) ? 
            <h5 className='text-center'>No Hay Tareas Programadas</h5>
            :
            <ul className="list-group">
              {
                tasks.map(tk => (
                  <li 
                  className="list-group-item"
                  key={tk.id}
                  >
                    <span>{tk.name}</span>
                    
                    <button 
                    className="btn btn-warning btn-sm float-end mx-2"
                    onClick={() => editTask(tk)}
                    >Editar</button>
                    
                    <button 
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => deletedTask(tk.id)}
                    >Eliminar</button>
                  </li>
                ))
              }
            </ul>
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            { editMute ? `Editar tarea` : ` Agregar Tarea `}
          </h4>
          <form onSubmit={editMute ? saveTask : addTask}>
            <input 
            type="text"
            className="form-control mb-2"
            placeholder= {editMute ? `Actualizar tarea`: `Agregar tarea`}
            onChange={(text) => {
              setTask(text.target.value)
            }}
            value={task}
            />
            <button className={ editMute ? `btn btn-warning` : `btn btn-dark`}type="submit">
              {editMute ? `Guardar`: `Agregar` }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
