import toInteger from "lodash/toInteger";
import { rest } from "msw";
import { dataStorage } from "../../../../storage/dataStorage";

const handler = rest.delete("/api/todos/:id", (req, res, ctx) => {
  const id = toInteger(req.params.id);
  const todo = dataStorage.todos[id];

  if (!todo) {
    return res(ctx.status(404));
  }

  delete dataStorage.todos[id];

  return res(ctx.status(204));
});

export default handler;
