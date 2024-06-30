import { useEffect, useRef, useState } from 'react';
import todo_icon from '../../src/assets/todo_icon.png';
import TodoItems from './TodoItems';

function Todo() {
  // Retrieve todos from local storage or initialize empty array
  const localTodo = localStorage.getItem("todos");
  const [todoList, setTodoList] = useState(localTodo ? JSON.parse(localTodo) : []);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [currentTodo, setCurrentTodo] = useState(null); // State to store current todo being edited
  const inputRef = useRef(); // Reference to input element for adding/editing todos

  // Function to add or update a todo item
  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return;
    }

    if (isEditing) {
      // Update existing todo
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === currentTodo.id ? { ...todo, text: inputText } : todo
        )
      );
      setIsEditing(false); // Exit editing mode
      setCurrentTodo(null); // Clear current todo
    } else {
      // Add new todo
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
      };
      setTodoList((prev) => [...prev, newTodo]);
    }
    inputRef.current.value = ""; // Clear input field
  };

  // Function to delete a todo item
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  // Function to set editing mode and populate input with todo text
  const editTodo = (todo) => {
    inputRef.current.value = todo.text;
    setIsEditing(true); // Set editing mode
    setCurrentTodo(todo); // Set current todo for editing
  };

  // Function to toggle completeness of a todo item
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  // Store todoList in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className='bg-white place-self-center w-full md:w-11/12 max-w-md flex flex-col min-h-[550px] p-4 md:p-7 rounded-xl'>
      {/* Header */}
      <div className="flex items-center mt-4 md:mt-7 gap-2">
        <img className='w-8 md:w-10' src={todo_icon} alt="Todo Icon" />
        <h1 className="text-2xl md:text-3xl font-semibold">TODO</h1>
      </div>

      {/* Input section for adding/editing todos */}
      <div className="flex items-start my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          id='title'
          className='border-0 rounded-tl-full rounded-bl-full bg-transparent outline-none flex-1 h-14 pl-6 pr-3 placeholder:text-slate-600'
          placeholder='Add your task'
        />
        <button
          onClick={add}
          className='border-none rounded-tr-full rounded-br-full bg-orange-600 w-20 h-14 text-white'
        >
          {isEditing ? "Update" : "Add +"}
        </button>
      </div>

      {/* Todo list section */}
      <div>
        {todoList && todoList.length > 0 ? (
          todoList.map((item, index) => (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              editTodo={() => editTodo(item)}
              toggle={toggle}
            />
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </div>
  );
}

export default Todo;
