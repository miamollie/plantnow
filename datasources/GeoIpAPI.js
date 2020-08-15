const { RESTDataSource } = require("apollo-datasource-rest");

class GeoIpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.CLIMATE_API;
  }

  async getGeoIP() {
    const data = await this.get().catch((e) => console.log(e));
    if (!data.status === "success") {
      throw new Error("No geoip.."); //TODO do something more sensible
    }
    return [data.lat, data.lon];
  }
}

module.exports = GeoIpAPI;
