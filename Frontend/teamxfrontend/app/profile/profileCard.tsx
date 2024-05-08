import React from 'react';

const ProfileCard = () => {
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
            <div>
                <h2 className="text-3xl text-white font-bold">Full Name</h2>
                <p className="text-xl text-white">email@example.com</p>
            </div>
        </div>
    );
}

export default ProfileCard;