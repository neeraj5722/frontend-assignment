import React, { useEffect, useState } from "react";
import axios from "axios";

const AxiosData = () => {
  const [data, setData] = useState([]); // Holds the fetched data
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(true); // Loading state

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );
      if (response) {
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Calculate indices for slicing the data array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtered and paginated items
  const filteredData = data.filter((item) =>
    item["percentage.funded"]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle navigation buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPagination = () => {
    return (
      <div>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by Percentage Funded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ padding: "10px" }}>S.No.</th>
                <th style={{ padding: "10px" }}>Percentage Funded</th>
                <th style={{ padding: "10px" }}>Amount Pledged</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2" }}>
                    <td style={{ padding: "10px" }}>{item["s.no"]}</td>
                    <td style={{ padding: "10px" }}>{item["percentage.funded"]}</td>
                    <td style={{ padding: "10px" }}>{item["amt.pledged"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {renderPagination()}
          </div>

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <label htmlFor="itemsPerPage">Items per page: </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              style={{ padding: "5px", fontSize: "16px" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default AxiosData;