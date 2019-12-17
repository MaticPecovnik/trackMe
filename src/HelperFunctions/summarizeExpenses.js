const summarizeExpenses = (expenses, categories, timeframe) => {
  const { year, month } = timeframe;

  let expense = [];
  let income = [];

  for (let j = 0; j < categories.length; j++) {
    let categorySummary = 0;
    for (let i = 0; i < expenses.length; i++) {
      const expenseFullDate = new Date(expenses[i].expenseDate);
      const expenseMonth = expenseFullDate.getMonth();
      const expenseYear = expenseFullDate.getFullYear();

      if (
        expenses[i].category === categories[j].categoryName &&
        expenseMonth === month &&
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
