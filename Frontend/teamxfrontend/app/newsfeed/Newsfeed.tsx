import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import SearchBar from '../component/search';
import Button from '../component/button';
import { useEvents } from '../contexts/EventContext'


const NewsFeed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const { events } = useEvents(); 
  const [filteredNews, setFilteredNews] = useState<Event[]>([]);

  // Function to handle scroll events
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  useEffect(() => {

    const filtered = events.filter((event: any, i: number) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchQuery, events]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };



  const handleClick = () => {
    //Back end code goes here
  };

  return (
    <>
      {/* Include the Header component */}
      <div className={`sticky top-0 z-20 ${visible ? 'block' : 'hidden'}`}>
        <Header />
      </div>


      <div className="flex">
        {/* Search bar container */}
        <div className="sticky-search bg-gray-100 p-4 top-0 z-10 h-screen w-64 border-r border-gray-300">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>

        {/* Main content container */}
        <div className="container mx-auto px-4 mt-16">
          <div className="col-md-9">
            <div className="flex justify-center pt-6 grid gap-4 grid-cols-2">
            {filteredNews.map((events: any, i: number) => (
                <div key={i} className="news-item mb-4 bg-white rounded p-4">
                  <div className="flex flex-col items-center">
                    <img src={events.image} alt="News" className="img-fluid mb-2" />
                    <h3 className="text-center">{events.name}</h3>
                    <p className="text-center">{events.description}</p>
                    <Button onClick={handleClick}>Subscribe</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
