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

### Http->https API
Uses [this hack](https://docs.netlify.com/routing/redirects/rewrites-proxies/#proxy-to-another-service) to upgrade http apis to https by proxying through netlify as redirects. Required because the climate api in use has not published a HTTPS version

## todo

- material ui/ flip animation modals: https://material-ui.com/components/transitions/, https://material-ui.com/components/dialogs/
- proper error handling; needs lots of attention; this.didEncounterError(error)
- replace prod redirects with out-functions url from npm package https://github.com/netlify/next-on-netlify/issues/24


