import has from "lodash/has";
import get from "lodash/get";
import toInteger from "lodash/toInteger";
import { rest } from "msw";
import { dataStorage } from "../../../../storage/dataStorage";

const handler = rest.patch<string>("/api/todos/:id", (req, res, ctx) => {
  const id = toInteger(req.params.id);
  const todo = dataStorage.todos[id];

  if (!todo) {
    return res(ctx.status(404));
  }

  const bodyJson = JSON.parse(req.body);

  if (!has(bodyJson, "completed")) {
    return res(
      ctx.status(400),
      ctx.json({
        message: "invalid payload",
      })
    );
  }

  const completed = Boolean(get(bodyJson, "completed"));
  dataStorage.todos[id].completed = completed;
  dataStorage.todos[id].updateAt = new Date().toISOString();

  return res(
    ctx.status(200),
    ctx.json({
      data: todo,
    })
  );
});

export default handler;
