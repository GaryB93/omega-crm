import './CustomerInfo.css';

export interface Customer {
  firstName: string;
  lastName: string;
  phone: string;
  textReminder: boolean;
}

function CustomerInfo (customerObj: Customer) {
  return (
    <div className="customerInfo">
      <span>{customerObj.firstName}</span>
      <span>{customerObj.lastName}</span>
      <span>{customerObj.phone}</span>
      <span>{customerObj.textReminder ? "Yes" : "No"}</span>
      <button>Edit</button>
    </div>
  )
}

export default CustomerInfo;