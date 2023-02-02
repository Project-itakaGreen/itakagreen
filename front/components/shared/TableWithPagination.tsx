import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

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

const PopupRecord = styled.button`
 
`;


const TableWithPagination = ({ data, dataTotal, auth }: any) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const backUrl = process.env.BACK_URL;
  const handlePageClick = (page: any) => {
    setCurrentPage(page);
  };

  const items = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [domainId, setDomainId] = useState(null);

  const handleDeleteRecord = (domainId: any) => {
    setDomainId(domainId);
    
    if(isModalOpen)
      handleModalCancel();
    else
      setIsModalOpen(true)
  };

  const handleModalOk = async () => {
    if (!domainId) return;
    const headers = {
      Authorization: `Bearer ${auth}`,
    };
  
    if (auth) {
      try {
        const response = await axios.delete(backUrl+`/api/conso/${domainId}`, { headers });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      router.push(backUrl + "/api/auth/google/login");
    }

    setIsModalOpen(false);
    setDomainId(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setDomainId(null);
  };

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


      {isModalOpen && (
        <PopupRecord>
          <p>Are you sure you want to delete the record?</p>
          <button onClick={handleModalOk}>OK</button>
          <button onClick={handleModalCancel}>Cancel</button>
        </PopupRecord>
      )}
      <Table>
        <thead>
          <tr>
            <th
              style={{
                padding: "0px 0px 0px 10%",
              }}
            >
              Conso totale de tout les Domaine :{" "}
              <span>
                {" "}
                {Math.floor(dataTotal.totalCo2 * 1000) / 1000} g de Co2
              </span>{" "}
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
          {items.map((item: any) => (
            <tr key={item.domain_id}>
              <td
                style={{
                  width: "90%",
                  padding: "0px 0px 0px 10%",
                }}
              >
                Conso sur le Domaine {item.domain} :
                <span
                  style={{
                    padding: "0px 0px 0px 10%",
                  }}
                >
                  {" "}
                  {Math.floor(item.totalCo2 * 1000) / 1000} g de Co2
                </span>{" "}
              </td>
              <td>
                {" "}
                <ButtonDelete onClick={()=>handleDeleteRecord(item.domain_id)}>
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
