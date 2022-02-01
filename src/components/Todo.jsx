import React, { useEffect, useState } from 'react'

import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Cancel from './Cancel'

const Todo = ({
  todo,
  todos,
  setTodos,
  selectedTodo,
  setSelectedTodo,
  completed,
}) => {
  const [editingTodo, setEditingTodo] = useState({
    todo: '',
  })
  const [isCancelling, setIsCancelling] = useState(false)

  const onEdit = (id) => {
    const selectedTodo = todos.filter((todo) => todo.id === id)[0]
    setSelectedTodo(selectedTodo)
  }

  const onCancel = () => {
    setSelectedTodo(null)
  }

  const onDelete = (id) => {
    setIsCancelling(true)
    setTimeout(() => {
      setIsCancelling(false)
      const filteredTodos = todos.filter((todo) => todo.id !== id)
      setTodos(filteredTodos)
    }, 500)
  }

  const onConfirm = () => {
    const todosWithoutEditingTodo = todos.filter(
      (todo) => todo.id !== editingTodo.id,
    )
    const idxOfEditingTodo = todos.findIndex((todo) => todo.id === editingTodo.id)
    todosWithoutEditingTodo.splice(idxOfEditingTodo, 0, editingTodo)
    setTodos(todosWithoutEditingTodo)
    setSelectedTodo(null)
  }

  const onCheckChange = (e, td) => {
    const { checked } = e.target
    let newTodo = {}
    if (checked) {
      newTodo = { ...todo, complete: true }
    } else {
      newTodo = { ...todo, complete: false }
    }
    const todosWithoutCheckedTodo = todos.filter((todo) => todo.id !== td.id)
    const idxOfCheckedTodo = todos.findIndex((todo) => todo.id === td.id)
    todosWithoutCheckedTodo.splice(idxOfCheckedTodo, 0, newTodo)
    setTodos(todosWithoutCheckedTodo)
  }

  const onEnter = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      onConfirm()
    }
  }

  useEffect(() => {
    selectedTodo && setEditingTodo(selectedTodo)
  }, [selectedTodo])

  return (
    <>
      <Cancel isCancelling={isCancelling}>
        <div className="flex items-center w-full px-6 text-black bg-white border rounded shadow h-14">
          {selectedTodo && (
            <input
              type="text"
              autoFocus
              spellCheck={false}
              value={editingTodo.todo}
              onKeyUp={onEnter}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, todo: e.target.value })
              }
              className="w-1/2 text-xl outline-none "
            />
          )}
          {!selectedTodo && (
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => onCheckChange(e, todo)}
                defaultChecked={todo.complete}
                type="checkbox"
                className="w-4 h-4 border-0 cursor-pointer"
              />
              <h1 className={'text-lg'}>{todo.todo}</h1>
            </div>
          )}
          <div className="flex gap-2 ml-auto text-xl">
            {selectedTodo && (
              <>
                <button
                  onClick={() => onConfirm()}
                  className="p-0.5 rounded text-sm text-green-500 transition-all font-medium hover:bg-slate-50"
                >
                  Confirm
                </button>
                <button
                  onClick={onCancel}
                  className="p-0.5 rounded text-sm text-red-500 font-medium transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>
              </>
            )}
            {!selectedTodo && (
              <>
                {!completed && (
                  <AiFillEdit
                    onClick={() => onEdit(todo.id)}
                    className="cursor-pointer fill-pink-500 hover:fill-pink-400"
                  />
                )}
                <AiFillDelete
                  onClick={() => onDelete(todo.id)}
                  className="transition-colors cursor-pointer fill-pink-500 hover:fill-pink-400"
                />
              </>
            )}
          </div>
        </div>
      </Cancel>
    </>
  )
}

export default Todo
