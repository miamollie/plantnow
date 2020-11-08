import useSWR from "swr";
import Plants from "../components/Plants";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";

const SWR_KEY = "/api/graphql";
const GEOIP_API = "https://freegeoip.app/json/"; //todo move to env

const fetchGeoIP = async () => {
  const res = await fetch(GEOIP_API);
  const data = await res.json().catch((e) => {
    throw new Error(e); //todo add error boundary
  });
  if (!data.status === "success") {
    throw new Error(e); //todo add error boundary
  }
  return [data.latitude, data.longitude];
};

const fetchPlantData = async ({ lat, long }) => {
  const query = `query { 
    climate(lat: "${lat}" , long: "${long}") { name, season, plants { name, imgUrl, botanicalName, hint, harvest } }
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
  const [lat, long] = await fetchGeoIP();
  const res = await fetchPlantData({ lat, long });
  return res.data;
};

const fetchOptions = {
  revalidateOnFocus: false,
};

export default function Index() {
  const [mounted, setMounted] = useState(false); //todo move to hook

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
        <Loader />
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
