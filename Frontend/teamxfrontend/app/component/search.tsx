import React, {useState, useEffect} from 'react';
import newRequest from '../utils/UseRequest';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const SearchBar = ({ value, dayFilts, setDayFilts, tagFilts, setTagFilts, onChange }: any) => {
  const [tags, setTags] = useState([""])
  
  useEffect(()=>{
    const r = async ()=>{
      try{
        console.log("tags")
        const tagsR = await newRequest.get('/tags/all')
        setTags(tagsR.data.map(item => item.tag))
      }
      catch(err){

      }
    }
    r()
  }, [])
  return (
    <div className="container mx-auto">
      <h2 className="mb-4">Search</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        style={{ color: 'black' }}
      />
      <hr className="my-4" /> {/* Add horizontal line after Search */}
      {/* Time filter */}
      <h3 className="mb-2"></h3>
      {days.map((val, i)=>{
        return(
          <DayFilt day = {val} dayFilts = {dayFilts} key = {i} setDayFilts = {setDayFilts}></DayFilt>
        )
      })}

      <hr className="my-4" /> {/* Add horizontal line after Time filters */}
      {/* Location filter */}
      <h3 className="mb-2"></h3>
      {tags.map((val, i)=>{
        return(
          <TagFilt tag = {val} key = {i} tagFilts = {tagFilts} setTagFilts = {setTagFilts}></TagFilt>
        )
      })}
      
      {/* Add more filter categories as needed */}
    </div>
  );
};

const DayFilt = ({day, setDayFilts, dayFilts, key}: any) => {
  const upDays = () => {
    if(dayFilts.includes(day)){
      setDayFilts(currentDays => currentDays.filter(dayr => dayr !== day))
    }
    else{
      setDayFilts(currentDays => [...currentDays, day])
    }
  }
  return(
  <div className="form-check mb-2">
  <input className="form-check-input" type="checkbox" checked={dayFilts.includes(day)}
value="" id={key} onClick = {upDays} />
  <label className="form-check-label" htmlFor="timeFilter1" >
    {day}
  </label>
  </div>)

} 

const TagFilt = ({tag, tagFilts, setTagFilts, key}:any) =>{
  const upTags = () => {
    if(tagFilts.includes(tag)){
      setTagFilts(currentDays => currentDays.filter(tagr => tagr !== tag))
    }
    else{
      setTagFilts(currentDays => [...currentDays, tag])
    }
  }

  return (
    <div className="form-check mb-2">
    <input className="form-check-input" type="checkbox"  checked={tagFilts.includes(tag)} value="" id={key} onClick = {upTags} />
    <label className="form-check-label" htmlFor="locationFilter2">
      {tag}
    </label>
  </div>

  )
}

export default SearchBar;
