import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayTableWithPagination = () => {
  const [data, setData] = useState([]); // Holds the fetched data
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const [itemsPerPage] = useState(5); // Number of items per page

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );
      if (response) {
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Calculate indices for slicing the data array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: currentPage === i ? "#007bff" : "#f1f1f1",
            color: currentPage === i ? "#fff" : "#000",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <table
        border="1"
        style={{
          borderCollapse: "collapse",
          width: "50%",
          align: "center",
          margin: "auto",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item["s.no"]}</td>
                <td>{item["percentage.funded"]}</td>
                <td>{item["amt.pledged"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {renderPagination()}
      </div>
    </div>
  );
};

export default DisplayTableWithPagination;
