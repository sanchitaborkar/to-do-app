"use client"

import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todoValue, setTodoValue] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]);

  function submitHandler() {
    if (todoValue.trim() === "") return;

    setTodos((prev) => [{
      id: Math.random(),
      title: todoValue.trim(),
      completed: false
    }, ...prev]);
    setTodoValue("");
  }
  
  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoValue(event.target.value);
  }

  function toggleComplete(id: number) {
    setTodos((prev) => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">Todo List</h1>

      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={todoValue}
          onChange={inputHandler}
          placeholder="Add new task..."
          className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={submitHandler}
          className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 transition"
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-500">No tasks added. Start by adding a new task!</p>
      ) : (
        <ul className="w-full max-w-md space-y-3">
          {todos.map((item) => (
            <li key={item.id} className="flex items-center justify-between bg-white p-3 rounded shadow hover:shadow-lg transition">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="w-5 h-5 text-emerald-600 border-gray-300 rounded"
                />
                <span className={`text-gray-700 ${item.completed ? "line-through text-gray-400" : ""}`}>
                  {item.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
