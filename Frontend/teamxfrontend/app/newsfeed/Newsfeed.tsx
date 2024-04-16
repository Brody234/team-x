import React, { useState } from 'react';
import Header from '../header/Header';
import { useEvents } from '../contexts/EventContext';

interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
}

const initialNewsItems: NewsItem[] = [
  {
    id: 1,
    title: 'News Title 1',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 2,
    title: 'News Title 2',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 3,
    title: 'News Title 3',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 1,
    title: 'News Title 1',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 2,
    title: 'News Title 2',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 3,
    title: 'News Title 3',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 1,
    title: 'News Title 1',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 2,
    title: 'News Title 2',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },
  {
    id: 3,
    title: 'News Title 3',
    imageUrl: 'https://via.placeholder.com/300x200',
    content: 'Something something event',
  },

];


//Pull Data from Backend



const NewsFeed: React.FC = () => {
  const {events, setEvents} = useEvents();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(initialNewsItems);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    setFilteredNews(
      initialNewsItems.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  


  return (

    <>
    {/* Include the Header component */}
    <Header />

    <div className ="flow-root"></div>

    <div className="container ">
      <div className="flex justify-start">
        <div className="col-md-3 pr-20 pl-10">
          <h2>Search</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ color: 'black' }}
          />
          <h2>Filters</h2>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="filter1" />
            <label className="form-check-label" htmlFor="filter1">
              Filter 1
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="filter2" />
            <label className="form-check-label" htmlFor="filter2">
              Filter 2
            </label>
          </div>
        </div>
        <div className="flex justify-end pt-6 pl-80 grid gap-4 grid-cols-3">
          {/*filteredNews.map((item) => (
            <div className="news-item mb-4" key={item.id}>
              <img src={item.imageUrl} alt="News" className="img-fluid mb-2" />
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))*/}
          {
            events.map((event: any) => {
              console.log(event);
              return <div className="news-item mb-4" key={event._id}>
                <img src={event.image} alt="News" className="img-fluid mb-2" />
                <h3>{event.name}</h3>
                <p>{event.description}</p>
              </div>
            })
          }
        </div>
      </div>
    </div>
  </>
);
};




export default NewsFeed;
