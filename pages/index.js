import useSWR from "swr";
import Typography from "@material-ui/core/Typography";
import PlantDetail from "../components/PlantDetail";
import Layout from "../components/Layout";
import Box from "@material-ui/core/Box";

const GQL_API = "/api/graphql";

const fetchPlantData = async () => {
  const query = `query { 
    climate { name, plants { name, imgUrl, botanicalName, hint, harvest } }
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
  //todo definitely needs caching
  return res.data;
};

export default function Index() {
  const { data, error, isValidating } = useSWR(GQL_API, fetcher);

  if (error) {
    console.log(error);
  }

  if (isValidating || !data) {
    return <Layout>Finding plants for you..</Layout>; //TODO SHOULD BE BEAUTIFUL SVG PLANT ILLUSTRATION
  }

  const { name, plants } = data.climate;
  const season = "spring"; //todo dynamic

  return (
    <Layout>
      {/* move to a plants component using grid, use grow and a slight animation delay as the results appear */}
      <Typography variant="p" component="p" gutterBottom>
        {`Looks like it's ${season} and you're in the ${name.toLowerCase()}, here are some things
        you could plant now:`}
      </Typography>
      <Box component="section" style={{ display: "grid" }}>
        {plants
          ? plants.map((p) => <PlantDetail plant={p} key={p.name} />)
          : "Sorry, we couldn't find any plants for you this time"}
      </Box>
    </Layout>
  );
}
