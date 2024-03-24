'use client';
import { useEffect, useState } from 'react';
import './table.css';

export default function Table() {
  const [dateNow, setDateNow] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [bookings, setBookings] = useState([]);
  const fields = new Array(25).fill({}); //represent time fields

  useEffect(() => {
    (async function () {
      const data = await fetch('http://localhost:3000/api/schedule', {
        method: 'POST',
        body: JSON.stringify({ dateNow: dateNow.toString() }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await data.json();
      setBookings(result);
    })();
  }, [dateNow]);

  return (
    <>
      <input
        type='date'
        name='bookings'
        onChange={(e) => setDateNow(e.target.value)}
        value={dateNow}
      />
      <hr />
      <table id='schedule'>
        <thead>
          <tr>
            <th>Position</th>
            {fields.map((booking, index) => (
              <th key={index}>
                {index.toString().length == 1 ? `0${index}` : index}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((position) => (
            <tr key={position._id}>
              <td>{position._id}</td>
              <TD bookings={position.result} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function TD({ bookings }) {
  const fields = new Array(25).fill({}); //represent time fields
  let start = 0;
  let end = 0;

  for (let i = 0; i < bookings.length; i++) {
    start = removeZero(bookings[i].start);
    end = removeZero(bookings[i].end);

    const newBooking = bookings[i];
    newBooking['colspan'] = end - start;
    fields.splice(start, end - start, newBooking);
  }

  return (
    <>
      {fields.map((booking) => (
        <td
          key={booking._id}
          colSpan={booking.colspan}
          className={booking._id ? 'booked' : ''}
        >
          {booking.vid}
        </td>
      ))}
    </>
  );
}

function removeZero(time) {
  return time.split(':')[0].split('')[0].toString() == 0
    ? Number(time.split(':')[0].split('')[1])
    : Number(time.split(':')[0]);
}
