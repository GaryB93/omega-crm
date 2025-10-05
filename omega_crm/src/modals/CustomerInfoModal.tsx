import customerAPI from '../api/customerAPI';
import './modals.css';
import { useState } from 'react';
import type { Customer } from '../reducers/customersReducer';

function CustomerInfoModal ({ customer }: { customer: Customer}) {
  const [ firstName, setFirstName ] = useState(customer.firstname);
  const [ lastName, setLastName ] = useState(customer.lastname);
  const [ phone, setPhone ] = useState(customer.phone);
  const [ textReminder, setTextReminder ] = useState(customer.textReminder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    customerAPI.saveCustomer(customer.id, firstName, lastName, phone, textReminder)
    .then(response => {
      console.log(response);
    })
    .catch(err => console.error('Error', err));
  }

  return (
    <form className="formModal" onSubmit={handleSubmit}>
      <h3>Customer Info</h3>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </div>
      <div>
        <input type="checkbox" id="textreminder" checked={textReminder} onChange={(e)=>setTextReminder(e.target.checked)}/>
        <label htmlFor="textreminder">Text Alert Reminder?</label>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default CustomerInfoModal;