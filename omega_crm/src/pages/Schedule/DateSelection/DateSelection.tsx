import { useOutletContext } from 'react-router';
import './DateSelection.css';

function DateSelection () {

  const [ date, setDate ] = useOutletContext();
  
  const handleClick = () => {
    const datePicker = document.getElementById("datepicker");
    if (datePicker instanceof HTMLInputElement) {
      console.log(typeof(datePicker.value));
    }
  }

  const handleChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
  }

  return (
    <div id="datePickerContainer">
      <input type="date" id="datepicker" value={date} onChange={handleChange}></input>
      <button onClick={handleClick}>Apply</button>
    </div>
  )
}

export default DateSelection;