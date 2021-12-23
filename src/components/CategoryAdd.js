import React, { useState, useEffect } from "react";
import "../App.css";
import db from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryAdd() {
  const [recipesId, setRecipesId] = useState();
  const [recipesName, setRecipesName] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [updatedRecipesId, setUpdatedRecipesId] = useState("");
  const [updatedRecipesName, setUpdatedRecipesName] = useState("");
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

  useEffect(() => {
    db.collection("categories")
      .orderBy("id")
      .onSnapshot((snapshot) => {
        setCustomersData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    db.collection("categories").add({
      id: Number(recipesId),
      name: recipesName,
    });
    notify();
    setRecipesId("");
    setRecipesName("");
  };

  const updateData = (e) => {
    e.preventDefault();
    db.collection("categories").doc(dataIdToBeUpdated).update({
      id: updatedRecipesId,
      name: updatedRecipesName,
    });

    setUpdatedRecipesName("");
    setUpdatedRecipesId("");
    setDataIdToBeUpdated("");
  };

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
            placeholder="category ID"
            value={recipesId}
            onChange={(e) => setRecipesId(e.target.value)}
          />
          <input
            type="text"
            placeholder="category Name"
            value={recipesName}
            onChange={(e) => setRecipesName(e.target.value)}
          />
          <button onClick={submit}>Submit</button>
        </div>
      ) : (
        <div className="App__Updateform">
          <input
            type="number"
            placeholder="Category ID"
            value={updatedRecipesId}
            onChange={(e) => setUpdatedRecipesId(e.target.value)}
          />
          <input
            type="text"
            placeholder="category Name"
            value={updatedRecipesName}
            onChange={(e) => setUpdatedRecipesName(e.target.value)}
          />
          <button onClick={updateData}>Update</button>
        </div>
      )}

      <div className="App__DataDisplay">
        <table>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Category Update</th>
          </tr>
          {customersData?.map(({ id, data }) => (
            <tr key={id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>
                <button
                  onClick={() => {
                    setDataIdToBeUpdated(id);
                    setUpdatedRecipesName(data.id);
                    setUpdatedRecipesId(data.name);
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

export default CategoryAdd;
