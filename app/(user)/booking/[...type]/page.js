'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../../style.css';

export default function Form() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState({
    type: params.type[1], // create or edit
    _id: params.type[2] || '', // booking id -> type == edit -> params.type[1]
    vid: params.type[0],
    position: '',
    date: new Date().toISOString().split('T')[0],
    start: '00:00',
    end: '00:00',
  });

  useEffect(() => {
    if (params.type[2]) {
      (async function () {
        const data = await fetch(
          `http://localhost:3000/api/schedule/${params.type[0]}/${params.type[1]}/${params.type[2]}`,
          {
            method: 'POST',
            body: JSON.stringify({ _id: params.type[2] }),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const result = await data.json();
        setData({ ...data, ...result });
      })();
    }
  }, [params.type[2]]);

  function getData(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function booking(e) {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:3000/api/schedule/${params.type[0]}/${params.type[1]}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const result = await res.json();

    if (result) {
      router.push('/');
    }
  }

  return (
    <form id='booking_form' onSubmit={booking}>
      <h3>Book Now / {params.type[1]}</h3>
      <div>
        <label htmlFor='vid'>VID:</label>
        <input
          type='text'
          name='vid'
          value={params.type[0]}
          maxLength={6}
          readOnly
          onChange={getData}
        />
      </div>
      <div>
        <label htmlFor='position'>Position:</label>
        <input
          type='text'
          name='position'
          maxLength={20}
          placeholder='XXXX_TWR/APP/CTR'
          value={data.position}
          onChange={getData}
        />
      </div>
      <div>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          name='date'
          min={new Date().toISOString().split('T')[0]}
          value={data.date}
          onChange={getData}
        />
      </div>
      <div>
        <label htmlFor='start'>Start</label>
        <input
          type='time'
          name='start'
          step={3600}
          min='00:00'
          max='23:00'
          value={data.start}
          onChange={getData}
        />
      </div>
      <div>
        <label htmlFor='end'>End</label>
        <input
          type='time'
          name='end'
          step={3600}
          min='00:00'
          max='23:00'
          value={data.end}
          onChange={getData}
        />
      </div>
      <button type='submit' className='btn'>
        {params.type[1].toLowerCase() == 'create' ? 'Book Now' : 'Update'}
      </button>
    </form>
  );
}
