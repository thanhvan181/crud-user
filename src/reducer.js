
import { uuid } from 'uuidv4';


export default function Reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return{
        ...state, 
        todos: action.payload
      }
    case "ADD_TODO":
      // if(!action.payload){
      //   return state;
      // }
      // if(state.todos.findIndex(t => t.text === action.payload) > -1){
      //   return state;

      // }
    
      
      const addedTodos = [...state.todos, action.payload]
      return {
        ...state, 
        todos: addedTodos
      }
    case "SET_CURRENT_TODO":
      return{
        ...state, 
        currentTodo: action.payload
      }
      
    case "TOGGLE_TODO": 
      const toggledTodos = state.todos.map(t => t.id === action.payload.id ? action.payload : t)
      return {
        ...state, 
        todos: toggledTodos
      }
    case "UPDATE_TODO":
        // if(!action.payload){
        //   return state;
        // }
        // if(state.todos.findIndex(t => t.text === action.payload) > -1){
        //   return state;

        // }
        const updatedTodo = { ...action.payload}
        const updateTodoIndex = state.todos.findIndex(
          t => t.id === state.currentTodo.id

        )
        const updateTodos = [
          ...state.todos.slice(0, updateTodoIndex), updatedTodo,
          ...state.todos.slice(updateTodoIndex + 1)

        ]
        return {
          ...state, 
          currentTodo: {}, 
          todos: updateTodos
        }
    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id)
      const isRemovedTodo = state.currentTodo.id === action.payload.id ? {}: state.currentTodo;

      return {
        ...state, 
        todos: filteredTodos
      }
    default:
      return state;
  }
}
