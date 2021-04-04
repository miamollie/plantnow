import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import { SearchBar } from "../components/SearchBar";
import { Results } from "../components/Results";

const searchClient = algoliasearch(
  "I6Z8A9HLO1",
  "a1e2e8691045a3ed122ce0c6591fd5a8"
);

export function Search() {
  return (
    <InstantSearch indexName="plants" searchClient={searchClient}>
      <SearchBar />
      <Results />
    </InstantSearch>
  );
}
