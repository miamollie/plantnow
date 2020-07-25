# Plant It Now

Uses GEOip lookup and the Climate zone API along with data from ABC gardens to determine what is best for you to plant in your garden right now :)

### GEOip lookup

Using free: http://ip-api.com/json

### Climate API

http://climateapi.scottpinkelman.com/
Takes a lat and long and returns a `koppen_geiger_zone`
http://climateapi.scottpinkelman.com/api/v1/location/40.8539645/14.1765625

### Graphql API

plant -> get a plant's data by name
climate -> all plants that can be planted in a climate zone by month

## todo
store climate zone as cookie or in localstorage so no need to requery
  data
- scrape zones again
- map abc zones to koppen geiger zones
  ui
- material ui/ flip animation modals
- proper error handling
- move some API to context of apollo server
- dataloader(if required..)
  deploy to netlify
  - move other api calls to apollo server and add in context


