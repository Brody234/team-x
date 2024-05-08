"use client"
import React, { useEffect, useState } from 'react';
import { useLogin } from '../contexts/LoginContext';
import Header from '../header/header';
import SearchBar from '../component/search';
import ProfileCard from './profileCard';
import { useRouter } from 'next/navigation';
import { useClubs } from '../contexts/ClubContext';


//TODO change this or make it db default
const defaultPfp = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png";

export default function Profile() {
  const { localUser } = useLogin();
  const { getClub } = useClubs();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  if(!localUser) {
    router.push("/login?redirect=/profile", {})
    return <div>Redirecting to login...</div>
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  

  //this line is temporary until we want to view other users' pages while not signed in as them
  //they will be allowed to see a limited subset of information as compared to their own profile view
  const user = localUser;

  return (
    <>
    <Header />
      <h1 className = "text-3xl text-Black font-bold">Profile</h1>
        <h2>
          <div className="search-bar">
            <input type="text" placeholder="Search"/>
            <button>Default</button>
            <button>A-Z</button>
            <button>List view</button>
          </div>
        </h2>
      <div className="flex flex-row w-full">
        <div className="flex p-4 w-1/2">
          <ProfileCard />
        </div>
      </div>

    <div className="flex">
        {/* Search bar container */}
        <div className="sticky-search bg-gray-100 p-4 top-0 z-10 h-screen w-64 border-r border-gray-300">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
    </div> 
    </>
  )
}
