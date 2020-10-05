import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function Layout({ children }) {
  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom align="center">
        What should I plant now?
      </Typography>
      {children}
    </Container>
  );
}
