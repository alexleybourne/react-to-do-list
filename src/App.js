import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

function App(){
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  // Checks for stored todos and then sets them
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Saves Todos to local Storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

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
    <>
      <TodoList todos={todos} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button>Clear Completed</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
