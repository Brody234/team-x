"use client"

import { useLogin } from '../contexts/LoginContext';
import Header from '../header/header';
import { useRouter } from 'next/navigation';
import { useClubs } from '../contexts/ClubContext';
import { useEffect } from 'react';
import { useEvents } from '../contexts/EventContext';

//TODO change this or make it db default
const defaultPfp = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png";

export default function Profile() {
  const { localUser } = useLogin();
  const { getClub } = useClubs();
  const { getEvent } = useEvents();
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
      <div className="profile-container">
        <div className="container mx-auto h-full px-4">
          <div className="flex justify-between items-center my-4">
            <div className="flex-1 max-w-sm bg-green-400 p-4 rounded">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-400 h-16 w-16">
                  <img src={user.pfp === "notalink.com" ? defaultPfp : user.pfp} alt="Profile Picture" className="img-fluid mb-2" />
                </div>
                <div>
                  <p className="font-bold">{user.name ? user.name : "No Name"}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-400 p-4 rounded ml-4">
              <p className="font-bold">Clubs</p>
              <p>{user.clubs && user.clubs.length > 0 ? user.clubs.map((club: any) => getClub(club).name).join(", ") : "None"}</p>
            </div>
          </div>
          {/* display events the user is going to on the rest of the page as two columns*/}
          <div className="bg-gray-400 p-4 rounded">
            <div className="col-md-9">
              <p className="font-bold">Events</p>
              <div className="flex justify-center pt-6 grid gap-4 grid-cols-2">
                {user.events && user.events.length > 0 ? user.events.map((event: any) => {
                  const e = getEvent(event);
                  return (
                    <div key={event} className="news-item mb-4 bg-white rounded p-4">
                      <div className="flex flex-col items-center">
                        <img src={e.image} alt="News" className="img-fluid mb-2" />
                        <h3 className="text-center">{e.name}</h3>
                        <p className="text-center">{e.description}</p>
                      </div>
                    </div>
                  );
                }) : <div>No events</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
