import React from "react";
import { Todo } from "../models/Todo";

type TodoItemProps = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onToggle }) => (
  <li className="flex items-start space-x-2 p-2 border-b border-gray-200">
    <div className="flex-1">
      <h3 className="font-semibold">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.description}</p>
    </div>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
      className="form-checkbox text-blue-500"
    />
    <button
      onClick={() => onEdit(todo)}
      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
    >
      編集
    </button>
    <button
      onClick={() => onDelete(todo.id)}
      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      消
    </button>
  </li>
);

export default TodoItem;
