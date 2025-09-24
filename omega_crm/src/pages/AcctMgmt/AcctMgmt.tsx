import './AcctMgmt.css';

function AcctMgmt () {
  return (
    <div id="accountsContainer">
      <h2>User Search</h2>
      <form id="userSearch">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName"></input>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName"></input>

        <fieldset>
          <legend>Roles:</legend>
          <input type="checkbox" id="user" name="user" value="user" />
          <label htmlFor="user">User</label>
          <input type="checkbox" id="sales" name="sales" value="sales" />
          <label htmlFor="sales">Sales</label>
          <input type="checkbox" id="manager" name="manager" value="manager" />
          <label htmlFor="manager">Manager</label>
        </fieldset>

        <button type="submit">Search</button>
      </form>
      <div id="searchResults">
        <div id="searchResultsHeader">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Phone Number</span>
          <span>Role</span>
          <span>Schedule</span>
        </div>
      </div>
      <div id="userFunctions">
        <button>New User</button>
      </div>
    </div>
  )
}

export default AcctMgmt;