import React, { useState, useEffect } from "react";
import { Todo } from "../models/Todo";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async (data: { title: string; description: string }) => {
    try {
      const savedTodo = await addTodo({ ...data, completed: false });
      setTodos([...todos, savedTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleEditSubmit = async (data: { title: string; description: string }) => {
    if (!editingTodo) return;

    try {
      const savedTodo = await updateTodo({ ...editingTodo, ...data });
      setTodos(todos.map((todo) => (todo.id === savedTodo.id ? savedTodo : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggleCompleted = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    try {
      const updatedTodo = await updateTodo({ ...todoToUpdate, completed: !todoToUpdate.completed });
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <div className="App flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Todoリスト with Typescript</h2>
        <TodoForm
          onSubmit={editingTodo ? handleEditSubmit : handleAddTodo}
          initialData={editingTodo ? { title: editingTodo.title, description: editingTodo.description } : undefined}
          isEditing={!!editingTodo}
          onCancel={() => setEditingTodo(null)}
        />
        <TodoList
          todos={todos}
          onEdit={setEditingTodo}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleCompleted}
        />
      </div>
    </div>
  );
};

export default TodoPage;
