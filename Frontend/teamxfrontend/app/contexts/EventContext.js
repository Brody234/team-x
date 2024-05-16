import React, { createContext, useState, useContext, useEffect } from 'react';
import newRequest from '../utils/UseRequest';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [currentEvent, setEvent] = useState(null)
  const [events, setEvents] = useState([])
  useEffect(()=>{
    const fetchEvents = async () => {
        try{
            const response = await newRequest.get('/event/all')
            console.log(response.data)
            setEvents(response.data)
        }
        catch(err){
            console.log(err.message)
        }
    }
    fetchEvents()
  }, []);

  const getEvent = (id) => {
    return events.find((event) => event._id === id);
  }
  
  return (
    <EventsContext.Provider value={{ currentEvent, setEvent, events, setEvents, getEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
