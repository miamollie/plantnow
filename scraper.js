const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const baseUrl = "https://www.abc.net.au";
const zoneUrls = [
  "https://www.abc.net.au/gardening/arid-zone-months/10017912",
  "https://www.abc.net.au/gardening/tropical-months/10017962",
  "https://www.abc.net.au/gardening/subtropical-months/10017988",
  "https://www.abc.net.au/gardening/temperate-months/10018002",
  "https://www.abc.net.au/gardening/cool-months/10018040",
];

const getData = function () {
  const climateData = {};
  // const plantData = {};
  zoneUrls.forEach(async function (url) {
    let response = await axios(url).catch((e) => console.log(e));
    let html = response.data;
    let $ = cheerio.load(html);
    let climateZone = $("#main-content h1").text().trim();
    let months = $("#comp-rich-text7 p");
    if (!(climateZone in climateData)) {
      climateData[climateZone] = [];
    }

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

        let climatePlants = [];
        plants.each(async function () {
          let node = $(this).find("a");
          let name = node.text();
          if (name.length) {
            climatePlants.push(name);
          }
        });
        if (!(monthTag in climateData[climateZone])) {
          climateData[climateZone][monthTag] = climatePlants;
        }
      }
      console.log(climateData);
    });
  });
  // fs.writeFile("data.json", JSON.stringify(climateData), function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  // });
};

getData();

// fetch plant data
// let node = $(this).find("a");
// let plantUrl = node.attr("href");
// if (plantUrl && plantUrl.indexOf("coremedia") === -1) {
// let plantDataResp = await axios(
//   `${baseUrl}${plantUrl}`
// ).catch((e) => console.log(e));
// if (plantDataResp) {
//   let html = plantDataResp.data;
//   let $ = cheerio.load(html);
//   let name = $("[name*='commonname'] + p").text();
//   let botanicalName = $("[name*='botanicalname'] + p").text();
//   let hint = $("[name*='harvest'] + p").text();
//   let harvest = $("[name*='hints'] + p").text();
//   let imgUrl = $("figure img").attr("src");

//   climateData[climateZone][monthTag].push(name);

//   plant = {
//     name,
//     botanicalName,
//     hint,
//     harvest,
//     plantUrl,
//     imgUrl,
//   };
// if (!plantData[name]) {
//   plantData[name] = plant;
//   fs.writeFile(
//     "plants.json",
//     JSON.stringify(plantData),
//     function (err) {
//       if (err) {
//         return console.log(err);
//       }
//     }
//   );
//   }
// }
