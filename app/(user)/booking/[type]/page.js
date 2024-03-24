'use client';

import '../../style.css';

export default function Form() {
  return (
    <form id='booking_form'>
      <h3>Book Now</h3>
      <div>
        <label htmlFor='vid'>VID:</label>
        <input
          type='text'
          name='vid'
          /*  value={pathname[0]} */
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
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          name='booking'
          min={new Date().toISOString().split('T')[0]}
          defaultValue={new Date().toISOString().split('T')[0]}
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
          defaultValue='00:00'
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
          defaultValue='00:00'
        />
      </div>
      <button type='submit' className='btn'>
        Book Now
      </button>
    </form>
  );
}
