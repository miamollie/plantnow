import useSWR from "swr";
import Plants from "../components/Plants";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

const SWR_KEY = "/api/graphql";

const fetchGeoIP = async () => {
  const query = new URLSearchParams({
    apiKey: process.env.NEXT_PUBLIC_GEOIP_API_KEY,
  }).toString();
  const URL = process.env.NEXT_PUBLIC_GEOIP_API + "?" + query;
  const res = await fetch(URL).catch((e) => {
    throw new Error(e);
  });

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
  //GEOIP fetcher must happen client side
  const [lat, long] = await fetchGeoIP();
  const res = await fetchPlantData({ lat, long });
  return res.data;
};

const fetchOptions = {
  revalidateOnFocus: false,
};

import useIsMounted from "../components/hooks/useIsMounted";

export default function Index() {
  const mounted = useIsMounted();
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
