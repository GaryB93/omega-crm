import './CustomerInfo.css';
import { useCustomers, useCustomerDispatch } from '../../../reducers/customersReducer';
// import type { Customer } from '../../../reducers/customersReducer';
import Customer from '../../../classes/Customer';

interface CustomerInfoProps {
  customer: Customer;
  openCustomerInfoModal: ()=>void;
}

function CustomerInfo ({ customer,  openCustomerInfoModal }: CustomerInfoProps) {

  const customerDispatch = useCustomerDispatch();
  const customerState = useCustomers();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    customerDispatch({
      type: "selected",
      customer: customer
    });
    openCustomerInfoModal();
  }

  const handleSelect = () => {
    if (customerState.selectedCustomer.id == customer.id) {
      customerDispatch({
        type: "clearSelected"
      })
    } else {
      customerDispatch({
      type: "selected",
      customer: customer
    });
    }
  }
  
  const classes = customer.id == customerState.selectedCustomer.id ? "customerInfo customerSelected" : "customerInfo";

  return (
    <div className={classes} onClick={handleSelect}>
      <span>{customer.firstname}</span>
      <span>{customer.lastname}</span>
      <span>{customer.phone}</span>
      <span>{customer.textreminder ? "Yes" : "No"}</span>
      <button className="secondaryBtn" onClick={handleClick}>Edit</button>
    </div>
  )
}

export default CustomerInfo;