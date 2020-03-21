import React from "react";

const getRows = items => {
  return items.map(item => {
    return (
      <tr key={items.indexOf(item)}>
        <td>{item.category}</td>
        <td>{item.title}</td>
        <td>{item.weight}</td>
        <td style={{ padding: 0 }}>{getSizeTable(item.size)}</td>
        <td>{item.cubic_weight}</td>
      </tr>
    );
  });
};

const getSizeTable = size => {
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Width</th>
          <th scope="col">Length</th>
          <th scope="col">Height</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{size.width} cm</td>
          <td>{size.length} cm</td>
          <td>{size.height} cm</td>
        </tr>
      </tbody>
    </table>
  );
};

const DataTable = props => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Title</th>
          <th scope="col">Weight</th>
          <th scope="col">Size</th>
          <th scope="col">Average Cubic Weight</th>
        </tr>
      </thead>
      <tbody>{getRows(props.items)}</tbody>
    </table>
  );
};

export default DataTable;
