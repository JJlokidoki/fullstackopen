import PersonDetail from "./PersonDetail";

const Persons = ({onClickDelete, persons}) => {
    return(
        <div>
            {
                persons.map( (person) =>
                    <PersonDetail 
                        key={person.id} 
                        name={person.name} 
                        number={person.number} 
                        id={person.id} 
                        onClickDelete={onClickDelete}    
                    />
                )
            }
        </div>
    )
}

export default Persons;