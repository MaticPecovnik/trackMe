const summarizeExpenses = ({ expenses, categories, timeframe }) => {
  let { year, month } = timeframe;

  // if month is undefined we set an arbitrary month as it will be dynamically set anyway
  let monthQuery = month || 1;

  let expense = [];
  let income = [];

  if (categories.length === 0) {
    /* Build the categories from the expense list */
    for (let k = 0; k < expenses.length; k++) {
      const newCategory = { categoryName: expenses[k].category };

      /* Does the category already exist? */
      const exist = categories.some(el => {
        return el.categoryName === expenses[k].category;
      });
      if (!exist) {
        categories.push(newCategory);
      }
    }
  }

  for (let j = 0; j < categories.length; j++) {
    let categorySummary = 0;
    for (let i = 0; i < expenses.length; i++) {
      const expenseFullDate = new Date(expenses[i].expenseDate);
      const expenseMonth = expenseFullDate.getMonth();
      const expenseYear = expenseFullDate.getFullYear();

      if (month === undefined) {
        /* If the user does not input a month, then all the expenses of the desired year are summarized */
        monthQuery = expenseFullDate.getMonth();
      }

      if (
        expenses[i].category === categories[j].categoryName &&
        expenseMonth === monthQuery &&
        expenseYear === year
      ) {
        categorySummary += parseFloat(expenses[i].expenseValue);
      }
    }

    if (categorySummary > 0) {
      income.push({
        category: categories[j].categoryName,
        categorySummary: categorySummary
      });
    } else if (categorySummary < 0) {
      expense.push({
        category: categories[j].categoryName,
        categorySummary: Math.abs(categorySummary)
      });
    }
  }
  expense = expense.sort((a, b) => {
    return b.categorySummary - a.categorySummary;
  });
  income = income.sort((a, b) => {
    return b.categorySummary - a.categorySummary;
  });

  return { expense, income };
};

export default summarizeExpenses;
