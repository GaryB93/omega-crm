import './Customers.css';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import { useCustomers, useCustomerDispatch } from '../../reducers/customersReducer';

function Customers () {

  const customerState = useCustomers();
  const customers = customerState.customers;
  

  const customerList = customers.map(customer =>
    <CustomerInfo key={customer.id} {...customer}/>
  )

  return (
    <div id="customersContainer">
      <h2>Customer Search</h2>
      <form id="customerSearch">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName"></input>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName"></input>
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone"></input>
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
        <button>New Customer</button>
        <button>View Appointments Report</button>
        <button>Select</button>
      </div>
    </div>
  )
}

export default Customers;