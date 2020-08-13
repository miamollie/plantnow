import useSWR from "swr";

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

  return (
    <main>
      <h1>{`We've detected you're in: ${name}`}</h1>
      <section>
        <div>
          {plants
            ? plants.map((p, i) => (
                <article key={i}>
                  {p.name}
                  <img src={p.imgUrl} role="presentational" alt="" />
                </article>
              ))
            : "no plants..."}
        </div>
      </section>
    </main>
  );
}
