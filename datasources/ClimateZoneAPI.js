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
      northern: ["Winter", "Spring", "Summer", "Autumn"],
      southern: ["Summer", "Autumn", "Winter", "Spring"],
    };
  }

  getSeason(isNorthernHemisphere, date) {
    const month = date.getMonth();
    let seasonIndex;
    switch (month) {
      case 12:
      case 1:
      case 2:
        seasonIndex = 0;
        break;
      case 3:
      case 4:
      case 5:
        seasonIndex = 1;
        break;
      case 6:
      case 7:
      case 8:
        seasonIndex = 2;
        break;
      case 9:
      case 10:
      case 11:
        seasonIndex = 3;
        break;
    }
    return isNorthernHemisphere
      ? this.seasons["northern"][seasonIndex]
      : this.seasons["southern"][seasonIndex];
  }

  async getClimate({ lat, long }) {
    const res = await this.get(`${lat}/${long}`).catch((e) => console.log(e));
    const zone = res.return_values[0].koppen_geiger_zone;
    const date = new Date();

    const season = this.getSeason(lat > 0, date);

    const climateName = this.climateZoneMap[zone[0]];
    const month = date.toLocaleString("en-GB", { month: "long" });
    return { season, climateName, month };
  }
}

module.exports = ClimateZoneAPI;
