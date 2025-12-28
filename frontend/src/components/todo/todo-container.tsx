import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Checkbox from "../template/checkbox";
import TodoFilters from "./todo-filters";
import ToDoForm from "./todo-form";

const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type Filter = "all" | "completed" | "incomplete";

export default function TodoContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  console.log(filter)

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "incomplete":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  function onFilterChange(selectedFilter: Filter) {
    setFilter(selectedFilter)
  }

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(API_URL);

      const data = await response.json();

      console.log(data);

      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function addTodo(title: string) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        // para pegar o id real
        await fetchTodos();
      }
    } catch (error) {
      console.log("Erro ao adicionar: ", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Atualizamos o estado local (visual) para refletir a mudança feita no banco
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  async function handleToggle(todoId: number) {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    try {
      const response = await fetch(`${API_URL}/${todoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (response.ok) {
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todoId ? { ...t, completed: !t.completed } : t,
          ),
        );
      }
    } catch (error) {
      console.error("Erro no toggle:", error);
    }
  }

  return (
    <div className="bg-zinc-800 w-[75%] h-[75%] border-white text-white flex flex-col text-center p-5">
      <ToDoForm onAddTodo={addTodo}></ToDoForm>
      <TodoFilters currentFilter={filter} handleFilterChange={onFilterChange} />
      <div>
        {todos.length > 0 ? (
          <div className="mt-8">
            <table className="w-full border-collapse text-white">
              <thead>
                <tr className="border b border-zinc-600">
                  <th className="w-30 text-center border-r border-zinc-600">
                    Id
                  </th>
                  <th className="text-center border-r border-zinc-600">
                    Title
                  </th>
                  <th className="w-30 text-center border-r border-zinc-600">
                    Status
                  </th>
                  <th className="w-30 text-center border-r border-zinc-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTodos.map((todo) => (
                  <tr
                    key={todo.id}
                    className="border-b border-zinc-700 hover:bg-gray-700/20"
                  >
                    <td className="py-2 text-xs text-left">{todo.id}</td>
                    <td
                      className={`px-6 py-2 text-left ${todo.completed ? "line-through opacity-50" : "opacity-100"} `}
                    >
                      {todo.title}
                    </td>
                    <td className="text-center py-2">
                      <Checkbox
                        isCompleted={todo.completed}
                        onChange={() => handleToggle(todo.id)}
                      />
                    </td>
                    <td className="p-4 text-center py-2">
                      <button
                        onClick={() => handleDelete(todo.id)}
                        type="button"
                        className="cursor-pointer text-red-500 transition-transform hover:scale-110"
                      >
                        <X />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white font-black mb-3 mt-7">
            Adicione sua primeira tarefa!
          </p>
        )}
      </div>
    </div>
  );
}
