"use client"
import Image from "next/image";
import {EventsProvider, useEvents} from "./contexts/EventContext"
import Landing from "./landing/page.jsx"

export default function App() {
  
  return (
      <Landing></Landing>
  );
}
