'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Container from '@/app/components/container/container';
import Input from '@/app/components/form/input';
import Button from '@/app/components/form/button';
import booking from './actions/booking';
import '../../style.css';

export default function Form() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState({
    vid: params.type[0], // vid
    type: params.type[1].toString(), // create or edit
    _id: params.type[2] || '', // booking id
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
  }, []);

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

  const bookNow = booking.bind(null, params.type[1]);

  return (
    <Container>
      <form id='booking_form' action={bookNow}>
        <div id='form-header'>
          <h3>Book Now / {params.type[1]}</h3>
          <button onClick={buttonAction}>
            {params.type[1] == 'edit' ? 'Delete' : 'Cancel'}
          </button>
        </div>
        <div>
          <label htmlFor='vid'>VID:</label>
          <Input
            type='text'
            name='vid'
            max={6}
            readOnly
            value={params.type[0]}
          />
        </div>
        <div>
          <label htmlFor='position'>Position:</label>
          <Input
            type='text'
            name='position'
            max={20}
            placeholder='XXXX_TWR/APP/CTR'
          />
        </div>
        <div>
          <label htmlFor='date'>Date</label>
          <Input
            type='date'
            name='date'
            min={new Date().toISOString().split('T')[0]}
            value={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div id='time'>
          <div>
            <label htmlFor='start'>Start</label>
            <Input type='time' name='start' defaultValue='00:00' />
          </div>
          <div>
            <label htmlFor='end'>End</label>
            <Input type='time' name='end' defaultValue='00:00' />
          </div>
        </div>
        <Button
          type='submit'
          name={
            params.type[1].toLowerCase() == 'create' ? 'Book Now' : 'Update'
          }
        />
      </form>
    </Container>
  );
}
