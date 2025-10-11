import customerAPI from '../api/customerAPI';
import './modals.css';
import { useState } from 'react';
import { useCustomerDispatch } from '../reducers/customersReducer';
import Customer from '../classes/Customer';

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
    const customerInfo = new Customer(customer.id, firstName, lastName, phone, textReminder);

    if (customerInfo.isPhoneValid(phone)) {
      customerAPI.saveCustomer(customerInfo)
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

  const errMsg = <div style={{color: "red"}}>
                    <span role="alert">Please input a phone number using numbers only. No letters, dashes, or spaces.</span>
                 </div>;

  return (
    <form className="formModal" id="customerInfoModal" onSubmit={handleSubmit}>
      <h3>Customer Info</h3>
      
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required/>
      
      
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
      
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" value={phone} onChange={(e)=> {setPhone(e.target.value)}} maxLength={10}/>
      
      {!isPhoneValid && errMsg}
      <div>
        <input type="checkbox" id="textreminder" checked={textReminder} onChange={()=>setTextReminder(!textReminder)}/>
        <label htmlFor="textreminder">Text Alert Reminder?</label>
      </div>
      <button className="primaryBtn submitBtn" type="submit">Save</button>
    </form>
  )
}

export default CustomerInfoModal;