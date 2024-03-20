'use client';

import { usePathname } from 'next/navigation';
import '../../style.css';

export default function Booking() {
  const pathname = usePathname().split('/').reverse();

  return (
    <form id='booking_form'>
      <h3>Book Now</h3>
      <div>
        <label htmlFor='vid'>VID:</label>
        <input
          type='text'
          name='vid'
          value={pathname[0]}
          maxLength={6}
          readOnly
        />
      </div>
      <div>
        <label htmlFor='position'>Position:</label>
        <input
          type='text'
          name='position'
          maxLength={20}
          placeholder='XXXX_TWR/APP/CTR'
        />
      </div>
      <div>
        <label htmlFor='start'>Start</label>
        <input type='time' name='start' />
      </div>
      <div>
        <label htmlFor='end'>End</label>
        <input type='time' name='end' />
      </div>
      <button type='submit' className='btn'>
        Book Now
      </button>
    </form>
  );
}
