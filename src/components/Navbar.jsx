import React from 'react';

function Navbar() {
  return (
    <nav className='container bg-gray-800 mx-auto p-2 text-white flex justify-around'>
      {/* Logo */}
      <div className="logo">
        sTask
      </div>

      {/* Navigation links */}
      <ul className="flex list-none gap-4">
        <li className='hover:text-orange-600 hover:font-bold'>Home</li>
        <li className='hover:text-orange-600 hover:font-bold'>Task</li>
      </ul>
    </nav>
  );
}

export default Navbar;
