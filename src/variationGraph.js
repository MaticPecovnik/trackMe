import React from "react";
import "./variationGraph.css";

const VariationGraph = ({ variationList, categoryName }) => {
  const maxInList = Math.max(...variationList);
  const xAxis = [
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "7.",
    "8.",
    "9.",
    "10.",
    "11.",
    "12."
  ];
  const yAxis = [
    0,
    Math.round(maxInList / 4),
    Math.round((maxInList * 2) / 4),
    Math.round((maxInList * 3) / 4),
    Math.round(maxInList)
  ];
  return (
    <div className="variation_graph__container">
      <div className="variation_graph_category">
        <h5>{categoryName}</h5>
      </div>
      <div className="variation_graph">
        <div className="y_axis">
          {yAxis.map((a, i) => {
            return (
              <span className="axis_label" key={i}>
                {a}
              </span>
            );
          })}
        </div>
        <div className="x_axis">
          {xAxis.map((a, i) => {
            return (
              <span className="axis_label" key={i}>
                {a}
              </span>
            );
          })}
        </div>
        <div className="graph">
          {variationList.map((a, i) => {
            console.log(String((a / maxInList) * 100));
            return (
              <span
                className="dot"
                key={i}
                style={{
                  position: "relative",
                  bottom: String((a / maxInList) * 100) + "%"
                }}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VariationGraph;
