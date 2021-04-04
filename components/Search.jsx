import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  connectStateResults,
  connectSearchBox,
} from "react-instantsearch-dom";
import PlantResult from "../components/PlantResult";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const searchClient = algoliasearch(
  "I6Z8A9HLO1",
  "a1e2e8691045a3ed122ce0c6591fd5a8"
);

export function Search() {
  return (
    <InstantSearch indexName="plants" searchClient={searchClient}>
      <CustomSearchBox />
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

const SearchBox = ({ currentRefinement, refine }) => {
  const classes = useStyles();

  return (
    <form noValidate action="" role="search" className={classes.searchForm}>
      <div className={classes.searchWrapper}>
        <input
          className={classes.searchBar}
          placeholder="Search all plants"
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        <SearchIcon />
      </div>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  searchBar: {
    border: "none",
    "&:hover, &:focus": {
      border: "none",
      outline: "none",
    },
  },
  searchForm: {
    border: "none",
    "&:hover, &:focus": {
      outline: "none",
    },
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(2)}px`,
    marginBottom: `${theme.spacing(5)}px`,
    overflow: "hidden",
    backgroundColor: "white",
    cursor: "pointer",
    position: "relative",
    width: `50%`,
    minWidth: `${theme.spacing(5)}px`,
    height: `${theme.spacing(5)}px`,
    boxShadow: theme.shadows[3],
    borderRadius: "30px",
    "&:hover, &:focus": {},
  },
}));

const CustomSearchBox = connectSearchBox(SearchBox);
