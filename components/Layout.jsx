import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "./Search";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.leafContainer}>
        <img
          className={classes.leafImage}
          src="static/headerFlowers.jpeg"
          alt=""
          role="presentation"
        />
      </div>
      <Container className={classes.main} component="main" maxWidth="md">
        <Typography variant="h1" component="h1" className={classes.title}>
          What should I plant <em>Now</em>?
        </Typography>
        <Search />
        {children}
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: "url(/static/backgroundFlowers.jpeg)",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  leafContainer: {
    position: "fixed",
  },
  leafImage: { width: "100%" },
  main: {
    minHeight: "100vh",
    paddingBottom: "20vh",
    transform: "translate(0)", //brings the main content to the front without z index
  },
  title: {
    padding: "50px 0",
    width: "66%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));
