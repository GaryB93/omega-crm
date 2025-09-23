import './CustomerPane.css';

function CustomerPane () {
  return (
    <div id="customerPane">
      <div id="customerInfo">
        <h3>Customer Selection</h3>
        <span>First Name:</span>
        <span>Joe</span>
        <span>Last Name:</span>
        <span>Smith</span>
        <span>Phone:</span>
        <span>(111)111-1111</span>
      </div>
      <button id="clearBtn">Clear</button>
    </div>
  )
}

export default CustomerPane;