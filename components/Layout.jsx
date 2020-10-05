import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom align="center">
        What should I plant now?
      </Typography>
      {children}
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
