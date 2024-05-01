"use client";
import Form from '../../component/form';
import {useLogin} from '../../contexts/LoginContext';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import Header from '../../header/header';
import newRequest from '../../utils/UseRequest';
import { useClubs } from '../../contexts/ClubContext'

const formData = [
  {
    name: 'name',
    label: 'Event Name',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    required: true,
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
  },
  {
    name: 'time',
    label: 'Time',
    type: 'time',
    required: true,
  },
  {
    name: 'location',
    label: 'Event Location',
    type: 'text',
    required: true,
  },
  {
    name: 'image',
    label: 'Image Link',
    type: 'text',
    required: false,
  }
];

interface Event {
  name?: string;
  description?: string;
  startTime?: Date;
  location?: string;
  image?: string;
  clubPosting?: string;
}

export default function CreateEventPage() {

  const {token, localUser} = useLogin();
  const {getClub} = useClubs();
  const router = useRouter();

  const [clubId, setClubId] = useState(localUser && localUser.clubsOwned && localUser.clubsOwned.length > 0 ? localUser.clubsOwned[0] : '');

  useEffect(() => {
    if(!localUser) {
      router.push('/login?redirect=/create/event');
    }
  }, [localUser, router]);

  if (!localUser) {
    return <h1>Redirecting...</h1>
  }

  function onSubmit(data: any) {
    console.log(data);
    let event: Event = {};
    event['name'] = data.name;
    event['description'] = data.description;
    event['startTime'] = new Date(`${data.date}T${data.time}`);
    event['location'] = data.location;
    event['image'] = data.image;
    event['clubPosting'] = clubId;
    newRequest.post('/event/create', event, {headers: {token}});

    router.push('/');
  }

  function handleChange(e: any) {
    setClubId(e.target.value);
  }

  return (
    <>
    <Header />
    <div className="flex flex-col justify-center items-center px-16 py-20 w-full max-md:px-5 max-md:max-w-full">
      {localUser.clubsOwned && localUser.clubsOwned.length > 0 && (
        <>{/* select which clubs you are posting on behalf of from those you are the admin of */}
        <select onChange={handleChange} className="w-32 text-black h-8 rounded-full text-center">
          {localUser.clubsOwned.map((club: any, index: any) => {
            return (
              <option key={index} value={club}>{getClub(club).name}</option>
            )
          })}
        </select>
        </>
      )}
    </div>
    { localUser.clubsOwned && localUser.clubsOwned.length > 0 && (
    <div className="flex flex-col justify-center items-center px-16 py-20 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center gap-2 py-9 pr-20 pl-20 mt-2 mb-1 max-w-full outline outline-2 outline-gray hover:outline-8 transition-all duration-300 rounded-3xl w-[795px] max-md:flex-wrap max-md:px-5">
        <div className="text-3xl font-bold text-center">
          Create Event
        </div>
        <Form formData={formData} onSubmit={onSubmit} />
      </div>
    </div>)}
    </>
  );
}
