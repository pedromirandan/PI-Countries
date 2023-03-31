import { useSelector } from "react-redux"
import "./Home.css"
import Cards from '../../components/Cards/Cards'
import "./Home.css"

export default function Home() {
  const countries = useSelector((state) => state.countries)
  return (
    <>
    <div>
      <Cards countries={countries.slice(0,10)}/>
    </div>
    </>
  )
}
