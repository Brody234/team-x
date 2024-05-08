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
      <h1>Profile
        <div className="search-bar">
            <input type="text" placeholder="Search"/>
            <button>Default</button>
            <button>A-Z</button>
            <button>List view</button>
        </div>
      </h1>
      <div className="flex flex-row w-full">
        <div className="flex p-4 w-1/2">
          <ProfileCard />
        </div>
      </div>
        
    <div className ="flow-root"></div>
    <div className="flex items-center gap-10 py-9 pr-40 pl-40 mt-2 mb-1 max-w-full bg-green-300 rounded-3xl w-[795px] max-md:flex-wrap max-md:px-20">
    <div className="items-left space-y">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
          {user.name ? user.name : "No Name"}
          </h1>

        <img src={user.pfp === "notalink.com" ? defaultPfp : user.pfp} height="100px" width="100px" alt="Profile Picture" className="img-fluid mb-2" />

        <p className="mt-3 text-2xl">
        {user.email}
        </p>
        
        <p className="mt-3 text-2xl"> {/*TODO make club viewer more robust*/}
        Clubs: {user.clubs && user.clubs.length > 0 ? user.clubs.map((club: any) => getClub(club).name).join(", ") : "None"}
        </p>
            
      </div>
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
