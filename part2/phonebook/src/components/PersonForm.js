const PersonForm = ({onSubmit, nameInput, numberInput}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={nameInput.newName} onChange={nameInput.onChangeName}/>
            </div>

            <div>
                number: <input value={numberInput.newNumber} onChange={numberInput.onChangeNumber}/>
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;