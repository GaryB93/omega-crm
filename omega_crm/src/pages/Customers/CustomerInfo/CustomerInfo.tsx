import './CustomerInfo.css';
import customerAPI from '../../../api/customerAPI';
import { useCustomerDispatch } from '../../../reducers/customersReducer';

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  textReminder: boolean;
}

function CustomerInfo ({ customerObj,  openCustomerInfoModal }: { customerObj: Customer, openCustomerInfoModal: ()=> void}) {

  const customerDispatch = useCustomerDispatch();

  const handleClick = () => {
    customerDispatch({
      type: "selected",
      customer: customerObj
    });
    openCustomerInfoModal();
  }

  return (
    <div className="customerInfo">
      <span>{customerObj.firstname}</span>
      <span>{customerObj.lastname}</span>
      <span>{customerObj.phone}</span>
      <span>{customerObj.textReminder ? "Yes" : "No"}</span>
      <button onClick={handleClick}>Edit</button>
    </div>
  )
}

export default CustomerInfo;