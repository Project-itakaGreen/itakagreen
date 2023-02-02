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
        <input type="submit" value="Search" />
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 5px;
  input {
    height: 30px;
  }
  input[type="text"] {
    width: 500px;
  }
  input[type="submit"] {
    width: 100px;
  }
`;
const SearchEngine = styled.div``;
