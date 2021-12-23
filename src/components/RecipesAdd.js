import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import db from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RecipesAdd() {
  const [categoryId, setCategoryId] = useState();
  const [description, setDescription] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [recipesId, setRecipeId] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [dataYield, setdataYield] = useState("");
  const [inputIngredients, setinputIngredients] = useState([]);
  const [inputPhotosArray, setinputPhotosArray] = useState([]);
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

  const notify = () =>
    toast.success("Added Successfully !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const IngredientsData = () => {
    db.collection("ingredients").onSnapshot((snapshot) => {
      setIngredientsData(
        snapshot.docs.map((doc) => ({
          ingredientId: doc.data().ingredientId,
          ingredientName: doc.data().name,
        }))
      );
    });
  };
  const recipesData = () => {
    db.collection("recipes")
      .orderBy("recipeId")
      .onSnapshot((snapshot) => {
        setRecipeData(
          snapshot.docs.map((doc) => ({
            categoryId: doc.recipesId,
            data: doc.data(),
          }))
        );
      });
  };

  useEffect(() => {
    IngredientsData();
    recipesData();
  }, []);

  function dataIngredients(data) {
    const ingredientsArray = [];
    ingredientsData.map((item, index) =>
      Object.keys(data.ingredients).map((ddd) => {
        if (Number(ddd) === Number(item.ingredientId)) {
          ingredientsArray.push(item.ingredientName + ", ");
        }
      })
    );
    return ingredientsArray;
  }
  function dataPhotosArray(data) {
    const photosArray = [];
    data.photosArray.map((item) => photosArray.push(item));
    return photosArray.map((item, index) => (
      <div className="col-md-3" key={index}>
        <img width={50} height={50} alt="recipe photo" src={item} alt="photo" />
      </div>
    ));
  }
  function dataDescripton(data) {
    const dataInstructions = [];
    data.description.map((item) => dataInstructions.push(item));
    return dataInstructions.map((item, index) => (
      <div className="col-md-3" key={index}>
        <p>{item}</p>
      </div>
    ));
  }

  function handleInputPhotosArray(photos) {
    const newArray = photos.split(",");
    setinputPhotosArray(newArray);
    return newArray;
  }
  function handleInstructions(instructions) {
    const newInstructions = instructions.split(",");
    setDescription(newInstructions);
    return newInstructions;
  }

  const submit = (e) => {
    e.preventDefault();
    db.collection("recipes").add({
      recipeId: Number(recipesId),
      categoryId: Number(categoryId),
      title: title,
      cookTime: cookTime,
      prepTime: prepTime,
      cuisine: cuisine,
      yield: dataYield,
      description: description,
      ingredients: [inputIngredients],
      photosArray: inputPhotosArray,
      photo_url: photoUrl,
    });
    notify();
    setRecipeId("");
    setPrepTime("");
    setCookTime("");
    setTitle("");
    setDescription("");
    setCategoryId("");
    setdataYield("");
    setPhotoUrl("");
    setCuisine("");
    setinputIngredients([]);
    setinputPhotosArray([]);
  };

  //   const updateData = (e) => {
  //     e.preventDefault();
  //     db.collection("recipes").doc(dataIdToBeUpdated).update({
  //       id: updatedRecipesId,
  //       name: updatedRecipesName,
  //     });

  //     setUpdatedRecipesName("");
  //     setUpdatedRecipesId("");
  //     setDataIdToBeUpdated("");
  //   };

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!dataIdToBeUpdated ? (
        <div className="App__form">
          <input
            type="number"
            placeholder="Recipe ID"
            value={recipesId}
            onChange={(e) => setRecipeId(e.target.value)}
          />
          <input
            type="title"
            placeholder="Title of the recipe"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Instructions (separated by comma)"
            value={description}
            style={{ width: '100%' }}
            onChange={(e) => handleInstructions(e.target.value)}
          />
           <input
            type="text"
            placeholder="Photo URL"
            value={photoUrl}
            style={{ width: '100%' }}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={inputIngredients}
            style={{ width: '100%' }}
            onChange={(e) => setinputIngredients(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cook Time"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Prep Time"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
          />
         
          
          <input
            type="text"
            placeholder="Photos Array"
            value={inputPhotosArray}
            onChange={(e) => handleInputPhotosArray(e.target.value)}
            // onChange={(e) => setinputPhotosArray(e.target.value)}
          />
          <input
            type="text"
            placeholder="Yield"
            value={dataYield}
            onChange={(e) => setdataYield(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
          <button onClick={submit}>Submit</button>
        </div>
      ) : (
        <div className="App__Updateform">
          <input
            type="number"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <button onClick={updateData}>Update</button> */}
        </div>
      )}

      <div className="App__DataDisplay">
        <table>
          <tr>
            <th>Recipe ID</th>
            <th>Title</th>
            <th>Category ID</th>
            <th
              style={{
                width: "1vh",
              }}
            >
              Ingredients
            </th>
            <th>Cook Time</th>
            <th>Prep Time</th>
            <th>Photo Url</th>
            <th>Instructions</th>
            <th>Photo Array</th>
            <th>Cuisine</th>
            <th>Yield</th>
          </tr>
          {recipeData?.map(({ id, data, index }) => (
            <tr className="Sine" key={id}>
              <td>{data.recipeId}</td>
              <td
                style={{
                  marginBottom: "25px",
                  fontSize: "0.4rem",
                  width: "20vh",
                }}
              >
                {data.title}
              </td>
              <td>{data.categoryId}</td>
              <td
                style={{
                  fontSize: "0.64rem",
                  width: "10vh",
                }}
              >
                {dataDescripton(data)}
              </td>
              <td>{data.cookTime}</td>
              <td>{data.prepTime}</td>
              <img
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                }}
                src={data.photo_url}
                width={50}
                height={50}
                alt="recipe photo"
              />
              <td style={{ marginBottom: "25px", fontSize: "0.55rem" }}>
                {dataIngredients(data)}
              </td>
              <td style={{ marginBottom: "25px", fontSize: "0.55rem" }}>
                {dataPhotosArray(data)}
              </td>
              <td>{data.cuisine}</td>
              <td
                style={{
                  marginBottom: "25px",
                  fontSize: "0.65rem",
                }}
              >
                {data.yield}
              </td>
              <td>
                <button
                  onClick={() => {
                    setDataIdToBeUpdated(id);
                    // setUpdatedRecipesName(data.id);
                    // setUpdatedRecipesId(data.name);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default RecipesAdd;
