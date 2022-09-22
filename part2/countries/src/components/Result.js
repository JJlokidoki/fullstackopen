import Flag from "./Flag"
import Weather from "./Weather"
import Languages from "./Languages"
import CountryDetail from "./CountryDetail"


const Result = ({countries, onClick}) => {

    console.log(countries.length)
    if (countries.length > 10) {
        return(
            <div>
                <p> Too many matches, specify another filter </p>
            </div>
        )
    }
    else if (countries.length === 0) {
        return(
            <div>
                <p> No matches </p>
            </div>
        )
    }
    else if (countries.length > 1) {
        return(
            <div>
                { countries.map( country => {
                    return(
                        <div key={country.name.common}>
                            <span>
                                {country.name.common}
                            </span>
                            <button onClick={onClick(country.name.common)}>
                                show
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        const country = countries[0]
        return(
            <div>
                <CountryDetail country={country}/>
                <Languages langs={Object.values(country.languages)}/>
                <Flag imgUrl={country.flags.svg}/>
                <Weather country={country}/>
            </div>
        )
    }
}

export default Result;