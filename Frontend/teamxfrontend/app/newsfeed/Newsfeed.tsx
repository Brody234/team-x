import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import SearchBar from '../component/search';
import Button from '../component/button';
import { useEvents } from '../contexts/EventContext'
import newRequest from '../utils/UseRequest';
import { useLogin } from '../contexts/LoginContext';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const NewsFeed: React.FC = () => {
  

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [dayFilts, setDayFilts] = useState([])
  const [tagFilts, setTagFilts] = useState([])
  const { events } = useEvents(); 
  const { localUser} = useLogin();
  const [filteredNews, setFilteredNews] = useState([]);

  // Function to handle scroll events
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
  const [isSubscribed, setIsSubscribed] = useState([]);

  useEffect(() => {
    if (localUser && filteredNews.length > 0) {
      const subscribedStatus = filteredNews.map(event => 
        event.attendees.map(a => a.toString()).includes(localUser._id.toString())
      );
      setIsSubscribed(subscribedStatus);
    }
  }, [filteredNews, localUser]);

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

  useEffect(()=>{
    const filteredByName = events.filter((event: any) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let intermediateFiltered = filteredByName;

    if (dayFilts.length > 0) {
      intermediateFiltered = filteredByName.filter(event => {
        const eventDate = new Date(event.startTime);
        const dayName = daysOfWeek[eventDate.getDay()];
        return dayFilts.includes(dayName);
      });
    }
    if (tagFilts.length > 0) {
      intermediateFiltered = intermediateFiltered.filter(event =>
        event.tags.some(tag => tagFilts.includes(tag))
  );
    }
    
      
          // Update the state with the filtered news
          setFilteredNews(intermediateFiltered);
      
        
  },[dayFilts, tagFilts])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };



  const handleClick = async (event:any, index: number) => {
    const newSubscribedStatus = [...isSubscribed];
    newSubscribedStatus[index] = !newSubscribedStatus[index];
    setIsSubscribed(newSubscribedStatus);

    try{
      const data = await newRequest.patch('/event/going/'+ event._id)

    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <>
      {/* Include the Header component */}
      <div className={`sticky top-0 z-20 ${true ? 'block' : 'hidden'}`}>
        <Header />
      </div>


      <div className="flex">
        {/* Search bar container */}
        <div className="sticky-search bg-gray-100 p-4 top-0 z-10 h-screen w-64 border-r border-gray-300">
          <SearchBar value={searchQuery} dayFilts = {dayFilts} setDayFilts = {setDayFilts} tagFilts = {tagFilts} setTagFilts = {setTagFilts} onChange={handleSearch} />
        </div>

        {/* Main content container */}
        <div className="container mx-auto px-4 mt-16">
          <div className="col-md-9">
            <div className="flex justify-center pt-6 grid gap-4 grid-cols-2">
            {filteredNews.map((event, i) => (
              <div key={i} className="news-item mb-4 bg-white rounded p-4">
                <div className="flex flex-col items-center">
                  <img src={event.image} alt="News" style={{ maxHeight: "200px", maxWidth: "300px", width: "300px" }} />
                  <h3 className="text-center">{event.name}</h3>
                  <p className="text-center">{event.description}</p>
                  {localUser && localUser._id ?
                    <Button subscribed = {isSubscribed[i]} onClick={() => handleClick(event, i)}>
                      {isSubscribed[i] ? 'Subscribed' : 'Subscribe'}
                    </Button>
                    : <></>
                  }
        

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
