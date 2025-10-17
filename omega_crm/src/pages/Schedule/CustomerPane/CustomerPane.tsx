// import type Customer from '../../../classes/Customer';
import displayPhone from '../../../utils/displayPhone';
import type { Action, Customer } from '../../../reducers/customersReducer';
import './CustomerPane.css';

interface CustomerPaneProps {
  customer: Customer;
  customerDispatch: React.ActionDispatch<[Action]>;
}

function CustomerPane ({ customer, customerDispatch }: CustomerPaneProps) {

  const handleClick = () => {
    customerDispatch({ type: "clearSelected"});
  }

  return (
    <div id="customerPane">
      <div id="customerInfo">
        <h3>Customer Selection</h3>
        <label htmlFor="customerFirstName">First Name:</label>
        <input type="text" id="customerFirstName" value={customer.id != 0 ? customer.firstname : "..."} disabled/>
        <label htmlFor="customerLastName">Last Name:</label>
        <input type="text" id="customerLastName" value={customer.id != 0 ? customer.lastname : "..."} disabled/>
        <label htmlFor="customerPhone">Phone:</label>
        <input type="text" id="customerPhone" value={customer.id != 0 ? displayPhone(customer.phone) : "..."} disabled/>
      </div>
      <button className="secondaryBtn" id="clearBtn" onClick={handleClick}>Clear</button>
    </div>
  )
}

export default CustomerPane;