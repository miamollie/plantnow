import useSWR from "swr";


const fetchPlantData = async ({ climateZone, month }) => {
  const query = `{ climate($name: ${climateZone}, $month: ${month}) { name, plants { name } } }`;
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).catch((e) => {
    throw new Error(e);
  });

  const data = await res.json();
  console.log(data);
  return data;
};

const fetchGeoIP = async () => {
  const res = await fetch("http://ip-api.com/json");
  const data = await res.json().catch((e) => {
    throw new Error(e); //todo add error boundary
  });
  if (!data.status === "success") {
    throw new Error(e); //todo add error boundary
  }
  return [data.lat, data.lon];
};

const fetchClimatZone = async ({ lat, long }) => {
  const res = await fetch(
    `http://climateapi.scottpinkelman.com/api/v1/location/${lat}/${long}`
  );
  const data = await res.json().catch((e) => {
    throw new Error(e); //todo add error boundary
  });
  console.log(data);
  return data.return_values[0].koppen_geiger_zone;
};

const fetcher = async () => {
  const month = new Date(Date.now()).getMonth();
  const [lat, long] = await fetchGeoIP();
  // todo but these api in the apolloserver context
  const zone = await fetchClimatZone({ lat, long });
  const plants = await fetchPlantData({ zone, month });
  return plants;
};

export default function Index() {
  const { data, error, isValidating } = useSWR("a", fetcher); //todo what key...?

  if (error) {
    console.log(error);
  }

  if (isValidating || !data) {
    return "loading...";
  }

  const { zone, plants } = data;

  return (
    <div>
      <h1>{`We've detected you're in: ${zone}`}</h1>
      <section>
        <div>
          {plants
            ? plants.map((p, i) => <div key={i}>{p.name}</div>)
            : "no plants now"}
        </div>
      </section>
    </div>
  );
}

// export default function Index() {
//   const { data, error } = useSWR("{ plants { name } }", fetcher);

//   if (error) return <div>Failed to load</div>;
//   if (!data) return <div>Loading...</div>;

//   const { plants } = data;

//   return (
//     <div>
//       {plants.map((p, i) => (
//         <div key={i}>{p.name}</div>
//       ))}
//     </div>
//   );
// }

// http://climateapi.scottpinkelman.com/api/v1/location/40.8539645/14.1765625
