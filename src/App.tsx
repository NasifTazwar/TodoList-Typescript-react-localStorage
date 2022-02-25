import React,{ChangeEvent, FC, useCallback, useEffect, useReducer, useRef, useState} from 'react';
import './App.css';

interface Todo{
  id:number;
  homeWorkName: string;
  daysToComplete: string;
}

type ActionType =
  | { type: "ADD"; homeWorkName: string, daysToComplete: string }
  | { type: "REMOVE"; id: number };



const App : FC = () => {

  // const [myState, setMyState] = useState<Todo>();

  const getLocalStorage = () =>{
    let list = localStorage.getItem("todoLists");
    if(list == null){
      return [];
    }
      else
      {
        return ( JSON.parse(localStorage.getItem("todoLists")!))
      }
    };
  function reducer(state: Todo[], action: ActionType): Todo[] {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            homeWorkName: action.homeWorkName,
            daysToComplete: action.daysToComplete,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }

  const initialState = getLocalStorage() || [];
  const [todoLists, dispatch] = useReducer(reducer, initialState);

  const newInputTodo = useRef<HTMLInputElement>(null);
  const newInputTodo2 = useRef<HTMLInputElement>(null);

  const AddInputTodo = useCallback(() => {
    if (newInputTodo.current && newInputTodo2.current) {
      dispatch({
        type: "ADD",
        homeWorkName: newInputTodo.current.value,
        daysToComplete: newInputTodo2.current.value,
      });
      newInputTodo.current.value = "";
      newInputTodo2.current.value = "";
    };
    // console.log(sta);
  }, []);
  

  useEffect(()=>{
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  } , [todoLists]);

  return (
    <div className="App container-fluid d-flex align-items-center flex-column">
      <div className="header mt-5 d-flex justify-content-center">
        <div className="container my-5 g-2 row align-items-center w-75">
          <input
            className="form-control col-12"
            type="text"
            placeholder="Homeworks..."
            ref={newInputTodo}
          />
          <input
            className="form-control col-12"
            type="number"
            placeholder="Day..."
            ref={newInputTodo2}
          />
          <div className="col-12 d-flex justify-content-center mt-4">
            <button className="btn custom-btn w-75" onClick={AddInputTodo}>
              Add Homework
            </button>
          </div>
        </div>
      </div>
      <div className="todoList mt-5 container">
        {/* {todoLists.map((todoList) => (
          <div key={todoList.id}>
            {todoList.homeWorkName}
            {todoList.daysToComplete}
            <button
              onClick={() => dispatch({ type: "REMOVE", id: todoList.id })}
            >
              Remove
            </button> */}

            <ul className="ul-custom list-group list-group-numbered container-fluid my-5">
              {todoLists.map((todoList) =>(
                <li className="list-group-item d-flex justify-content-center align-items-center" key={todoList.id}>
                  <div className="ms-4 me-auto d-flex flex-column align-items-start">
                    <div className="fw-bold fs-5">{todoList.homeWorkName}</div>
                    <div className='fs-6'>
                    Day to Complete : {todoList.daysToComplete}
                    </div>
                  </div>
                  <button
                onClick={() => dispatch({ type: "REMOVE", id: todoList.id })}
              >
                Remove
              </button>
                </li>
              ))}
            </ul>
          </div>
      </div>
    // </div>
  );
}

export default App;
