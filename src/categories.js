import React from "react";
import Axios from "axios";
import "./categories.css";

import AddCategory from "./addCategory";

import FullCategoryDisplay from "./fullCategoryDisplay";

const Categories = ({ userID, categoryList, updateApp, setUpdateApp }) => {
  const handleDelete = category => {
    Axios.delete("http://localhost:3000/api/categories/delCategory", {
      data: {
        userID,
        categoryColor: category.categoryColor,
        categoryName: category.categoryName
      }
    });
    setTimeout(() => setUpdateApp(!updateApp), 500);
  };

  return (
    <div className="categoriesList__container">
      <div className="categoriesList">
        {categoryList !== undefined && categoryList.length > 0
          ? categoryList.map((obj, i) => {
              return (
                <FullCategoryDisplay
                  category={obj}
                  handleDelete={handleDelete}
                  setUpdateApp={setUpdateApp}
                  updateApp={updateApp}
                  userID={userID}
                  categoryIndex={i}
                  key={i}
                />
              );
            })
          : null}
        <AddCategory
          userID={userID}
          setUpdateApp={setUpdateApp}
          updateApp={updateApp}
        />
      </div>
      <div className="categoryList_description">
        <div className="description_focused description">
          <CategoryManageDescription />
        </div>
      </div>
    </div>
  );
};

export default Categories;

const CategoryManageDescription = () => {
  return (
    <div>
      <h4>Lorem ipsum</h4>
    </div>
  );
};
