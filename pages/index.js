import useSWR from "swr";

const GEO_API = "http://ip-api.com/json";
const CLIMATE_API = "http://climateapi.scottpinkelman.com/api/v1/location/";
const GQL_API = "/api/graphql";

const fetchPlantData = async ({ zone, month }) => {
  const query = `query { 
    climate(
      name: "${zone}"
      month: ${month}
    )
       { name, plants { name, imgUrl } }
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

const fetchGeoIP = async () => {
  const res = await fetch(GEO_API);
  const data = await res.json().catch((e) => {
    throw new Error(e); //todo add error boundary
  });
  if (!data.status === "success") {
    throw new Error(e); //todo add error boundary
  }
  return [data.lat, data.lon];
};

const fetchClimateZone = async ({ lat, long }) => {
  const res = await fetch(`${CLIMATE_API}${lat}/${long}`);
  const data = await res.json();
  return data.return_values[0].koppen_geiger_zone;
};

const fetcher = async () => {
  const month = new Date(Date.now()).getMonth();
  const [lat, long] = await fetchGeoIP();
  const zone = await fetchClimateZone({ lat, long });
  const res = await fetchPlantData({ zone, month });
  return res.data;
};

export default function Index() {
  const { data, error, isValidating } = useSWR(
    GEO_API + CLIMATE_API + GQL_API,
    fetcher
  );

  if (error) {
    console.log(error);
  }

  if (isValidating || !data) {
    return "Finding your plants..."; //TODO SHOULD BE BEAUTIFUL SVG PLANT ILLUSTRATION
  }

  const { name, plants } = data.climate;

  return (
    <div>
      <h1>{`We've detected you're in: ${name}`}</h1>
      <section>
        <div>
          {plants
            ? plants.map((p, i) => (
                <div key={i}>
                  {p.name}
                  <img src={p.imgUrl} role="presentational" alt="" />
                </div>
              ))
            : "no plants..."}
        </div>
      </section>
    </div>
  );
}
