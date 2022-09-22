const Sum = ({parts}) => {
    return(
        <b> total of { parts.reduce( (prev, curr) =>  prev + curr.exercises, 0) } exercises </b>
    )
}

export default Sum;