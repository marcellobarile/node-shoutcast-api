# node-shoutcast-api

This package implements the SHOUTcast Radio Directory API in Node.js
You can check the official API documentation here: http://wiki.shoutcast.com/wiki/SHOUTcast_Radio_Directory_API or ask to be granted access here: https://www.shoutcast.com/Developer

If you want to see how the Node.js API actually works just check this file: https://github.com/marcellobarile/node-shoutcast-api/blob/master/examples/all_entrypoints.js

A small example:
```javascript
let ShoutcastAPI = require('node-shoutcast-api')
let api = new ShoutcastAPI(your_api_key, 'json')

api.getStationsByGenre({
    limit: [1,2],
    genre: 'metal',
    success: function(res) {
        console.log('--------')
        console.log(' By genre')
        console.log('--------')
        console.log(JSON.stringify(res))
        
        for (let i=0,len=res.stationlist.station.length; i<len; i++) {
            let playlist = api.getPlaylistUrlByStationId(res.stationlist.tunein.base, res.stationlist.station[i].id)
            console.log(playlist)
        }
    },
    error: function(err) {
        console.log(err)
    }
})
```

Pretty easy. Enjoy :-)
