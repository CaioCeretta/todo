import cors from "cors";
import express, { type Request, type Response } from "express";
import { prisma } from "./lib/prisma";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Buscar todos
app.get("/todos", async (req: Request, res: Response) => {
	try {
		const todos = await prisma.todo.findMany();
		res.json(todos);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ error: error.message });
		}
		res.status(500).json({ erro: "Erro ao realizar o fetch de todos" });
	}
});

//Criar todo
app.post("/todos", async (req: Request, res: Response) => {
	const { title } = req.body;
	try {
		const newTodo = await prisma.todo.create({
			data: { title, completed: false },
		});

		res.status(201).json(newTodo.id);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ error: error.message });
		}
		return res.status(400).json({ error: "Erro ao criar tarefa " });
	}
});

//Deletar todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
	const { id } = req.params;

	const idNumber = Number(id);

	if (!id) {
		throw new Error("Nenhum id informado");
	}

	try {
		await prisma.todo.delete({
			where: { id: idNumber },
		});

		res.status(204).send();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ error: error.message });
		}

		return res.status(400).json({ error: "Erro ao deletar" });
	}
});

app.patch("/todos/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { completed } = req.body;

	try {
		const updated = await prisma.todo.update({
			where: { id: Number(id) },
			data: { completed: Boolean(completed) },
		});
		res.json(updated);
	} catch (error) {
		res.status(500).json({ error: "Erro ao atualizar status" });
	}
});

try {
	app
		.listen(PORT, () => {
			console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
		})
		.on("error", (err) => {
			console.error("Erro ao iniciar o servidor:", err);
		});
} catch (e) {
	console.error("Falha crítica no app.listen:", e);
}
