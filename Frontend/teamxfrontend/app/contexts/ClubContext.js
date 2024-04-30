import React, { createContext, useContext, useState, useEffect } from 'react';
import newRequest from '../utils/UseRequest';

export const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
    const [clubs, setClubs] = useState([]);

    const getClub = (id) => {
        return clubs.find((club) => club._id === id);
    }

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await newRequest.get('/club/all');
                const data = response.data;
                setClubs(data);
            } catch (error) {
                console.error('Error fetching clubs:', error);
            }
        };

        fetchClubs();
    }, []);

    return (
        <ClubContext.Provider value={{clubs, getClub}}>
            {children}
        </ClubContext.Provider>
    );
};

export const useClubs = () => useContext(ClubContext);