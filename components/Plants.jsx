import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PlantDetail from "../components/PlantDetail";

const DEFAULT_PLANT_NUMBER = 16;

export default function Plants({ plants, season, climate }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" component="h2" gutterBottom>
        {`${season} plants in the `}
        <em>{climate.toLowerCase()}</em>
      </Typography>
      <Box component="section" className={classes.grid}>
        {plants
          ? plants.map((p) => <PlantDetail plant={p} key={p.name} />)
          : "Sorry, we couldn't find any plants for you this time"}
        {/* TODO, better empty message for above */}
        {/* TODO just the first 16 then a "more button" */}
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "30px",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
}));
