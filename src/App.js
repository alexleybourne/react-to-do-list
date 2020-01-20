import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
import './style.css'
import Button from '@material-ui/core/Button';

function App(){
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  // MAgical local storage from useEffect

  // Checks for stored todos and then sets them
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Saves Todos to local Storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Changes Toggles by creating a new array, editing the value and then replacing the existing one
  // So basically just changes the toggle fancy as
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // Creates todo from input
  function addTodo(e){
    const name = todoNameRef.current.value
    if (name == '') return 
    
    // Values for each object with unique id 
    setTodos(prevTodos => {
      return [...prevTodos, {id : uuidv4(), name: name, complete: false}]
    })
    

    todoNameRef.current.value = null
  }

  // Html (JSX)
  return (
    <div className="container">
    <>
    <h1>To Do List:</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <>
        <div>
          <input ref={todoNameRef} type="text" />
          <Button variant="contained" color="primary" onClick={addTodo}>Add</Button>
        </div>
      </>
      <button onClick={handleClearTodos}>Delete Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} uncompleted</div>
    </>
    </div>
  )
}

export default App;
