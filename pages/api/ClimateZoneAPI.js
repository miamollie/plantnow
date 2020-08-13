const { RESTDataSource } = require("apollo-datasource-rest");

class ClimateZoneAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://climateapi.scottpinkelman.com/api/v1/location/";
  }

  async getClimate({ lat, long }) {
    const res = await this.get(`${lat}/${long}`).catch((e) => console.log(e));
    return res.return_values[0].koppen_geiger_zone;
  }
}

module.exports = ClimateZoneAPI;
