import React from 'react';
import check_icon from '../assets/checked.png';
import uncheck_icon from "../assets/unchecked.png"
import delete_icon from "../assets/delete.png"
import edit_icon from "../assets/edit.png"

function TodoItems({ text, id, isComplete, editTodo, deleteTodo, toggle }) {
  return (
    <div className='flex items-center my-3 gap-2'>
      {/* Checkbox and todo text */}
      <div onClick={() => { toggle(id) }} className="flex flex-1 items-center cursor-pointer">
        <img className='w-7' src={isComplete ? check_icon : uncheck_icon} alt="" />
        <p className={`text-slate-700 ml-4 text-[17px] ${isComplete ? "line-through" : ""}`}>{text}</p>
      </div>

      {/* Edit and delete icons */}
      <div className="flex">
        <img src={edit_icon} alt="" onClick={() => { editTodo() }} className='cursor-pointer w-9' />
        <img src={delete_icon} onClick={() => { deleteTodo(id) }} alt="" className='cursor-pointer w-7' />
      </div>
    </div>
  )
}

export default TodoItems;
