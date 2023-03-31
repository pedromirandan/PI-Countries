import React from 'react'
import Card from '../Card/Card';
import "./Cards.css"

export default function Cards(props) {
  const { countries } = props;
  return (
    <>
      <div className='Cards'>
        {countries.map((country) => {
          return <Card country={country} />
        })}
      </div>
    </>
  )
}
