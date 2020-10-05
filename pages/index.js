import useSWR from "swr";
import Plants from "../components/Plants";
import Layout from "../components/Layout";

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

  if (isValidating) {
    return <Layout>Finding plants for you..</Layout>; //TODO SHOULD BE BEAUTIFUL SVG PLANT ILLUSTRATION
  }

  if (!data) {
    return <Layout>problem</Layout>; //TODO
  }

  const { name, plants } = data.climate;
  const season = "spring"; //todo get from resolver

  return (
    <Layout>
      <Plants plants={plants} season={season} climate={name} />
    </Layout>
  );
}
