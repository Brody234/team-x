import Link from 'next/link';
import React from 'react';
import { useLogin } from '../contexts/LoginContext';

//TODO change this or make it db default
const defaultPfp = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png";

const Header: React.FC = () => {
  const { localUser } = useLogin();

  function logout() { // TODO implement logout better :D
    window.location.reload();
  }

  return (
  <header className="sticky top-0 bg-fuchsia-600 z-10">
    <div className="flex flex-auto text-nowrap items-left pt-10 pr-10 pb-4 pl-14 w-full text-3xl font-medium text-left text-lime-800 bg-neutral-300 max-md:text-4xl">
      <Link href="/" className="navbar-brand">
        UMass Social Event Planner
      </Link>

      <div className="text-nowrap flex justify-end pt-15 pr-10 pb-4 pl-10 w-full text-3xl font-medium tracking-tighter text-left text-lime-800 bg-neutral-300 max-md:text-4xl">
        <ul className="flex space-x-4">
          <li className="nav-item">
            <Link href="/create/event" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">create event</Link>
          </li>
          <li className="nav-item">
            {!localUser ? 
            <Link href="/login" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">login</Link> : 
            <button onClick={logout} className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">logout</button>}
          </li>
          <li className="nav-item">
            <Link href="/" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">newsfeed</Link>
          </li>
          
          <li className="nav-item">
            <div className="w-12 h-12 bg-white rounded-full border-white border-2">
              <Link href="/profile" className="nav-link">
                <img src={(!localUser || localUser.pfp === "notalink.com") ? defaultPfp : localUser.pfp} width="100%" height="100%"/>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
  );
};

export default Header;
