let ShoutcastAPI = require('../')
let api = new ShoutcastAPI(process.argv[2], 'json')

api.getTop500Stations({
    limit: 5,
    bitRate: api.BITRATE_32,
    mediaType: api.MEDIATYPE_AAC,
    success: function(res) {
        console.log('--------')
        console.log(' Top 500')
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

api.getStationsByKeyword({
    limit: 2,
    search: 'hip hop',
    success: function(res) {
        console.log('--------')
        console.log(' By keyword')
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

api.getStationsByNowPlaying({
    limit: 2,
    query: ['madonna', 'u2'],
    success: function(res) {
        console.log('--------')
        console.log(' By now playing')
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

api.getStationsByAdvancedSearch({
    limit: 1,
    genreId: 1,
    bitRate: api.BITRATE_128,
    mediaType: api.MEDIATYPE_MP3,
    success: function(res) {
        console.log('--------')
        console.log(' Advanced research')
        console.log('--------')
        console.log(JSON.stringify(res))
        
        let playlist = api.getPlaylistUrlByStationId(res.stationlist.tunein.base, res.stationlist.station.id)
        console.log(playlist)
    },
    error: function(err) {
        console.log(err)
    }
})

api.getRandomStations({
    limit: 2,
    genre: 'country',
    success: function(res) {
        console.log('--------')
        console.log(' Random stations by genre')
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

api.getGenres({
    success: function(res) {
        console.log('--------')
        console.log(' All genres')
        console.log('--------')
        console.log(JSON.stringify(res))
    },
    error: function(err) {
        console.log(err)
    }
})

api.getPrimaryGenres({
    success: function(res) {
        console.log('--------')
        console.log(' Primary genres')
        console.log('--------')
        console.log(JSON.stringify(res))
    },
    error: function(err) {
        console.log(err)
    }
})

api.getGenreById({
    genreId: 1,
    success: function(res) {
        console.log('--------')
        console.log(' Genre by ID')
        console.log('--------')
        console.log(JSON.stringify(res))
    },
    error: function(err) {
        console.log(err)
    }
})

api.getGenreByParentId({
    parentId: 0,
    success: function(res) {
        console.log('--------')
        console.log(' Genre by parent ID')
        console.log('--------')
        console.log(JSON.stringify(res))
    },
    error: function(err) {
        console.log(err)
    }
})

api.getGenresByChildrenFlag({
    success: function(res) {
        console.log('--------')
        console.log(' Genres that has children')
        console.log('--------')
        console.log(JSON.stringify(res))
    },
    error: function(err) {
        console.log(err)
    }
})

api.getGenresByChildrenFlag({
    hasChildren: false,
    success: function(res) {
        console.log('--------')
        console.log(' Genres that has no children')
        console.log('--------')
        console.log(JSON.stringify(res))
    },
    error: function(err) {
        console.log(err)
    }
})
