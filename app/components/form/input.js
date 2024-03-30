import './styles.css';

export default function Input(props) {
  return (
    <input
      className='form-input'
      {...props}
      step={3600}
      min='00:00'
      max='23:00'
      maxLength={props.maxl}
      placeholder={props.name}
      autoComplete='off'
    />
  );
}
