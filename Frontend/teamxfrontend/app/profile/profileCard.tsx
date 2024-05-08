import React from 'react';
import { useClubs } from '../contexts/ClubContext';
import { useLogin } from '../contexts/LoginContext';

const ProfileCard = () => {
    const { localUser } = useLogin();
  const { getClub } = useClubs();
    const user = localUser;
    return (
        
        // <div className="bg-green-500 p-8 flex items-center rounded-lg shadow-md max-w-lg">
        //     <img src="../../public/UMassLogo.png" alt="Profile Avatar" className="w-32 h-32 rounded-full mr-8 object-cover" />
        //     <div>
        //         <h2 className="text-2xl text-white font-semibold">Full Name</h2>
        //         <p className="text-lg text-white">email@example.com</p>
        //     </div>
        // </div>
        <div className="bg-green-500 p-12 flex items-center rounded-lg shadow-xl max-w-2xl">
            <img src="../../public/UMassLogo.png" alt="Profile Avatar" className="w-48 h-48 rounded-full mr-12 object-cover" />
            
            <div className="flex flex-col items-left justify-left w-full flex-1 px-10 text-left">
                <h1 className="text-3xl text-black font-bold">
                {user.name ? user.name : "No Name"}
                </h1>
                <p className="mt-3 text-2xl">{user.email}</p>
                <p className="mt-3 text-2xl"> {/*TODO make club viewer more robust*/}
                    Clubs: {user.clubs && user.clubs.length > 0 ? user.clubs.map((club: any) => getClub(club).name).join(", ") : "None"}
                </p>

            </div>
        </div>
        
    );
}

export default ProfileCard;