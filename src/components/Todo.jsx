import React, { useEffect, useState } from 'react'

import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const Todo = ({
  todo,
  selectedTodo,
  onEdit,
  onDelete,
  onCancel,
  onConfirm,
  onCheckChange,
}) => {
  const [editingTodo, setEditingTodo] = useState({
    todo: '',
  })

  useEffect(() => {
    selectedTodo && setEditingTodo(selectedTodo)
  }, [selectedTodo])

  return (
    <div className="flex items-center px-6 text-black bg-white border rounded w-[21.3rem] shadow h-14">
      {selectedTodo && (
        <input
          type="text"
          autoFocus
          spellCheck={false}
          value={editingTodo.todo}
          onChange={(e) => setEditingTodo({ ...editingTodo, todo: e.target.value })}
          className="w-1/2 text-xl outline-none"
        />
      )}
      {!selectedTodo && (
        <div className="flex items-center gap-2">
          <input
            checked={editingTodo.complete}
            onChange={(e) => onCheckChange(e, todo.id)}
            defaultChecked={editingTodo.complete}
            type="checkbox"
            className="relative top-0.5"
          />
          <h1 className="text-xl">{todo.todo}</h1>
        </div>
      )}
      <div className="flex gap-2 ml-auto text-xl">
        {selectedTodo && (
          <>
            <button
              onClick={onCancel}
              className="p-0.5 rounded text-sm text-red-500 hover:text-red-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(editingTodo)}
              className="p-0.5 rounded text-sm text-green-500 hover:text-green-400 transition-colors"
            >
              Confirm
            </button>
          </>
        )}
        {!selectedTodo && (
          <>
            <AiFillEdit
              onClick={() => onEdit(todo.id)}
              className="cursor-pointer fill-pink-500 hover:fill-pink-400"
            />
            <AiFillDelete
              onClick={() => onDelete(todo.id)}
              className="transition-colors cursor-pointer fill-pink-500 hover:fill-pink-400"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Todo
