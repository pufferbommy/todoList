import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

// components
import Todo from './components/Todo'

const initialState = () => {
  const todos = localStorage.getItem('todos')
  if (todos) {
    return JSON.parse(todos)
  } else {
    return []
  }
}

const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(initialState)
  const [selectedTodo, setSelectedTodo] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!todo) return
    setTodos((prevTodos) => [{ id: nanoid(), todo, complete: false }, ...prevTodos])
    setTodo('')
  }

  const onDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)
  }

  const onEdit = (id) => {
    const selectedTodo = todos.filter((todo) => todo.id === id)[0]
    setSelectedTodo(selectedTodo)
  }

  const onCancel = () => {
    setSelectedTodo(null)
  }

  const onConfirm = (editedTodo) => {
    const todosWithoutEditedTodo = todos.filter((todo) => todo.id !== editedTodo.id)
    const idxOfEditedTodo = todos.findIndex((todo) => todo.id === editedTodo.id)
    todosWithoutEditedTodo.splice(idxOfEditedTodo, 0, editedTodo)
    setTodos(todosWithoutEditedTodo)
    setSelectedTodo(null)
  }

  const onCheckChange = (e, id) => {
    const { checked } = e.target
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: checked }
      } else {
        return todo
      }
    })
    setTodos(newTodos)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <div className="flex items-center justify-center mt-14">
        <form onSubmit={onSubmit} className="flex gap-2 ">
          <input
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
      <div className="grid grid-cols-1 gap-4 mt-4 place-items-center">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            selectedTodo={selectedTodo?.id === todo.id && selectedTodo}
            onDelete={onDelete}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onCheckChange={onCheckChange}
          />
        ))}
      </div>
    </>
  )
}

export default App
