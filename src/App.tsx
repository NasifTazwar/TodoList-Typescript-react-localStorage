import React,{ChangeEvent, FC, useState} from 'react';
import './App.css';

const App : FC = () => {

  const [homeWork, setHomeWork] = useState<string>("");
  const [days, setDays] = useState<number>(0);
  const [todoList, setTodoList] = useState([]);


  const handleOnChange = (e : ChangeEvent<HTMLInputElement>) : void =>{
    if(e.target.value === "homeWork"){
      setHomeWork(e.target.value);
    }
    else{
      setDays(parseInt(e.target.value));
    }
  };

  const addHomeWork = () : void =>{
    setTodoList([...todoList , homeWork])
  }

  return (
    <div className="App container-fluid d-flex align-items-center flex-column">
      <div className="header mt-5 d-flex justify-content-center">
        <div className='container my-5 g-2 row align-items-center w-75'>
          <input className='form-control col-12' type="text" placeholder='Homeworks...' name='homeWork' onChange={handleOnChange}/>
          <input className='form-control col-12' type="number" placeholder='Day...' name='days' onChange={handleOnChange}/>
          <div className='col-12 d-flex justify-content-center mt-4'>
            <button className='btn custom-btn w-75' onClick={addHomeWork}>Add Homework</button>
          </div>
        </div>
      </div>
      <div className="todoList"></div>
    </div>
  );
}

export default App;
