import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.main} component="main" maxWidth="md">
        <Typography variant="h1" component="h1" className={classes.title}>
          What should I plant <em>Now</em>?
        </Typography>
        {children}
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: "url(/static/backgroundFlowers.png)",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  main: {
    minHeight: "100vh",
  },
  title: {
    padding: "50px 0",
    width: "66%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));
