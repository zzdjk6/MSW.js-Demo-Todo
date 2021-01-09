import { rest } from "msw";
import { dataStorage } from "../../../storage/dataStorage";
import max from "lodash/max";
import { Todo } from "../../../../models/Todo";
import get from "lodash/get";
import toInteger from "lodash/toInteger";

const handler = rest.post<string>("/api/todos", (req, res, ctx) => {
  const maxId = max<number>(Object.keys(dataStorage.todos).map(toInteger)) || 0;
  const nextId = maxId + 1;

  const description = get(JSON.parse(req.body), "description") || "";

  if (!description) {
    return res(
      ctx.status(400),
      ctx.json({
        message: "description cannot be empty",
      })
    );
  }

  const newTodo: Todo = {
    id: nextId,
    completed: false,
    description,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  };

  dataStorage.todos[nextId] = newTodo;

  return res(
    ctx.status(201),
    ctx.json({
      data: newTodo,
    })
  );
});

export default handler;
