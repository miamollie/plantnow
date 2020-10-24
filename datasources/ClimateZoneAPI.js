const { RESTDataSource } = require("apollo-datasource-rest");

class ClimateZoneAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.CLIMATE_API;
    this.climateZoneMap = {
      A: "TROPICAL ZONE",
      B: "ARID ZONE",
      C: "TEMPERATE ZONE",
      D: "COOL ZONE",
      E: "POLAR ZONE", //CURRENTLY NO DATA ON POLAR ZONE :(
    };
    this.seasons = {
      northern: ["Spring", "Summer", "Autumn", "Winter"],
      southern: ["Winter", "Spring", "Summer", "Autumn"],
    };
    this.monthMap = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
  }

  getSeasonIndex(m) {
    return Math.floor((m / 12) * 4) % 4;
  }

  getSeason(isNorthernHemisphere) {
    const month = new Date().getMonth();
    let seasonsArray;
    if (isNorthernHemisphere) {
      seasonsArray = this.seasons["northern"];
    } else {
      seasonsArray = this.seasons["southern"];
    }
    return seasonsArray[this.getSeasonIndex(month)];
  }

  async getClimate({ lat, long }) {
    const res = await this.get(`${lat}/${long}`).catch((e) => console.log(e));
    const zone = res.return_values[0].koppen_geiger_zone;
    const season = this.getSeason(lat > 0);

    const climateName = this.climateZoneMap[zone[0]];

    const month = this.monthMap[new Date().getMonth()];
    return { season, climateName, month };
  }
}

module.exports = ClimateZoneAPI;
