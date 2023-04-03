import React, {useState} from 'react'
import shortid from 'shortid'

function App() {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editMute, setEditMute] = useState(false)
  const [id, setId] = useState('')

  
  const addTask = (e) => {
     e.preventDefault()
     if(!task.length > 0){
       console.log('ok') // Agregar poput
     }
     const newTask = {
      id: shortid.generate(),
      name: task
     }
  
     // agreagando tareas al array de atreas
     setTasks([...tasks, newTask])
     console.log(tasks);
     setTask('')
  }
  const saveTask = (e) => {
     e.preventDefault()
     if(!task.length > 0){
       console.log('Error') // Agregar un error
     }
    
     const editeTasks = tasks.map(tk => tk.id === id ? {id, name: task}: tk)
     // agreagando tareas al array de atreas
     setTasks(editeTasks)
     setEditMute(false)
     setTask('')
     setId('')
  }

  const deletedTask = (id) => {
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
