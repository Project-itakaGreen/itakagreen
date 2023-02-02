import React, { useState } from "react";
import styled from "styled-components";

const data = [
  { id: 1, name: "www.youtube.fr" },
  { id: 2, name: "www.pornhub.fr" },
  { id: 3, name: "www.pornhub.fr" },
  { id: 4, name: "www.pornhub.fr" },
  { id: 5, name: "www.pornhub.fr" },
  { id: 6, name: "www.pornhub.fr" },
  { id: 7, name: "www.pornhub.fr" },
  { id: 8, name: "www.pornhub.fr" },
  { id: 9, name: "www.pornhub.fr" },
];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: green;
  border: 1px solid green;
  border-radius: 4px;

  th,
  td {
    border: 1px solid green;
    padding: 8px;
    text-align: left;
  }
  th {
    span {
      padding-left: 15%;
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const PageButton = styled.button`
  background-color: #e8fceb;
  color: green;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0 8px;
  cursor: pointer;
  border: none;
  position: relative;

  &:hover {
    background-color: #4caf50;
    border-radius: 3% 20% 0% 50%;
    color: white;
  }
`;

const ButtonDelete = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: #f46e6e;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: solid 1px #f46e6e;
  background-color: transparent;
  &:hover {
    border-radius: 3% 20% 0% 50%;
    color: white;
    border: solid 1px #f46e6e;
    background-color: #f46e6e;
  }
`;

const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handlePageClick = (page :any) => {
    setCurrentPage(page);
  };

  const items = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <PaginationContainer>
        {currentPage > 0 && (
          <PageButton onClick={() => handlePageClick(currentPage - 1)}>
            <span className="material-symbols-sharp">
              keyboard_double_arrow_left
            </span>
          </PageButton>
        )}
        {Array.from(
          { length: Math.ceil(data.length / itemsPerPage) },
          (_, i) => (
            <PageButton key={i} onClick={() => handlePageClick(i)}>
              {i + 1}
            </PageButton>
          )
        )}
        {currentPage < Math.ceil(data.length / itemsPerPage) - 1 && (
          <PageButton onClick={() => handlePageClick(currentPage + 1)}>
            <span className="material-symbols-sharp">
              keyboard_double_arrow_right
            </span>
          </PageButton>
        )}
      </PaginationContainer>
      <Table>
        <thead>
          <tr>
            <th
              style={{
                padding: "0px 0px 0px 10%",
              }}
            >
              Conso totale de tout les Domaine : <span> 1333Co2</span>{" "}
            </th>
            <th>
              <ButtonDelete>
                {" "}
                <span className="material-symbols-sharp">delete</span>
              </ButtonDelete>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  width: "90%",
                  padding: "0px 0px 0px 10%",
                }}
              >
                Conso sur le Domaine {item.name} :
                <span
                  style={{
                    padding: "0px 0px 0px 10%",
                  }}
                >
                  {" "}
                  1333Co2
                </span>{" "}
              </td>
              <td>
                {" "}
                <ButtonDelete>
                  <span className="material-symbols-sharp">delete</span>{" "}
                </ButtonDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableWithPagination;
