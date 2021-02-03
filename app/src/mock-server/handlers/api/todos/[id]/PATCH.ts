import has from "lodash/has";
import get from "lodash/get";
import toInteger from "lodash/toInteger";
import { rest } from "msw";
import { mockDataStore } from "../../../../data-storage/mockDataStore";
import { Todo } from "../../../../../models/Todo";

let handler = rest.patch<string>("/api/todos/:id", (req, res, ctx) => {
  const id = toInteger(req.params.id);
  const todo = mockDataStore.todos.getItem(id);

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

  const updatedTodo: Todo = {
    ...todo,
    completed: Boolean(get(bodyJson, "completed")),
    updateAt: new Date().toISOString(),
  };
  mockDataStore.todos.setItem(id, updatedTodo);

  return res(
    ctx.status(200),
    ctx.json({
      data: updatedTodo,
    })
  );
});

if (process.env.REACT_APP_NO_PERSIST) {
  handler = rest.patch<string>("/api/todos/:id", (req, res, ctx) => {
    const id = toInteger(req.params.id);
    const bodyJson = JSON.parse(req.body);
  
    if (!has(bodyJson, "completed")) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "invalid payload",
        })
      );
    }

    let description = "";
    let createAt = new Date().toISOString();

    if ([1,2,3].includes(id)) {
      const item = require(`../../../../fixtures/todos/${id}.json`);
      description = item.description;
      createAt = item.createAt;
    }
  
    const updatedTodo: Todo = {
      id,
      description,
      createAt,
      completed: Boolean(get(bodyJson, "completed")),
      updateAt: new Date().toISOString(),
    };
  
    return res(
      ctx.status(200),
      ctx.json({
        data: updatedTodo,
      })
    );
  });
}

export default handler;
