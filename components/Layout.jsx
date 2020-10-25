import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <Container className={classes.main} component="main" maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom align="center">
        What should I plant now?
      </Typography>
      {children}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: "100vh",
    backgroundColor: theme.palette.tertiary.main,
  },
}));
