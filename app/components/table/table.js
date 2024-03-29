'use client';
import { useEffect, useState } from 'react';
import getData from './getData';
import Container from '../container/container';
import RowData from './row-data';
import './table.css';

export default function Table() {
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const fields = new Array(25).fill({}); //represents time fields

  useEffect(() => {
    (async function () {
      setBookings(await getData(date));
    })();
  }, [date]);

  return (
    <>
      <input
        id='date-picker'
        type='date'
        name='bookings'
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <hr />

      <Container style={{ overflowX: 'scroll' }}>
        <table id='schedule'>
          <thead>
            <tr>
              <th>Position</th>
              {/* the index is used only beacuse
                the array has no values and the length of the array
                will not change / index is not recommend
            */}
              {fields.map((value, index) => (
                <th key={index}>
                  {index.toString().length == 1 ? `0${index}` : index}
                  {/* index = 0 => 00 or index = 11 => 11 (it does not change) */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((position) => (
              <tr key={position._id}>
                <td>{position._id}</td>
                <RowData bookings={position.result} />
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}
