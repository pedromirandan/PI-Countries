import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import Nav from "../../components/Nav/Nav"
import Cards from '../../components/Cards/Cards'
import Filters from "../../components/Filters/Filters"
import Paginate from "../../components/Paginate/Paginate"
import { paginate } from "../../components/Paginate/Paginate"
import "./Home.css"
import { useEffect, useState } from "react"
import { getActivities } from "../../redux/actions"

export default function Home() {

  const [state, setState] = useState({
    pageIndex: 0,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  const countries = useSelector((state) => state.countries)

  const paginatedCountries = paginate(countries, 10)

  const maxIndex = paginatedCountries.length - 1;

  const { pageIndex } = state;

  return (
    <>
      <div className="Home">
        <Nav className="NavBar" homeState={{state, setState}}/>
        <Filters className="Filters" homeState={{state, setState}}/>
        <Cards countries={paginatedCountries[pageIndex]} resultAmount={countries.length} />
        <Paginate state={state} setState={setState} maxIndex={maxIndex} />
      </div>
    </>
  )
}
