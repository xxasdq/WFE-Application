'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../../style.css';

export default function Form() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState({
    vid: params.type[0], // vid
    type: params.type[1].toString(), // create or edit
    _id: params.type[2] || '', // booking id
    position: '',
    date: new Date().toISOString().split('T')[0],
    start: '00:00',
    end: '00:00',
  });

  useEffect(() => {
    if (params.type[2]) {
      (async function () {
        const data = await fetch(
          `http://localhost:3000/api/schedule/${params.type[0]}/${params.type[1]}/${params.type[2]}`
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
      setData({ ...data, ...result });
      router.push('/');
    }
  }

  async function buttonAction(e) {
    if (e.target.innerText !== 'Delete') {
      router.push('/');
    } else {
      const res = await fetch(
        `http://localhost:3000/api/schedule/${params.type[0]}/${params.type[1]}`,
        {
          method: 'POST',
          body: JSON.stringify({ _id: data._id }),
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  return (
    <form id='booking_form' onSubmit={booking}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Book Now / {params.type[1]}</h3>
        <button onClick={buttonAction}>
          {params.type[1] == 'edit' ? 'Delete' : 'Cancel'}
        </button>
      </div>
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          textAlign: 'center',
        }}
      >
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
      </div>
      <button className='btn'>
        {params.type[1].toLowerCase() == 'create' ? 'Book Now' : 'Update'}
      </button>
    </form>
  );
}
