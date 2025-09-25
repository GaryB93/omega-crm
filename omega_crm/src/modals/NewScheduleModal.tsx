function NewScheduleModal () {
  return (
    <form>
      <h3>Add Schedule</h3>
      <label htmlFor="scheduleName">Schedule Name:</label>
      <input type="text" id="scheduleName"></input>
      <button>Add</button>
    </form>
  )
}

export default NewScheduleModal;