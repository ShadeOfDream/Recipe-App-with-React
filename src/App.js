import React, { useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () => {

  //set your own app_id && app_key
 const APP_ID = '';
 const APP_KEY ='';
 
 const [recipes, setRecipes] = useState([]);
 const [search, setSearch] = useState('');
 const [query, setQuery] = useState('chicken');
//const [counter, setCounter] = useState(0);

 useEffect(() =>{
   getRecipes();
   //console.log("lets say we are fetching data");
  // console.log('Effect has been run');
 },[query]);

 const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);

    // fetch(https://api.edamam.com)
    // .then(response =>{
    //   response.json
    // })
};

const updateSearch = e => {
  setSearch(e.target.value);
  // console.log(search);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
};


 return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form> 
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    
      {/* <h1 onClick={() => setCounter(counter + 1)} >{counter}</h1> */}
    </div>
  );
}


export default App;
