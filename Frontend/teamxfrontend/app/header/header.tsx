import Link from 'next/link';
import React from 'react';



const Header: React.FC = () => {
  return (
    <header className="flex-col bg-fuchsia-600">
    <div className="flex flex-auto text-nowrap items-left pt-10 pr-10 pb-4 pl-14 w-full text-3xl font-medium text-left text-lime-800 bg-neutral-300 max-md:text-4xl">
      <Link href="/" className="navbar-brand">
        UMass Social Event Planner
      </Link>


    <div className="text-nowrap flex justify-end pt-15 pr-10 pb-4 pl-10 w-full text-3xl font-medium tracking-tighter text-left text-lime-800 bg-neutral-300 max-md:text-4xl">
      <ul className="flex space-x-4">
        <li className="nav-item">
          <Link href="/login" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">login</Link>
        </li>
        <li className="nav-item">
          <Link href="/landing" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">landing</Link>
        </li>
        <li className="nav-item">
          <Link href="/newsfeed" className="nav-link inline-block px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-lime-800 hover:bg-gray-800">newsfeed</Link>
        </li>
      </ul>
    </div>
    </div>
  </header>
  );
};

export default Header;
