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
    position: '',
    date: new Date().toISOString().split('T')[0],
    start: '00:00',
    end: '00:00',
    editable: false, // readOnly = false => editable or readOnly = true => no editable
  });

  // data recovered for update
  useEffect(() => {
    if (params.type[2]) {
      (async function () {
        const data = await fetch(
          `http://localhost:3000/api/schedule/${params.type[0]}/${params.type[1]}/${params.type[2]}`
        );
        const result = await data.json();
        setData(result);
      })();
    }
  }, [params.type[2]]);

  // delete or cancel action
  async function buttonAction(e) {
    if (e.target.innerText == 'Delete') {
      await fetch(
        `http://localhost:3000/api/schedule/${params.type[0]}/delete`,
        {
          method: 'POST',
          body: JSON.stringify({ _id: data._id, vid: data.vid }),
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    router.push('/');
  }

  const bookNow = booking.bind(null, params.type[1]);

  return (
    <Container>
      <button id='buttonAction' onClick={buttonAction}>
        {params.type[1] == 'edit' ? 'Delete' : 'Cancel'}
      </button>
      <form id='booking_form' action={bookNow}>
        <div id='form-header'>
          <h3>Book Now / {params.type[1]}</h3>
        </div>
        <Input type='hidden' name='_id' value={params.type[2]} />
        <div>
          <label htmlFor='vid'>VID:</label>
          <Input
            type='text'
            name='vid'
            maxl={6}
            value={params.type[0]}
            readOnly
          />
        </div>
        <div>
          <label htmlFor='position'>Position:</label>
          <Input
            type='text'
            name='position'
            maxl={20}
            placeholder='XXXX_TWR/APP/CTR'
            readOnly={data.editable}
            value={data.position}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='date'>Date</label>
          <Input
            type='date'
            name='date'
            min={new Date().toISOString().split('T')[0]}
            readOnly={data.editable}
            value={data.date}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div id='time'>
          <div>
            <label htmlFor='start'>Start</label>
            <Input
              type='time'
              name='start'
              value={data.start}
              readOnly={data.editable}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor='end'>End</label>
            <Input
              type='time'
              name='end'
              readOnly={data.editable}
              value={data.end}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
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
