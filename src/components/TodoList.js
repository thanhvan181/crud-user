import React, { useContext } from "react";
import TodosContext from "../content";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className="flex bg-gray-500 border-black border-dashed border-2 my-2 py-4 "
          >
            <span 

             onDoubleClick= {async () =>{const response = await axios.patch(`https://hooks-api-thanhvan181.vercel.app/todos/${todo.id}`, {
               complete: !todo.complete

             }) 
             dispatch({type: "TOGGLE_TODO", payload: todo})
            }}
            className={`flex-1 ml-12 cursor-pointer ${todo.complete && "line-through text-grey-darket"}`}>{todo.text}</span>
            <button
            onClick={()=>dispatch({type: "SET_CURRENT_TODO", payload: todo})}
            >
              
              <FontAwesomeIcon
                icon={faEdit}
                className="h-6"
                style={{ color: "blue", fontSize: "30px" }}
              ></FontAwesomeIcon>
            </button>
            <button
              onClick={ async () => { await axios.delete(`https://hooks-api-thanhvan181.vercel.app/todos/${todo.id}`)

              dispatch({type: "REMOVE_TODO", payload: todo})

            }}>
              
              
              <FontAwesomeIcon
                icon={faTrash}
                className="h-6"
                style={{ color: "#CC0000", fontSize: "30px" }}
              ></FontAwesomeIcon>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
