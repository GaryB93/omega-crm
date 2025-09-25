import { useCustomerDispatch, useCustomers } from '../../../reducers/customersReducer';
import './CustomerPane.css';

function CustomerPane () {

  const customerState = useCustomers();
  const dispatch = useCustomerDispatch();

  const selectedCustomerID = customerState.selectedCustomerID;
  const selectedCustomer = customerState.customers.find((customer => customer.id == selectedCustomerID));

  const handleClick = () => {
    dispatch({ type: "clearSelected"});
  }

  return (
    <div id="customerPane">
      <div id="customerInfo">
        <h3>Customer Selection</h3>
        <span>First Name:</span>
        <span>{selectedCustomer ? selectedCustomer.firstName : "..."}</span>
        <span>Last Name:</span>
        <span>{selectedCustomer ? selectedCustomer.lastName : "..."}</span>
        <span>Phone:</span>
        <span>{selectedCustomer ? selectedCustomer.phone : "..."}</span>
      </div>
      <button id="clearBtn" onClick={handleClick}>Clear</button>
    </div>
  )
}

export default CustomerPane;