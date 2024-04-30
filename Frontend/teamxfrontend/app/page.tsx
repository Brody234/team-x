"use client"
import Image from "next/image";
import {EventsProvider, useEvents} from "./contexts/EventContext"
import NewsFeed from "./newsfeed/Newsfeed";

export default function App() {
  
  return (
      <NewsFeed></NewsFeed>
  );
}
