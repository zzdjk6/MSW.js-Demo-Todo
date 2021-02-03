import { rest } from "msw";
import { mockDataStore } from "../../../data-storage/mockDataStore";
import { Todo } from "../../../../models/Todo";
import get from "lodash/get";

let handler = rest.post<string>("/api/todos", (req, res, ctx) => {
  const description = get(JSON.parse(req.body), "description") || "";

  if (!description) {
    return res(
      ctx.status(400),
      ctx.json({
        message: "description cannot be empty",
      })
    );
  }

  const nextId = mockDataStore.todos.getNextId();

  const newTodo: Todo = {
    id: nextId,
    completed: false,
    description,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  };

  mockDataStore.todos.setItem(nextId, newTodo);

  return res(
    ctx.status(201),
    ctx.json({
      data: newTodo,
    })
  );
});

if (process.env.REACT_APP_NO_PERSIST) {
  handler = rest.post<string>("/api/todos", (req, res, ctx) => {
    const description = get(JSON.parse(req.body), "description") || "";
  
    if (!description) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "description cannot be empty",
        })
      );
    }
  
    const nextId = 4;
  
    const newTodo: Todo = {
      id: nextId,
      completed: false,
      description,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };
  
    return res(
      ctx.status(201),
      ctx.json({
        data: newTodo,
      })
    );
  });
}

export default handler;
