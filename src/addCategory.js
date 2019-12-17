import React, { useState } from "react";
import Axios from "axios";
import "./addCategory.css";

const AddCategory = ({ userID, setUpdateApp, updateApp }) => {
  const [addCategory, setAddCategory] = useState(false);
  const [categoryColor, setCategoryColor] = useState("#ff0000");
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = () => {
    Axios.post("http://localhost:3000/api/categories/addCategory", {
      userID,
      categoryName,
      categoryColor
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  if (addCategory) {
    return (
      <div className="addEvent__container">
        <form
          className="addEvent_form"
          onSubmit={e => {
            e.preventDefault();
            handleAdd();
            setAddCategory(false);
            setTimeout(() => setUpdateApp(!updateApp), 500);
          }}
        >
          <input
            type="color"
            value={categoryColor}
            onChange={e => {
              setCategoryColor(e.target.value);
            }}
            className="addEvent_color_input"
            required
          ></input>
          <input
            type="text"
            value={categoryName}
            onChange={e => {
              setCategoryName(e.target.value);
            }}
            className="addEvent_name_input"
            required
          ></input>
          <div className="button__container">
            <button
              className="category_manager confirm_new"
              onClick={e => {
                e.preventDefault();
                handleAdd();
                setAddCategory(false);
                setTimeout(() => setUpdateApp(!updateApp), 500);
              }}
            >
              <i className="fas fa-check"></i>
            </button>
            <button
              className="category_manager add_new"
              onClick={e => {
                e.preventDefault();
                setAddCategory(false);
              }}
            >
              <i className="far fa-window-close"></i>
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="addEvent__container">
        <form
          className="addEvent_form"
          onSubmit={e => {
            e.preventDefault();
            setAddCategory(true);
          }}
        >
          <button
            className="category_manager add_new"
            onClick={e => {
              e.preventDefault();
              setAddCategory(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </form>
      </div>
    );
  }
};

export default AddCategory;
