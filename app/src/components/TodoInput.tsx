import React, { useRef, useState } from "react";
import { TextField } from "@material-ui/core";

type Props = {
  addTodo: (description: string) => Promise<void>;
};

const TodoInput: React.FC<Props> = ({ addTodo }) => {
  const [buffer, setBuffer] = useState("");
  const inputRef = useRef<HTMLInputElement | undefined>();

  return (
    <TextField
      fullWidth={true}
      label="Add todo..."
      variant="filled"
      inputRef={inputRef}
      value={buffer}
      onChange={(event) => {
        const value = event.target.value.toString().trim();
        setBuffer(value);
      }}
      onKeyPress={async (event) => {
        if (event.key === "Enter" && buffer.length > 0) {
          await addTodo(buffer);
          setBuffer("");
          inputRef.current?.blur();
        }
      }}
    />
  );
};

export default TodoInput;
