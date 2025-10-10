import { useCustomerDispatch, useCustomers } from '../../../reducers/customersReducer';
import './CustomerPane.css';

function CustomerPane () {

  const customerState = useCustomers();
  const dispatch = useCustomerDispatch();

  const selectedCustomer = customerState.selectedCustomer;

  const handleClick = () => {
    dispatch({ type: "clearSelected"});
  }

  return (
    <div id="customerPane">
      <div id="customerInfo">
        <h3>Customer Selection</h3>
        <span>First Name:</span>
        <span>{selectedCustomer ? selectedCustomer.firstname : "..."}</span>
        <span>Last Name:</span>
        <span>{selectedCustomer ? selectedCustomer.lastname : "..."}</span>
        <span>Phone:</span>
        <span>{selectedCustomer ? selectedCustomer.phone : "..."}</span>
      </div>
      <button className="secondaryBtn" id="clearBtn" onClick={handleClick}>Clear</button>
    </div>
  )
}

export default CustomerPane;