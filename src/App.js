import React, { useState } from 'react';
import './App.css';
import Axios from "axios";
import { v4 as uuidv4} from "uuid";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

function App() {
  const [query, setQuery] = useState("");
  const [ recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "7c9951d6";
  const APP_KEY = "1fb575a095fe0136c381d3756f1ae5ba";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async() => {
    if(query !== ""){
      const result = await Axios.get(url);
      if(!result.data.more){
        return setAlert("No food found with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    }else{
      setAlert("please fill the form");
    }
  };


  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1>My Recipes</h1>
      <form onSubmit={onSubmit} className="search-form">
      {alert !== "" && <Alert alert={alert}/>}
        <input
          type="text"
          name='query'
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder='search a recipe...'
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
