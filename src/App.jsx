import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Todo from './components/Todo'

function App() {

  return (
    <div className='bg-stone-900 grid py-4 min-h-screen min-w-full'>
    <Todo/>
    </div>
  )
}

export default App


