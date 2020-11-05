const { RESTDataSource } = require("apollo-datasource-rest");

class GeoIpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://freegeoip.app/json/";
  }

  async getGeoIP() {
    const data = await this.get("/").catch((e) => console.log(e));
    if (!data.status === "success") {
      throw new Error("No geoip.."); //TODO Handle errors
    }
    return { lat: data.latitude, long: data.longitude };
  }
}

module.exports = GeoIpAPI;
