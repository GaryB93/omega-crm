function NewSectionModal () {
  return (
    <form>
      <h3>Add Section</h3>
      <label htmlFor="sectionName">Section Name:</label>
      <input type="text" id="sectionName"></input>
      <button>Add</button>
    </form>
  )
}

export default NewSectionModal;