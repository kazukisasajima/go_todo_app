import { Todo } from "../models/Todo";

const API_BASE = "http://localhost:8080";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE}/todos`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
};

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await fetch(`${API_BASE}/add_todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API_BASE}/update_todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Failed to update todo");
  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE}/delete_todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
};
