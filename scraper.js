const axios = require("axios");
const cheerio = require("cheerio");

const baseUrl = "https://www.abc.net.au";
const zoneUrls = [
  "https://www.abc.net.au/gardening/arid-zone-months/10017912",
  "https://www.abc.net.au/gardening/tropical-months/10017962",
  "https://www.abc.net.au/gardening/subtropical-months/10017988",
  "https://www.abc.net.au/gardening/temperate-months/10018002",
  "https://www.abc.net.au/gardening/cool-months/10018040",
];

const getData = async function () {
  const climateData = {};
  const plantData = {};
  zoneUrls.forEach(async function (url) {
    // Get the post data
    let response = await axios(url).catch((e) => console.log(e));
    let html = response.data;
    let $ = cheerio.load(html);
    let climateZone = $("#main-content h1").text().trim();
    climateData[climateZone] = [];
    let months = $("#comp-rich-text7 p");

    months.each(async function () {
      let node = $(this).find("a");
      let monthTag = node.text();
      let monthUrl = node.attr("href");
      if (!!monthTag && !!monthUrl) {
        let plantsResp = await axios(`${baseUrl}/${monthUrl}`).catch((e) =>
          console.log(e)
        );
        let html = plantsResp.data;
        let $ = cheerio.load(html);
        let plants = $("#comp-rich-text5 p");
        climateData[climateZone][monthTag] = [];
        plants.each(async function () {
          let node = $(this).find("a");
          let plantUrl = node.attr("href");
          if (plantUrl && plantUrl.indexOf("coremedia") === -1) {
            let plantDataResp = await axios(
              `${baseUrl}${plantUrl}`
            ).catch((e) => console.log(e));
            let html = plantDataResp.data;
            let $ = cheerio.load(html);
            let name = $("[name*='commonname'] + p").text();
            let botanicalName = $("[name*='botanicalname'] + p").text();
            let hint = $("[name*='harvest'] + p").text();
            let harvest = $("[name*='hints'] + p").text();
            climateData[climateZone][monthTag].push(name);
            plant = {
              name,
              botanicalName,
              hint,
              harvest,
              plantUrl,
            };
            if (!plantData[name]) {
              plantData[name] = plant;
              console.log(plantData);
            }
          }
        });
      }
    });
  });
  return [climateData, plantData];
};

const scrapeData = async function () {
  const d = await getData().catch((e) => console.log(e));
  console.log(d);
};

scrapeData();
