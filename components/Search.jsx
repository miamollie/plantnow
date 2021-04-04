import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom";
import PlantResult from "../components/PlantResult";

const searchClient = algoliasearch(
  "I6Z8A9HLO1",
  "a1e2e8691045a3ed122ce0c6591fd5a8"
);

export function Search() {
  return (
    <InstantSearch indexName="plants" searchClient={searchClient}>
      <SearchBox />
      <Results>
        <Hits hitComponent={Hit} />
      </Results>
    </InstantSearch>
  );
}

function Hit({ hit }) {
  return <PlantResult plant={{ ...hit }} />;
}

const Results = connectStateResults(({ searchState, children }) =>
  searchState && searchState.query ? children : null
);
