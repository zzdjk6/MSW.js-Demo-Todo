import { rest } from "msw";
import { inMemoryData } from "../../../data-storage/inMemoryData";
import { Todo } from "../../../../models/Todo";
import get from "lodash/get";

const handler = rest.post<string>("/api/todos", (req, res, ctx) => {
  const description = get(JSON.parse(req.body), "description") || "";

  if (!description) {
    return res(
      ctx.status(400),
      ctx.json({
        message: "description cannot be empty",
      })
    );
  }

  const nextId = inMemoryData.todos.getNextId();

  const newTodo: Todo = {
    id: nextId,
    completed: false,
    description,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  };

  inMemoryData.todos.setItem(nextId, newTodo);

  return res(
    ctx.status(201),
    ctx.json({
      data: newTodo,
    })
  );
});

export default handler;
