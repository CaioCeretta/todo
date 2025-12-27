import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ToDoFormProps {
  onAddTodo: (title: string) => void;
}

//Defining schema
const todoSchema = z.object({
  title: z.string().min(6, "O título deve ter pelo menos 6 caracteres"),
})

// Creating and assign to a type that schema typing
type TodoFormData = z.infer<typeof todoSchema>;

export default function ToDoForm({ onAddTodo }: ToDoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema)
  })

  const onSubmit = (data: TodoFormData) => {

    onAddTodo(data.title)

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input
          {...register("title")}
          className={`border p-2 rounded w-full bg-zinc-800 outline-none transition-colors
            ${errors.title ? 'border-red-500' : 'border-zinc-600'}`} type="text" placeholder="Digite a tarefa"
        />
        {errors.title &&
          <p className="mt-2 text-red-500 focus:ring-1 focus:ring-zinc-400">{errors.title.message}</p>
        }
      </div>
      <button className="bg-zinc-200 text-black rounded-md p-2 transition-colors duration-200
      cursor-pointer hover:bg-zinc-300" type="submit">
        Confirmar
      </button>
    </form>
  );
}
