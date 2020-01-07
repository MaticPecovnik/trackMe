import React from "react";
import "./columnGraph.css";

const ColumnGraph = ({ list, categoryList }) => {
  const totalSpent = list.reduce((sum, cat) => {
    return sum + cat.categorySummary;
  }, 0);
  const listPlot = list.map(a => {
    return {
      categoryName: a.category,
      categorySummaryAbs: a.categorySummary,
      categorySummaryPerc: a.categorySummary / totalSpent,
      categoryColor: categoryList.find(
        category => category.categoryName === a.category
      ).categoryColor
    };
  });
  return (
    <div className="graph__container">
      <table className="table__container">
        <tbody>
          <tr className="table_row">
            <th className="graph_category_name">Name</th>
            <th className="graph_category_plot"></th>
            <th className="graph_category_perc">Perc.</th>
            <th className="graph_category_value">Spent</th>
          </tr>
          {listPlot.map((a, i) => {
            return <Graph category={a} key={i} />;
          })}
        </tbody>
      </table>
      <h6 className="graph_total">
        The total for this month is: {totalSpent} €
      </h6>
    </div>
  );
};

export default ColumnGraph;

const Graph = ({ category }) => {
  return (
    <tr className="table_row">
      <td className="graph_category_name">
        <h6>{category.categoryName}</h6>
      </td>
      <td className="graph_category_plot">
        <div
          className="graph_category_plot_bar"
          style={{
            backgroundColor: category.categoryColor,
            width: String(category.categorySummaryPerc * 100) + "%"
          }}
        ></div>
      </td>
      <td className="graph_category_perc">
        {String(category.categorySummaryPerc * 100).slice(0, 5).length === 4
          ? String(category.categorySummaryPerc * 100).slice(0, 5)
          : String(category.categorySummaryPerc * 100).slice(0, 4)}
        %
      </td>
      <td className="graph_category_value">{category.categorySummaryAbs} €</td>
    </tr>
  );
};

/*const Graph = ({ category }) => {
  return (
    <div className="graph_category">
      <div className="graph_category_name">
        <h6>{category.categoryName}</h6>
      </div>
      <div className="graph_category_plot">
        {category.categorySummaryPerc * 100}%
      </div>
      <div className="graph_category_value">
        {category.categorySummaryAbs} €
      </div>
    </div>
  );
};
*/
