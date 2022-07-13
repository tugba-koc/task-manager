import React from 'react';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import {Todo} from "./model"

const App: React.FC = () => {
  const [todo, settodo] = React.useState<string>("");
  const [todos, settodos] = React.useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    settodos([...todos, {id:Date.now(), todo, isDone: false  }]);
    settodo("")
  }

  console.log(todos)

  return (
    <div className="App">
      <span className="heading">
        Task Manager
      </span>
      <InputField todo={todo} settodo={settodo} handleAdd={handleAdd} />
      <ToDoList todos={todos} settodos={settodos} />
    </div>
  );
}

export default App;
