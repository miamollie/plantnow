import useSWR from "swr";
import Plants from "../components/Plants";
import Layout from "../components/Layout";
import LoadingPlant from "../components/LoadingPlant";
import { useState, useEffect } from "react";

const SWR_KEY = "/api/graphql";

const fetchPlantData = async () => {
  const query = `query { 
    climate { name, season, plants { name, imgUrl, botanicalName, hint, harvest } }
  }`;

  const res = await fetch(SWR_KEY, {
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

const fetchOptions = {
  revalidateOnFocus: false,
};

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, error, isValidating } = useSWR(
    mounted ? SWR_KEY : null,
    fetcher,
    fetchOptions
  );

  if (isValidating || !data) {
    return (
      <Layout>
        <LoadingPlant />
      </Layout>
    );
  }

  if (error) {
    console.log(error); //TODO error page (dead plant?)
  }

  const { name, plants, season } = data.climate;

  return (
    <Layout>
      <Plants plants={plants} season={season} climate={name} />
    </Layout>
  );
}
