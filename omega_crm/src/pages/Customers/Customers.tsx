import './Customers.css';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import { useCustomers, useCustomerDispatch } from '../../reducers/customersReducer';
import { useState } from 'react';
import customerAPI from '../../api/customerAPI';
import Modal from '../../components/Modal/Modal';
import CustomerInfoModal from '../../modals/CustomerInfoModal';
import CustomerApptsModal from '../../modals/CustomerApptsModal';

function Customers () {

  const customerState = useCustomers();
  const customerDispatch = useCustomerDispatch();
  const customers = customerState.customers;

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ phone, setPhone ] = useState("");

  const [isCustomerInfoModalOpen, setIsCustomerInfoModalOpen] = useState(false);
  const closeCustomerInfoModal = () => setIsCustomerInfoModalOpen(false);
  const openCustomerInfoModal = () => setIsCustomerInfoModalOpen(true);

  const [isCustomerApptsModalOpen, setIsCustomerApptsModalOpen] = useState(false);
  const closeCustomerApptsModal = () => setIsCustomerApptsModalOpen(false);
  const openCustomerApptsModal = () => setIsCustomerApptsModalOpen(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    customerAPI.getCustomers(firstName, lastName, phone)
      .then(result => {
        customerDispatch({
          type: "retrieved",
          customers: result
        })
      })
      .catch(err => console.error('Error', err));
  }

  const customerList = customers.map(customer =>
    <CustomerInfo key={customer.id} customerObj={customer} openCustomerInfoModal={openCustomerInfoModal} />
  );

  return (
    <div id="customersContainer">
      <h2>Customer Search</h2>
      <form id="customerSearch" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
      <div id="searchResults">
        <div id="searchResultsHeader">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Phone Number</span>
         <span>Text Alert Reminder?</span>
        </div>
        {customerList}
      </div>
      <div id="customerFunctions">
        <button onClick={()=> {customerDispatch({type: "clearSelected"}); openCustomerInfoModal();}}>New Customer</button>
        <button disabled={customerState.selectedCustomer.id == 0 ? true : false} onClick={openCustomerApptsModal}>View Appointments Report</button>
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