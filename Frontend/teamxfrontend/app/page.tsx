"use client"
import Image from "next/image";
import {EventsProvider, useEvents} from "./contexts/EventContext"
import Landing from "./landing/page.jsx"
import NewsFeed from "./newsfeed/Newsfeed";

export default function App() {
  
  return (
      <NewsFeed></NewsFeed>
  );
}
