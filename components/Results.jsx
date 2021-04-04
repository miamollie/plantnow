import { connectStateResults, connectHits } from "react-instantsearch-dom";
import PlantResult from "../components/PlantResult";
import { makeStyles } from "@material-ui/core/styles";

function HitsComponent({ hits }) {
  const classes = useStyles(0);
  return (
    <ul className={classes.hitList}>
      {hits.map((hit) => (
        <PlantResult key={hit.objectID} plant={{ ...hit }} />
      ))}
    </ul>
  );
}

const useStyles = makeStyles((theme) => ({
  hitList: {
    listStyleType: "none",
    padding: 0,
    margin: `0 0 ${theme.spacing(4)}px 0`,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridGap: `${theme.spacing(3)}px`,
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
}));

const Hits = connectHits(HitsComponent);

//TODO "no results" state
const ResultsComponent = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchState && searchState.query ? children : null
);

// searchResults && searchResults.nbHits !== 0 ? children : <p>No results found for {searchState.query}</p>

export function Results() {
  return (
    <ResultsComponent>
      <Hits />
    </ResultsComponent>
  );
}
