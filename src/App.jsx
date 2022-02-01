import React, { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

// components
import Todo from './components/Todo'

// icons
import { BsGithub, BsTwitter } from 'react-icons/bs'

const initialState = () => {
  const todos = localStorage.getItem('todos')
  if (todos) {
    return JSON.parse(todos)
  } else {
    return []
  }
}

const App = () => {
  const todoInputRef = useRef()
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(initialState)
  const [selectedTodo, setSelectedTodo] = useState(null)

  const onAddTodo = (e) => {
    e.preventDefault()
    if (!todo) return
    setTodos((prevTodos) => [{ id: nanoid(), todo, complete: false }, ...prevTodos])
    setTodo('')
    todoInputRef.current.focus()
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <header className="mt-8 text-xl font-medium text-center text-gray-900">
        TodoList
      </header>
      <div className="flex items-center justify-center mt-6">
        <form onSubmit={onAddTodo} className="flex gap-2 ">
          <input
            ref={todoInputRef}
            autoFocus
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="w-64 px-6 py-2 text-lg border rounded shadow outline-none"
            type="text"
          />
          <button className="px-6 py-2 font-semibold text-white rounded shadow bg-gradient-to-r to-pink-500 from-pink-400">
            Add
          </button>
        </form>
      </div>
      <div className="w-[21.3rem] decoration-pink-400 underline text-gray-900  underline-offset-[1.5px] gap-4 mt-4 mx-auto font-sans         hover:decoration-pink-500 font-medium transition-colors">
        Incomplete
      </div>
      <div className="grid grid-cols-1 w-[21.3rem] gap-4 mt-4 mx-auto">
        {todos
          .filter((todo) => !todo.complete)
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              selectedTodo={selectedTodo?.id === todo.id && selectedTodo}
              setSelectedTodo={setSelectedTodo}
            />
          ))}
      </div>
      <div
        className={`w-[21.3rem] font-medium  decoration-pink-400 underline underline-offset-[1.5px] text-gray-900 gap-4 ${
          todos.find((todo) => !todo.complete) ? 'mt-4' : 'mt-0'
        } mx-auto hover:decoration-pink-500 transition-colors font-sans`}
      >
        Completed
      </div>
      <div className="grid grid-cols-1 w-[21.3rem] gap-4 mx-auto mt-4">
        {todos
          .filter((todo) => todo.complete)
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              selectedTodo={selectedTodo?.id === todo.id && selectedTodo}
              setSelectedTodo={setSelectedTodo}
              completed
            />
          ))}
      </div>
      <footer className="fixed w-full left-2 bottom-2">
        <div className="flex justify-center gap-1 text-xl text-pink-500 cursor-pointer">
          <a href="https://twitter.com/pufferbommy">
            <BsTwitter
              size={'1.25rem'}
              className="transition-colors hover:text-pink-400"
            />
          </a>
          <a href="https://github.com/pufferbommy">
            <BsGithub
              size={'1.25rem'}
              className="transition-colors hover:text-pink-400"
            />
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
