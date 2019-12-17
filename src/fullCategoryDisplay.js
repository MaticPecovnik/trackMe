import React, { useState } from "react";
import "./fullCategoryDisplay.css";
import Axios from "axios";

const FullCategoryDisplay = ({
  category,
  handleDelete,
  setUpdateApp,
  updateApp,
  userID,
  categoryIndex
}) => {
  const [editCategory, setEditCategory] = useState(false);
  const [categoryColor, setCategoryColor] = useState(category.categoryColor);
  const [categoryName, setCategoryName] = useState(category.categoryName);

  const handleEdit = () => {
    Axios.post("http://localhost:3000/api/categories/editCategory", {
      userID,
      categoryName,
      categoryColor,
      categoryIndex,
      oldCategoryName: category.categoryName
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  if (!editCategory) {
    return (
      <div className="fullCategory__container">
        <div
          className="fullCategory_color__container"
          style={{
            backgroundColor: category.categoryColor
          }}
        ></div>
        <div className="fullCategory_name__container">
          <h5>{category.categoryName}</h5>
        </div>
        <div className="fullCategory_control__container">
          <button
            className="category_manager category_edit"
            onClick={() => setEditCategory(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="category_manager category_erase"
            onClick={() => handleDelete(category)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="addEvent__container" style={{ border: "none" }}>
        <form
          className="addEvent_form"
          onSubmit={e => {
            e.preventDefault();
            handleEdit();
            setEditCategory(false);
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
                handleEdit();
                setEditCategory(false);
                setTimeout(() => setUpdateApp(!updateApp), 500);
              }}
            >
              <i className="fas fa-check"></i>
            </button>
            <button
              className="category_manager add_new"
              onClick={e => {
                e.preventDefault();
                setEditCategory(false);
              }}
            >
              <i className="far fa-window-close"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default FullCategoryDisplay;
