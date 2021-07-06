import React, { useState, useContext, useEffect } from "react";
import TodoContext from "../content";
import axios from "axios";
import { uuid } from "uuidv4";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch,
  } = useContext(TodoContext);
  useEffect(() => {
    if (currentTodo.text) {
        setTodo(currentTodo.text);
    } else {
        setTodo("");
    }
  }, [currentTodo.id]);
  const hanleSubmit = async (event) => {
    event.preventDefault();
    // const value = event.target.value;

    if (currentTodo.text) {
      const reponse = await axios.patch(
        `https://hooks-api-thanhvan181.vercel.app/todos/${currentTodo.id}`,
        {
          text: todo,
        }
      );
    //   console.log(reponse);
      dispatch({ type: "UPDATE_TODO", payload: reponse.data });
    } else {
      const reponse = await axios.post(
        `https://hooks-api-thanhvan181.vercel.app/todos/`,
        {
          id: uuid(),
          text: todo,
          complete: false,
        }
      );
      dispatch({ type: "ADD_TODO", payload: reponse.data });
    }

    // setTodo("");
  };

  return (
    <form onSubmit={hanleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2 text-black"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      />
    </form>
  );
}
