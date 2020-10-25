import useSWR from "swr";
import Plants from "../components/Plants";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Head from "next/head";

const GQL_API = "/api/graphql";

const fetchPlantData = async () => {
  const query = `query { 
    climate { name, season, plants { name, imgUrl, botanicalName, hint, harvest } }
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, error, isValidating } = useSWR(
    mounted ? GQL_API : null,
    fetcher
  );

  if (error) {
    console.log(error); //TODO error page (dead plant?)
  }

  if (isValidating || !data) {
    return <Layout>Finding plants for you..</Layout>; //TODO SHOULD BE BEAUTIFUL SVG PLANT ILLUSTRATION
  }

  const { name, plants, season } = data.climate;

  return (
    <>
      <Head>
        <title>Plant it now!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Plants plants={plants} season={season} climate={name} />
      </Layout>
    </>
  );
}
