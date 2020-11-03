import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PlantDetail from "../components/PlantDetail";
import { useState } from "react";
import Button from "@material-ui/core/Button";

const DEFAULT_PLANT_NUMBER = 12;

export default function Plants({ plants, season, climate }) {
  if (!plants) {
    return (
      <Typography>
        Sorry, we couldn't find any plants for you this time
      </Typography>
    );
  }

  const classes = useStyles();
  const [offset, setOffset] = useState(DEFAULT_PLANT_NUMBER);
  const currentPlants = [...plants.slice(0, offset)];

  return (
    <>
      <Typography variant="h2" component="h2" gutterBottom>
        {`${season} plants in the `}
        <em>{climate.toLowerCase()}</em>
      </Typography>
      <Box component="section" className={classes.grid}>
        {currentPlants.map((p, i) => (
          <PlantDetail
            plant={p}
            key={p.name}
            index={i % DEFAULT_PLANT_NUMBER}
          />
        ))}
      </Box>
      {/* TODO, do something nice when they mount */}
      <Grid container direction="row" justify="center" alignItems="center">
        {offset < plants.length ? (
          <Button
            onClick={() => {
              setOffset(offset + DEFAULT_PLANT_NUMBER);
            }}
          >
            Load More
          </Button>
        ) : (
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </Button>
        )}
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: "30px", //TODO move 30px into theme
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
