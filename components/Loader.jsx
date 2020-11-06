import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";

export default function Loader() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box className={classes.wrapper}>
      <img
        className={classes.img}
        src="/static/detailLeaf.png"
        role="presentation"
        alt=""
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "300px",
    width: "300px",
    backgroundColor: "transparent",
    perspective: "8px",
    perspectiveOrigin: "0 0",
    animation: "$turn 3s infinite linear",
    margin: "auto",
  },
  img: {
    height: "100%",
    transform: "scale(1) translateZ(-8px)",
  },
  "@keyframes turn": {
    to: {
      transform: "rotate(360deg)",
    },
  },
}));
