import notes from "../service/notes";

const PersonDetail = ({name, number, id}) => {
    const onClickDelete = (to_del) => async () => {
        if (window.confirm(`Delete ${name} ?`)) {
            await notes.deleteNote(to_del)
            // setPersons(persons.map( person => person.id !== to_del))
        }
    } 

    return(
        <div>
            <span> {name} {number} </span>
            <button onClick={onClickDelete(id)} > delete </button>
        </div>
    )
}

export default PersonDetail;