"use client"
import Image from "next/image";
import {EventsProvider, useEvents} from "../contexts/EventContext"

export default function Landing() {
  const {events} = useEvents()
  return (
    <div>
        <p>Hi</p>
        {events.map((e, i)=>{
            return(<p key = {i}>{e.name}</p>)
        })}
    </div>
    
  );
}
