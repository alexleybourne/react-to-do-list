import React, { useState } from 'react';
import TodoList from './TodoList'

function App(){
  const [todos, setTodos] = useState([ 'hello' , 'yolo'])
  return (
    <>
      <TodoList todos={todos} />
      <input type="text" />
      <button>Add Todo</button>
      <button>Clear Completed</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
