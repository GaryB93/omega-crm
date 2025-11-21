import customerAPI from '../api/customerAPI';
import './modals.css';
import { useState } from 'react';
import { useCustomerDispatch } from '../reducers/customersReducer';
import type { Customer } from '../interfaces/Customer';
import ErrMsg from '../components/ErrMsg/ErrMsg';

interface CustomerInfoModalProps {
  customer: Customer;
  closeCustomerInfoModal: ()=>void;
}

function CustomerInfoModal ({ customer, closeCustomerInfoModal }: CustomerInfoModalProps) {
  const [ firstName, setFirstName ] = useState(customer.firstname);
  const [ lastName, setLastName ] = useState(customer.lastname);
  const [ phone, setPhone ] = useState(customer.phone);
  const [ textReminder, setTextReminder ] = useState(customer.textreminder);
  const [ isPhoneValid, setIsPhoneValid] = useState(true);

  const customerDispatch = useCustomerDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.match(/^[0-9]{10}$/)) {
      customerAPI.saveCustomer({
        id: customer.id,
        firstname: firstName.trim().toUpperCase(),
        lastname: lastName.trim().toUpperCase(),
        phone: phone,
        textreminder: textReminder
      })
      .then(response => response.json())
      .then(data => {
        customerDispatch({
          type: "saved",
          customer: data
        });
        closeCustomerInfoModal();
      })
      .catch(err => console.error('Error', err));
    } else {
      setIsPhoneValid(false);
    }
  }

  return (
    <form className="formModal" id="customerInfoModal" onSubmit={handleSubmit}>
      <h3>Customer Info</h3>
      
      <label htmlFor="firstname">First Name:</label>
      <input type="text" id="firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required autoComplete="false"/>
          
      <label htmlFor="lastname">Last Name:</label>
      <input type="text" id="lastname" value={lastName} onChange={(e)=>setLastName(e.target.value)} required autoComplete="false"/>
      
      <label htmlFor="phone">Phone Number:</label>
      <input type="text" id="phone" value={phone} onChange={(e)=> {setPhone(e.target.value)}} maxLength={10}/>
      
      {!isPhoneValid && <ErrMsg message={"Please input a phone number using ten numbers. No letters, dashes, or spaces."} />}

      <div>
        <input type="checkbox" id="textreminder" checked={textReminder} onChange={()=>setTextReminder(!textReminder)}/>
        <label htmlFor="textreminder">Text Alert Reminder?</label>
      </div>
      <button className="primaryBtn submitBtn" type="submit">Save</button>
    </form>
  )
}

export default CustomerInfoModal;