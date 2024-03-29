import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import dynamic from "next/dynamic";

const PlantModal = dynamic(() => import("./PlantModal"));

export default function PlantDetail({ plant }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Grow in={true}>
        <li className={classes.cardListItem}>
          <figure className={classes.card}>
            <div className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="right"
              >
                <button className={classes.cardButton} onClick={handleOpen}>
                  {plant.name.toUpperCase()}
                </button>
              </Typography>
            </div>
          </figure>
        </li>
      </Grow>
      <PlantModal open={open} plant={plant} handleClose={handleClose} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  cardListItem: {
    cursor: "pointer",
  },
  card: {
    transition: `box-shadow ease ${theme.transitions.duration.standard}s`,
    position: "relative",
    margin: 0,
    overflow: "hidden",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  cardButton: {
    border: "none",
    borderRadius: 0,
    background: "transparent",
    padding: 0,
    transition: `box-shadow ease ${theme.transitions.duration.standard}s`,
    "&:hover, &:focus": {
      outline: "none",
    },
    // Forces button to fill container
    "&::after": {
      content: "close-quote",
      color: "transparent",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  cardContent: {
    padding: "16px 16px 24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      alignItems: "baseline",
    },
  },
  cardCaption: {
    top: "auto",
    bottom: 0,
    height: "3.75em",
    background: "#fff",
    color: "#000",
    textTransform: "uppercase",
    backfaceVisibility: "hidden",
    transition: `transform ${theme.transitions.duration.standard}s`,
    transform: "translate3d(0,100%,0)",
  },
}));
