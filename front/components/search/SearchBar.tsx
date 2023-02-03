import { useEffect, useState } from "react";
import styled from "styled-components";

const BASE_SEARCH_ENGINE = {
  name: "Ecosia",
  search: "https://www.ecosia.org/search",
};

const ALL_SEARCH_ENGINE = [
  BASE_SEARCH_ENGINE,
  {
    name: "Ecogine",
    search: "https://ecogine.org",
  },
  {
    name: "Lilo",
    search: "https://search.lilo.org",
  },
  {
    name: "Google",
    search: "http://www.google.com/search",
  },
];

export default function SearchBar() {
  const [selectedSearchEngine, setSelectedSearchEngine] =
    useState(BASE_SEARCH_ENGINE);

  // Get searchEngine in localstorage
  useEffect(() => {
    const selectedSearchEngineFromStorage = localStorage.getItem(
      "selectedSearchEngine"
    );
    const initialSelectedSearchEngine = selectedSearchEngineFromStorage
      ? JSON.parse(selectedSearchEngineFromStorage)
      : BASE_SEARCH_ENGINE;
    if (initialSelectedSearchEngine != BASE_SEARCH_ENGINE) {
      setSelectedSearchEngine(initialSelectedSearchEngine);
    }
  }, []);

  const handleSearchEngineChange = (event: any) => {
    const newSelelectEngine =
      ALL_SEARCH_ENGINE.find(
        (searchEngine) => searchEngine.name === event.target.value
      ) ?? BASE_SEARCH_ENGINE;
    setSelectedSearchEngine(newSelelectEngine);
    localStorage.setItem(
      "selectedSearchEngine",
      JSON.stringify(newSelelectEngine)
    );
  };

  return (
    <WrapperSearch>
      <form action={selectedSearchEngine.search} method="get">
        <input type="text" name="q" required />
        <button type="submit">
          <i className="material-symbols-sharp">search </i>
        </button>
      </form>
      <SearchEngine>
        <select
          name="searchEngine"
          id="searchEngine-select"
          onChange={handleSearchEngineChange}
          value={selectedSearchEngine.name}
        >
          {ALL_SEARCH_ENGINE.map((searchEngine, key) => (
            <option value={searchEngine.name} key={`searchEngine-${key}`}>
              {searchEngine.name}
            </option>
          ))}
        </select>
      </SearchEngine>
    </WrapperSearch>
  );
}

const WrapperSearch = styled.div`
  form {
    display: flex;
  }
  select {
    border: unset;
    height: 30.5px;
    border-radius: 76px;
    background-color: #ffffff95;
    width: 120%;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
    padding-left: 5px;
    cursor: pointer;
  }
  display: flex;
  gap: 20px;
  margin: 5px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  input {
    height: 30px;
  }
  input[type="text"] {
    padding: 0 50px 0 10px;
    border-radius: 76px;
    width: 500px;
    border: unset;
    background-color: #ffffff95;
  }
  button[type="submit"] {
    border-style: none;
    background-color: unset;
    margin-left: -40px;
    cursor: pointer;
    i {    
      margin-top: 3px;
      margin-left: 5px;
    }
  }
`;

const SearchEngine = styled.div``;
