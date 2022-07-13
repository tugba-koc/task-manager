import React from "react";
import { Todo } from "../model";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

type Props = {
  todo: Todo;
  todos: Todo[];
  settodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleToDo: React.FC<Props> = ({ todo, todos, settodos }) => {
  const [edit, setedit] = React.useState<boolean>(false);
  const [editToDo, seteditToDo] = React.useState<string>(todo.todo);

  const handleDone = (id: number) => {
    settodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    settodos(todos.filter((todo) => todo.id !== id));
  };

  let inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    settodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editToDo } : todo))
    );
    setedit(false);
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          type="text"
          className="todos__single__input"
          value={editToDo}
          onChange={(e) => seteditToDo(e.target.value)}
        />
      ) : (
        <span className={`todos__single--text ${todo.isDone ? "active" : ""}`}>
          {todo.todo}
        </span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setedit(!edit);
            }
          }}
        >
          <AiTwotoneEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleToDo;
