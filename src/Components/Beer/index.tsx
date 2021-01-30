import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { beer } from '../types/beer';
 
const Beer = () => {
 
  const [cerveja, setCerveja] = useState([])
  const [showCerveja, cervejaStatus] = useState(false)

  const change = () => {
    cervejaStatus(!showCerveja)
  }

  const getCerveja = () => {
    axios.get(`https://api.punkapi.com/v2/beers/?per_page=8`)
      .then(resposta => setCerveja(resposta.data))
      .then(change)
  }


  return (
    <div className="food-beer-list food-shop">
      
      <h1>Tipos de Cerveja</h1>
      <button onClick={getCerveja}>Buscar Cerveja</button>
      <div className="beers-list">
        {
          showCerveja &&
          cerveja !== undefined &&
          cerveja.map((info: beer) => (
            <div className="beer" key={info.id}>
            <img src={info.image_url} alt="Buzz" />
            <h3>{info.name}</h3>
            <span>{info.tagline}</span>
            <small>{info.description}</small>
          </div>
          ))
        }

      </div>
    </div>
  );
}

export default Beer;