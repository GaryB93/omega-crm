import './CustomerInfo.css';

export interface Customer {
  firstName: string;
  lastName: string;
  phone: string;
  reminder: boolean;
}

function CustomerInfo (customerObj: Customer) {
  return (
    <div className="customerInfo">
      <span>{customerObj.firstName}</span>
      <span>{customerObj.lastName}</span>
      <span>{customerObj.phone}</span>
      <span>Yes</span>
      <button>Edit</button>
    </div>
  )
}

export default CustomerInfo;