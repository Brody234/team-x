"use client"

import { useLogin } from '../contexts/LoginContext';
import Header from '../header/header';
import { useRouter } from 'next/navigation';
import { useClubs } from '../contexts/ClubContext';
import { useEffect } from 'react';

//TODO change this or make it db default
const defaultPfp = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png";

export default function Profile() {
  const { localUser } = useLogin();
  const { getClub } = useClubs();
  const router = useRouter();

  useEffect(() => {
    if(!localUser) {
      router.push("/login?redirect=/profile", {});
    }
  }, [localUser, router]);

  if(!localUser) {
    return <div>Redirecting to login...</div>;
  }

  //this line is temporary until we want to view other users' pages while not signed in as them
  //they will be allowed to see a limited subset of information as compared to their own profile view
  const user = localUser;

  return (
    <>
    <Header />
    <div className ="flow-root"></div>

    <div className="items-center space-y">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold color-black">
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
    </>
  )
}
