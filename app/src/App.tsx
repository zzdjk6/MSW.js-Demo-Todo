import React, { FC, useState } from "react";
import Container from "@material-ui/core/Container";
import TopBar from "./components/TopBar";
import StatusFilterTabs from "./components/StatusFilterTabs";
import { TodoStatusFilter } from "./models/Todo";
import { List } from "@material-ui/core";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import { useTodos } from "./hooks/useTodos";

const App: FC = () => {
  const [statusFilter, setStatusFilter] = useState(TodoStatusFilter.All);

  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos(statusFilter);

  return (
    <Container maxWidth="md" disableGutters={true}>
      <TopBar />

      <StatusFilterTabs
        statusFilter={statusFilter}
        onChange={(event, value) => {
          setStatusFilter(value);
        }}
      />

      {statusFilter !== TodoStatusFilter.Completed && (
        <TodoInput addTodo={addTodo} />
      )}

      <List>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </List>
    </Container>
  );
};

export default App;
