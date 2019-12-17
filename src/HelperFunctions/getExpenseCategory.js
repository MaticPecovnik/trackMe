const getExpenseCategory = (expense, categoryList) => {
  let correctCategory = categoryList.filter(category => {
    return category.categoryName === expense.category;
  })[0];

  if (correctCategory) {
    return correctCategory.categoryColor;
  }
};

export default getExpenseCategory;
