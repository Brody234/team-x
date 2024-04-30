import Link from 'next/link';
import React from 'react';
import { useLogin } from '../contexts/LoginContext';

const Header: React.FC = () => {
  const { localUser } = useLogin();

  function logout() { // TODO implement logout better :D
    window.location.reload();
  }

  return (
    <header className="flex-col bg-fuchsia-600">
    <div className="flex flex-auto text-nowrap items-left pt-10 pr-10 pb-4 pl-14 w-full text-3xl font-medium text-left text-lime-800 bg-neutral-300 max-md:text-4xl">
      <Link href="/" className="navbar-brand">
        UMass Social Event Planner
      </Link>


    <div className="text-nowrap flex justify-end pt-15 pr-10 pb-4 pl-10 w-full text-3xl font-medium tracking-tighter text-left text-lime-800 bg-neutral-300 max-md:text-4xl">
      <ul className="flex space-x-4">
        <li className="nav-item">
          {!localUser ? 
          <Link href="/login" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">login</Link> : 
          <button onClick={logout} className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">logout</button>}
        </li>
        <li className="nav-item">
          <Link href="/" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">newsfeed</Link>
        </li>
        <li className="nav-item">
          <Link href="/profile" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">profile</Link>
        </li>
      </ul>
    </div>
    </div>
  </header>
  );
};

export default Header;
