const PersonDetail = ({onClickDelete, name, number, id}) => {
    return(
        <div>
            <span> {name} {number} </span>
            <button onClick={onClickDelete(id, name)} > delete </button>
        </div>
    )
}

export default PersonDetail;