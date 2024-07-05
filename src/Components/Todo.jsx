import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {
  const [todoList,setTdoList]=useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")):[])
  const inputRef=useRef()
  const Add=()=>{
    const inputText=inputRef.current.value.trim()
    
    if (inputText==="") {
      return null
    }
    const newTodo = {
      id:Date.now(),
      text:inputText,
      isComplete:false
    }
    setTdoList((prev=>[...prev,newTodo]))
    inputRef.current.value=""
  }
  const deleteTodo= (id)=>{
    setTdoList((prevTodo)=>(prevTodo.filter((todo)=>(todo.id!==id))))
  }
  const toggle= (id)=>{
    setTdoList((prevTodo)=>{
      return prevTodo.map((todo)=>{
        if (todo.id===id) {
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo
      })
    })
  }
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList))
  },[todoList])
  console.log(todoList)
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        <div className='flex items-center mt-7px gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>
        <div className='flex items-center bg-gray-200 my-7 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-none outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
            <button onClick={Add} className='border-none rounded-full bg-orange-600 h-14 w-32 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>
        <div>
          {
            todoList.map((item,index)=>{
              return(
                <TodoItems key={index} id={item.id} isComplete={item.isComplete} text={item.text} deleteTodo={deleteTodo} toggle={toggle}/>
              )
            })
          } 
        </div>
    </div>
  )
}

export default Todo