import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CategoryAdd from "./components/CategoryAdd";
import RecipesAdd from "./components/RecipesAdd";

function App() {
  const [value, setValue] = useState();

  function renderSwitch(param) {
    switch (param) {
      case "Category Add":
        return <CategoryAdd />;
      case "Recipes Add":
        return <RecipesAdd />;
      case "Ingredient Add":
        return <CategoryAdd />;
      default:
        return <CategoryAdd />;
    }
  }

  function handleChange(event) {
    renderSwitch(event.target.value);
    setValue(event.target.value);
  }

  return (
    <Router>
      <select value={value} onChange={handleChange}>
        <option selected value="Category Add">Category Add</option>
        <option value="Recipes Add">Recipes Add</option>
        <option value="Ingredient Add">Ingredient Add</option>
      </select>
      {renderSwitch(value)}
    </Router>
  );
}
export default App;
