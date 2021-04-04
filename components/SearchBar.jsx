import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { connectSearchBox } from "react-instantsearch-dom";

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
    flexGrow: 2,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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

export const SearchBar = connectSearchBox(SearchBox);
