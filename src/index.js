import React, { useContext, useReducer, useEffect, useState } from "react";

import ReactDOM from "react-dom";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import TodosContext from "./content";
import todoReducer from "./reducer";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const reponse = await axios.get(endpoint);
    setData(reponse.data);
  };
  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const saveTodos = useAPI("https://hooks-api-thanhvan181.vercel.app/todos");
  useEffect(() => {
    dispatch(
      {
        type: "GET_TODOS",
        payload: saveTodos,
      },
      
    );
  }, [saveTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(
  <App />,

  document.getElementById("root")
);

reportWebVitals();
