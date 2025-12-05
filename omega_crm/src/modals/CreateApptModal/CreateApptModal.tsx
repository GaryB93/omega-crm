import { useState } from "react";
import { useCustomers } from "../../reducers/customersReducer";
import { useSchedules, useScheduleDispatch } from "../../reducers/scheduleReducer";
import appointmentAPI from "../../api/appointmentAPI";
import scheduleAPI from "../../api/scheduleAPI";
import ErrMsg from "../../components/ErrMsg/ErrMsg";
import { useOutletContext } from "react-router";
import type { User } from "../../interfaces/User";
import customerAPI from "../../api/customerAPI";
import './CreateApptModal.css';

function CreateApptModal ({closeAddApptModal}: {closeAddApptModal: ()=>void}) {
  const user = useOutletContext<User>();

  const selectedCustomer = useCustomers().selectedCustomer;
  const scheduleState = useSchedules();
  const scheduleDispatch = useScheduleDispatch();

  const [ firstNameSearch, setFirstNameSearch ] = useState("");
  const [ lastNameSearch, setLastNameSearch ] = useState("");
  const [ phoneSearch, setPhoneSearch ] = useState("");

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ startTime, setStartTime ] = useState("00:00");
  const [ endTime, setEndTime ] = useState("00:00");
  const [ description, setDescription ] = useState("");
  const [ assignedSection, setAssisgnedSection ] = useState(0);

  const [ showPhoneSearchErr, setPhoneSearchErr ] = useState(false);
  const [ showStartTimeErr, setShowStartTimeErr ] = useState(false);
  const [ showEndTimeErr, setShowEndTimeErr ] = useState(false);
  const [ showSectionErr, setShowSectionErr ] = useState(false);

  const invalidPhoneFormatMsg = 'Please input a phone number using ten numbers. No letters, dashes, or spaces.';

  const sections = scheduleState.sections.map(section => <option key={section.id} value={section.id}>{section.name}</option>);
  sections.unshift(<option key={0} value={0}>Choose section...</option>);

  const handleCustomerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneSearch == "" || phoneSearch.match(/^[0-9]{10}$/)) {
      setPhoneSearchErr(false);
      customerAPI.getCustomers(firstNameSearch, lastNameSearch, phoneSearch)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.error('Error', err));
    } else {
      setPhoneSearchErr(true);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowStartTimeErr(startTime == "00:00");
    setShowEndTimeErr(endTime == "00:00");
    setShowSectionErr(assignedSection == 0);
    
    if (startTime != "00:00" && endTime != "00:00" && assignedSection != 0) {
      const customerId = selectedCustomer.id;
      const date = scheduleState.date;
      appointmentAPI.createAppointment(user.id, customerId, assignedSection, date, startTime, endTime, description)
      .then(result => {
        scheduleAPI.getSchedules(scheduleState.selectedSchedule, scheduleState.date)
        .then(response => response.json())
        .then(result2 => {
          scheduleDispatch({
            type: "selected",
            id: result2.selectedSchedule,
            schedules: result2.schedules,
            sections: result2.sections,
            appointments: result2.appointments
          });
          closeAddApptModal();
        });
      })
      .catch(err => console.error('Error:', err));
    }
  }

  return (
    <div id="create-appointment-modal">
      <h2>Create Appointment</h2>
      <h3>Customer Search</h3>
      <form id="customer-search-form" onSubmit={handleCustomerSearch}>
        <div>
          <label htmlFor="first-name-search">First Name:</label>
          <input type="text" id="first-name-search" value={firstNameSearch} onChange={(e)=>setFirstNameSearch(e.target.value)}/>
        </div>
          
        <div>
          <label htmlFor="last-name-search">Last Name:</label>
          <input type="text" id="last-name-search" value={lastNameSearch} onChange={(e)=>setLastNameSearch(e.target.value)}/>
        </div>
    
        <div>
          <label htmlFor="phone-search">Phone Number:</label>
          <input type="text" id="phone-search" value={phoneSearch} onChange={(e)=>setPhoneSearch(e.target.value)}/>
        </div>
          
        {showPhoneSearchErr && <ErrMsg message={invalidPhoneFormatMsg}/>}

        <button className="primaryBtn" type="submit">Search</button>
      </form>

      <div id="customer-search-results-header">
        <span>First Name</span>
        <span>Last Name</span>
        <span>Phone Number</span>
        <span>Text Alert Reminder?</span>
      </div>

      <div id="customer-search-results">
        
      </div>

      <h3>Appointment Details</h3>
      <form id="create-appt-form" name="createApptForm" onSubmit={handleSubmit}>
        <div id="first-name-div">
          <label htmlFor="first-name">First Name:</label>
          <input type="text" id="first-name" disabled value={firstName} />
        </div>

        <div id="last-name-div">
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" id="last-name" disabled value={lastName} />
        </div>

        <div id="phone-div">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" disabled value={phone} />
        </div>
          
        <div id="date-div">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" disabled value={scheduleState.date} />
        </div>
          
        <div id="start-time-div">
          <label htmlFor="start-time">Start Time:</label>
          <select id="start-time" value={startTime} onChange={(e)=>setStartTime(e.target.value)}>
            <option value={"00:00"}>--:--</option>
            <option value={"08:00"}>8:00am</option>
            <option value={"08:30"}>8:30am</option>
            <option value={"09:00"}>9:00am</option>
            <option value={"09:30"}>9:30am</option>
            <option value={"10:00"}>10:00am</option>
            <option value={"10:30"}>10:30am</option>
            <option value={"11:00"}>11:00am</option>
            <option value={"11:30"}>11:30am</option>
            <option value={"12:00"}>12:00pm</option>
            <option value={"12:30"}>12:30pm</option>
            <option value={"13:00"}>1:00pm</option>
            <option value={"13:30"}>1:30pm</option>
            <option value={"14:00"}>2:00pm</option>
            <option value={"14:30"}>2:30pm</option>
            <option value={"15:00"}>3:00pm</option>
            <option value={"15:30"}>3:30pm</option>
            <option value={"16:00"}>4:00pm</option>
            <option value={"16:30"}>4:30pm</option>
          </select>
        </div>
        {showStartTimeErr && <ErrMsg message="Please choose a start time."/>}

        <div id="end-time-div">
          <label htmlFor="end-time">End Time:</label>
          <select id="end-time" value={endTime} onChange={(e)=>setEndTime(e.target.value)}>
            <option value={"00:00"}>--:--</option>
            <option value={"08:30"}>8:30am</option>
            <option value={"09:00"}>9:00am</option>
            <option value={"09:30"}>9:30am</option>
            <option value={"10:00"}>10:00am</option>
            <option value={"10:30"}>10:30am</option>
            <option value={"11:00"}>11:00am</option>
            <option value={"11:30"}>11:30am</option>
            <option value={"12:00"}>12:00pm</option>
            <option value={"12:30"}>12:30pm</option>
            <option value={"13:00"}>1:00pm</option>
            <option value={"13:30"}>1:30pm</option>
            <option value={"14:00"}>2:00pm</option>
            <option value={"14:30"}>2:30pm</option>
            <option value={"15:00"}>3:00pm</option>
            <option value={"15:30"}>3:30pm</option>
            <option value={"16:00"}>4:00pm</option>
            <option value={"16:30"}>4:30pm</option>
            <option value={"17:00"}>5:00pm</option>
          </select>
        </div>
        {showEndTimeErr && <ErrMsg message="Please choose an end time."/>}
        
        <div id="description-div">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} required onChange={(e)=>setDescription(e.target.value)}/>
        </div>
          
        <div id="assigned-section-div">
          <label htmlFor="assigned-section">Assigned Section:</label>
          <select id="assigned-section" value={assignedSection} onChange={(e)=>setAssisgnedSection(Number(e.target.value))}>
            {sections}
          </select>
        </div>
        {showSectionErr && <ErrMsg message="Please choose a section."/>}

        <button className="submitBtn primaryBtn" type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreateApptModal;