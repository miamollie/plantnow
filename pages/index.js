import useSWR from "swr";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const GQL_API = "/api/graphql";

const fetchPlantData = async () => {
  const query = `query { 
    climate { name, plants { name, imgUrl } }
  }`;

  const res = await fetch(GQL_API, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).catch((e) => {
    throw new Error(e);
  });

  const data = await res.json();
  return data;
};

const fetcher = async () => {
  const res = await fetchPlantData();
  return res.data;
};

export default function Index() {
  const { data, error, isValidating } = useSWR(GQL_API, fetcher);

  if (error) {
    console.log(error);
  }

  if (isValidating || !data) {
    return "Finding your plants..."; //TODO SHOULD BE BEAUTIFUL SVG PLANT ILLUSTRATION
  }

  const { name, plants } = data.climate;
  const season = "spring"; //todo dynamic

  //TODO split out a layout component
  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom align="center">
        What should I plant now?
      </Typography>
      <Typography variant="p" component="p" gutterBottom>
        {`Looks like it's ${season} time and your're in the ${name.toLowerCase()}, here are some things
        you could plant now:`}
      </Typography>
      <section>
        {plants
          ? plants.map((p, i) => (
              <Box component="article" key={i}>
                {p.name}
                <img src={p.imgUrl} role="presentational" alt="" />
              </Box>
            ))
          : "Sorry, we couldn't find any plants for you this time"}
      </section>
    </Container>
  );
}
