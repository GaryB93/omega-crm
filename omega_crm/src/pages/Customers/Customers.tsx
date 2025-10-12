import './Customers.css';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import { useCustomers, useCustomerDispatch } from '../../reducers/customersReducer';
import { useState } from 'react';
import customerAPI from '../../api/customerAPI';
import Modal from '../../components/Modal/Modal';
import CustomerInfoModal from '../../modals/CustomerInfoModal';
import CustomerApptsModal from '../../modals/CustomerApptsModal';
import ErrMsg from '../../components/ErrMsg/ErrMsg';
import Person from '../../classes/Person';

function Customers () {

  const customerState = useCustomers();
  const customerDispatch = useCustomerDispatch();
  const customers = customerState.customers;

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ isPhoneValid, setIsPhoneValid ] = useState(true);

  const [isCustomerInfoModalOpen, setIsCustomerInfoModalOpen] = useState(false);
  const closeCustomerInfoModal = () => setIsCustomerInfoModalOpen(false);
  const openCustomerInfoModal = () => setIsCustomerInfoModalOpen(true);

  const [isCustomerApptsModalOpen, setIsCustomerApptsModalOpen] = useState(false);
  const closeCustomerApptsModal = () => setIsCustomerApptsModalOpen(false);
  const openCustomerApptsModal = () => setIsCustomerApptsModalOpen(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson = new Person(firstName, lastName, phone);
    if (phone == "" || newPerson.isPhoneValid()) {
      setIsPhoneValid(true);
      customerAPI.getCustomers(firstName, lastName, phone)
      .then(result => {
        customerDispatch({
          type: "retrieved",
          customers: result
        })
      })
      .catch(err => console.error('Error', err));
    }
    else {
      setIsPhoneValid(false);
    }
  }

  const customerList = customers.map(customer =>
    <CustomerInfo key={customer.id} customer={customer} openCustomerInfoModal={openCustomerInfoModal} />
  );

  const invalidPhoneFormatMsg = 'Please input a phone number using ten numbers. No letters, dashes, or spaces.';

  return (
    <div id="customersContainer">
      <h2>Customer Search</h2>
      {/* This form is used for the search functionality of finding customers based on the users input of either firstname, lastname, or phone number. */}
      <form id="customerSearch" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input type="text" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          {!isPhoneValid && <ErrMsg message={invalidPhoneFormatMsg}/>}
        </div>
        <button className="primaryBtn" type="submit">Search</button>
      </form>
      <div id="customerSearchResults">
        <div id="customerSearchResultsHeader">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Phone Number</span>
         <span>Text Alert Reminder?</span>
        </div>
        {customerList}
      </div>
      <div id="customerFunctions">
        <button className="secondaryBtn" onClick={()=> {customerDispatch({type: "clearSelected"}); openCustomerInfoModal();}}>New Customer</button>
        <button className="secondaryBtn" disabled={customerState.selectedCustomer.id == 0 ? true : false} onClick={openCustomerApptsModal}>View Appointments Report</button>
      </div>

      <Modal show={isCustomerInfoModalOpen} onClose={() => {closeCustomerInfoModal(); customerDispatch({type: "clearSelected"})}}>
        <CustomerInfoModal customer={customerState.selectedCustomer} closeCustomerInfoModal={closeCustomerInfoModal}/>
      </Modal>

      <Modal show={isCustomerApptsModalOpen} onClose={closeCustomerApptsModal}>
        <CustomerApptsModal customer={customerState.selectedCustomer} />
      </Modal>
    </div>
  )
}

export default Customers;