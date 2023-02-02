import React, { useState } from 'react';
import styled from 'styled-components';

const data = [  { id: 1, name: 'www.youtube.fr' },  { id: 2, name: 'www.pornhub.fr' },  { id: 3, name: 'www.pornhub.fr' },  { id: 4, name: 'www.pornhub.fr' },  { id: 5, name: 'www.pornhub.fr' }, { id: 6, name: 'www.pornhub.fr' }, { id: 7, name: 'www.pornhub.fr' }, { id: 8, name: 'www.pornhub.fr' }, { id: 9, name: 'www.pornhub.fr' },];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const PageButton = styled.button`
  background-color: transparent;
  border: 1px solid black;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0 8px;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const items = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Site visiter </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td> <button>supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        {currentPage > 0 && (
          <PageButton onClick={() => handlePageClick(currentPage - 1)}>Précédent</PageButton>
        )}
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
          <PageButton key={i} onClick={() => handlePageClick(i)}>
            {i + 1}
          </PageButton>
        ))}
        {currentPage < Math.ceil(data.length / itemsPerPage) - 1 && (
          <PageButton onClick={() => handlePageClick(currentPage + 1)}>Suivant</PageButton>
        )}
      </PaginationContainer>
    </>
  );
};

export default TableWithPagination;
