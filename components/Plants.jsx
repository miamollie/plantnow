import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PlantDetail from "../components/PlantDetail";

export default function Plants({ plants, season, climate }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="p" component="p" gutterBottom>
        {`Looks like it's ${season} and you're in the ${climate.toLowerCase()}, here are some things
        you could plant now:`}
      </Typography>
      <Box component="section" className={classes.grid}>
        {plants
          ? plants.map((p) => <PlantDetail plant={p} key={p.name} />)
          : "Sorry, we couldn't find any plants for you this time"}
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "30px",
  },
});
