import React from "react";
import { Todo } from "../models/Todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete, onToggle }) => (
  <ul className="space-y-2">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    ))}
  </ul>
);

export default TodoList;
