import PersonDetail from "./PersonDetail";

const Persons = ({persons}) => {
    return(
        <div>
            {
                persons.map( (person) =>
                    <PersonDetail key={person.id} name={person.name} number={person.number} id={person.id} />
                )
            }
        </div>
    )
}

export default Persons;