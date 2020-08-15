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

- material ui/ flip animation modals: https://material-ui.com/components/transitions/, https://material-ui.com/components/dialogs/
- proper error handling; needs lots of attention; this.didEncounterError(error)
- use netlify __redirects file to upgrade http to https
- add urls as env variables, diff in dev and prod, next will extract during build
- change build command type, cant be export https://nextjs.org/docs/advanced-features/static-html-export

https://docs.netlify.com/routing/redirects/rewrites-proxies/#proxy-to-another-service
https://community.netlify.com/t/support-guide-making-redirects-work-for-you-troubleshooting-and-debugging/13433
