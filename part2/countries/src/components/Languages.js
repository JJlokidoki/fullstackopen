const Languages = ({langs}) => {
    return(
        <div>
            <h3> Languages: </h3>
            <ul>
                { langs.map( (lang) => {
                    return(
                        <li key={lang}>
                            { lang }
                        </li>
                    )
                }) }
            </ul>
        </div>
    )
}

export default Languages;