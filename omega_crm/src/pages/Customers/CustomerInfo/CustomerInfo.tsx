import './CustomerInfo.css';
import { useCustomers, useCustomerDispatch } from '../../../reducers/customersReducer';

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  textReminder: boolean;
}

function CustomerInfo ({ customerObj,  openCustomerInfoModal }: { customerObj: Customer, openCustomerInfoModal: ()=> void}) {

  const customerDispatch = useCustomerDispatch();
  const customerState = useCustomers();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    customerDispatch({
      type: "selected",
      customer: customerObj
    });
    openCustomerInfoModal();
  }

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    customerDispatch({
      type: "selected",
      customer: customerObj
    });
  }
  
  const classes = customerObj.id == customerState.selectedCustomer.id ? "customerInfo customerSelected" : "customerInfo";

  return (
    <div className={classes} onClick={handleSelect}>
      <span>{customerObj.firstname}</span>
      <span>{customerObj.lastname}</span>
      <span>{customerObj.phone}</span>
      <span>{customerObj.textReminder ? "Yes" : "No"}</span>
      <button onClick={handleClick}>Edit</button>
    </div>
  )
}

export default CustomerInfo;