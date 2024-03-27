"use client"
import Image from "next/image";
import {EventsProvider, useEvents} from "./contexts/EventContext"
import Landing from "./landing/page"

export default function App() {
  
  return (
    <EventsProvider>
      <Landing></Landing>
    </EventsProvider>
  );
}
