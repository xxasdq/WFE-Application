import Link from 'next/link';
import { GiRadarSweep } from 'react-icons/gi';
import './table.css';

export default function RowData({ bookings }) {
  const fields = new Array(25).fill({}); //represents time fields
  let start = 0;
  let end = 0;

  for (let i = 0; i < bookings.length; i++) {
    start = removeZero(bookings[i].start);
    end = removeZero(bookings[i].end);

    const newBooking = bookings[i];
    // add colspan property to render.
    newBooking['colspan'] = end - start;

    // eliminates some positions depending on the start and end time to insert bookings
    fields.splice(start, end - start, newBooking);
  }

  return (
    <>
      {fields.map((booking, index) => (
        <td
          key={index}
          colSpan={booking.colspan}
          className={booking._id ? 'booked' : ''}
        >
          <Link href={`/booking/${booking.vid}/edit/${booking._id}`}>
            {booking.vid && <GiRadarSweep />}
          </Link>
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
