import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { food, meal } from '../types/food';

const Foods = () => {

  const [comida, setComida] = useState<food[]>([])
  const [srcomida , setsrComida] = useState<string>()
  const [srccomida, setSrcComida] = useState([])

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then(resposta => setComida(resposta.data.categories))
  }, [])

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${srcomida}`)
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${srcomida}`)
      .then(resposta => setSrcComida(resposta.data.meals))
  }, [srcomida]);

  return (
    <div className="food-beer-list food-shop">
      
      <h1>Tipos de pratos</h1>
      <p>
        Selecione uma categoria ou digite a comida (em inglês):
        <input type="text" placeholder="Digite a comida..." onChange={(event) => setsrComida(event.target.value)}/>
      </p>
      <ul className="food-category">
      {
        comida !== null &&
        comida.map((resposta: food) => (
            <li key={resposta.idCategory} onClick={() => setsrComida(resposta.strCategory)}><b>{resposta.strCategory}</b></li>
     ))
      } 
      </ul>
      <h2>Tipo selecionado: <strong>{srcomida}</strong></h2>
      <div className="food-container">
      {
        srccomida !== null &&
        srccomida.map((resposta: meal) => (
              <div className="food-item" key={resposta.idMeal}>
                <img src={resposta.strMealThumb} />
                <p>{resposta.strMeal}</p>
              </div>
      ))
      }
      </div>
    </div>
  );
}

export default Foods;