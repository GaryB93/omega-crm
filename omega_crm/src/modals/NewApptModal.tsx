function NewApptModal () {
  return (
    <form>
      <h3>Appointment Details</h3>
      <label htmlFor="fullName">Customer:</label>
      <input type="text" id="fullName" disabled></input>

      <label htmlFor="phoneNum">Phone:</label>
      <input type="text" id="phoneNum"></input>

      <label htmlFor="apptDate">Date:</label>
      <input type="date" id="apptDate" disabled></input>

      <label htmlFor="startTime">Start Time:</label>
      <input type="time" id="startTime"></input>

      <label htmlFor="endTime">End Time:</label>
      <input type="time" id="endTime"></input>

      <label htmlFor="description">Description of Work:</label>
      <textarea id="description"></textarea>

      <label htmlFor="assignedSection">Assigned Section:</label>
      <select id="assignedSection">
        <option value="section1">Section1</option>
      </select>

      <button type="submit">Save</button>
    </form>
  )
}

export default NewApptModal;