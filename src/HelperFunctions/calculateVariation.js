const calculateVariation = (expensesList, expenseHistoryYear) => {
  /* Lets first calculate the variation of specific categories throughout
    a whole year */

  // first lets group up the expenses according to category. We only take account of expenses and not the income

  let expenseGrouped = [];

  for (let i = 0; i < expensesList.length; i++) {
    if (expensesList[i].expenseValue < 0) {
      const newCategory = {
        categoryName: expensesList[i].category,
        expenses: [Number.parseFloat(expensesList[i].expenseValue)]
      };

      /* Does the category already exist? */
      const exist = expenseGrouped.some(el => {
        return el.categoryName === expensesList[i].category;
      });
      // if it does not then add the expense
      if (!exist) {
        expenseGrouped.push(newCategory);

        // else push the expense to an existing category
      } else {
        expenseGrouped[
          expenseGrouped.findIndex(el => {
            return el.categoryName === expensesList[i].category;
          })
        ].expenses.push(Number.parseFloat(expensesList[i].expenseValue));
      }
    }
  }

  /* now we calculate the variation of each category */

  let expenseVariationUnordered = [];

  for (let i = 0; i < expenseGrouped.length; i++) {
    expenseVariationUnordered.push({
      categoryName: expenseGrouped[i].categoryName,
      expenseVariation: arr.standardDeviation(expenseGrouped[i].expenses)
    });
  }

  const expenseVariationOrdered = expenseVariationUnordered.sort((a, b) => {
    return b.expenseVariation - a.expenseVariation;
  });

  /* We have the categories that have the largest variance */

  let categoryVariationOrdered = [
    expenseVariationOrdered[0].categoryName,
    expenseVariationOrdered[1].categoryName,
    expenseVariationOrdered[2].categoryName
  ];

  /* We can now get the list of the sum of expenses with the largest variation for each month of a given year */
  let maxVariationExpenses = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  // a for loop to go over all months of a year
  for (let i = 0; i < 12; i++) {
    // for loop to go over all expenses
    for (let j = 0; j < expensesList.length; j++) {
      const expenseYear = new Date(
        expensesList[j].expenseDate
      ).getUTCFullYear();
      const expenseMonth = new Date(expensesList[j].expenseDate).getMonth();
      if (expenseYear === expenseHistoryYear && expenseMonth === i) {
        switch (expensesList[j].category) {
          case categoryVariationOrdered[0]:
            maxVariationExpenses[0][i] += Math.abs(
              Number.parseFloat(expensesList[j].expenseValue)
            );
            break;
          case categoryVariationOrdered[1]:
            maxVariationExpenses[1][i] += Math.abs(
              Number.parseFloat(expensesList[j].expenseValue)
            );
            break;
          case categoryVariationOrdered[2]:
            maxVariationExpenses[2][i] += Math.abs(
              Number.parseFloat(expensesList[j].expenseValue)
            );
            break;
          default:
            break;
        }
      }
    }
  }
  return [maxVariationExpenses, categoryVariationOrdered];
};

export default calculateVariation;

/* a helper object */

const arr = {
  sum: function(array) {
    var num = 0;
    for (var i = 0, l = array.length; i < l; i++) num += array[i];
    return num;
  },

  mean: function(array) {
    return arr.sum(array) / array.length;
  },
  variance: function(array) {
    var mean = arr.mean(array);
    return arr.mean(
      array.map(function(num) {
        return Math.pow(num - mean, 2);
      })
    );
  },

  standardDeviation: function(array) {
    return Math.sqrt(arr.variance(array));
  }
};
