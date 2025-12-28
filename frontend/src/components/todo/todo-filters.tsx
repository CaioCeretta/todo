import React from 'react'
import type { Filter } from './todo-container';

interface TodoFiltersProps {
  handleFilterChange: (filter: Filter) => void;
  currentFilter: Filter;
}

export default function TodoFilters({ handleFilterChange, currentFilter }: TodoFiltersProps) {
  return (
    <div className="flex gap-2 mt-6 justify-center">
      <button
        type="button"
        onClick={() => handleFilterChange("all")}
        className={`px-3 py-1 rounded ${currentFilter === "all" ? "bg-white text-black" : "bg-zinc-700"
          }`}
      >
        Todos
      </button>

      <button
        type="button"
        onClick={() => handleFilterChange("completed")}
        className={`px-3 py-1 rounded ${currentFilter === "completed" ? "bg-white text-black" : "bg-zinc-700"
          }`}
      >
        Feitos
      </button>

      <button
        type="button"
        onClick={() => handleFilterChange("incomplete")}
        className={`px-3 py-1 rounded ${currentFilter === "incomplete" ? "bg-white text-black" : "bg-zinc-700"
          }`}
      >
        Incompletos
      </button>
    </div>
  )
}
