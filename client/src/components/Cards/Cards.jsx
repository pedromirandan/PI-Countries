import React from 'react'
import Card from '../Card/Card';
import "./Cards.css"

export default function Cards(props) {
  const { countries, resultAmount } = props;

  return (
    <>
      {countries.length ? <p className='count'>{`Result: ${resultAmount} countries.`}</p> : <p className='count'>No countries were found with those parameters.</p>}
      <div className='Cards'>
        {countries.map((country) => {
          return <Card detailID={country.ID} key={country.ID} country={country}></Card> 
        })}
      </div>
    </>
  )
}
