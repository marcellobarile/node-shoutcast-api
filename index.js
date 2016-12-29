
'use strict'

const jsonParser = require('xml2json')
const request = require('request')

let keyUrl = 'https://www.shoutcast.com/Developer'
let apiUrl = 'http://api.shoutcast.com'
let tuneUrl = 'http://yp.shoutcast.com'

let self, getUrl, getResponse

class SHOUTcastAPI {
  
  constructor(apiKey, format='json') {
    if (typeof apiKey == 'undefined') throw new Error('An API Key is mandatory, please check ' + keyUrl + ' in order to obtain a valid key.')
    
    self = this

    this.BITRATE_8 = 8
    this.BITRATE_16 = 16
    this.BITRATE_32 = 32
    this.BITRATE_64 = 64
    this.BITRATE_96 = 96
    this.BITRATE_128 = 128

    this.MEDIATYPE_MP3 = 'audio/mpeg'
    this.MEDIATYPE_AAC = 'audio/aacp'

    this.apiKey = apiKey
    this.format = format

    getUrl = (entryPoint) => { 
        return apiUrl + '/' + entryPoint
    }
    getResponse = (entryPoint, data, onSuccess=console.log, onError=console.log) => {
        data.k = this.apiKey
        data.f = this.format

        if (data.limit && typeof data.limit.length != 'undefined') data.limit = data.limit.join(',')
        // Some entrypoints accepts X,Y where X is the offset and Y is the number of results to be returned 

        request.get(
            {
                url: getUrl(entryPoint),
                gzip: true,
                qs: data
            },
            function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    if (self.format == 'json' && (body[0] + body[1]) == '<?') {
                        // some entrypoints returns only XML response so we need to convert them
                        body = jsonParser.toJson(body)
                    }
                    let json = JSON.parse(body)
                    json = typeof json.response != 'undefined' ? json.response.data : json
                    onSuccess(json)
                } else {
                    onError(err)
                }
            }
        )
    }
  }

  getTop500Stations(opts) {
      getResponse(
          'legacy/Top500',
          {
              limit: opts.limit || 10,
              br: opts.bitRate || this.BITRATE_64,
              mt: opts.mediaType || this.MEDIATYPE_MP3
          },
          opts.success,
          opts.error
      )
  }
  getStationsByKeyword(opts) {
      if (typeof opts.search == 'undefined') throw new Error('Search parameter is mandatory.')

      getResponse(
          'legacy/stationsearch',
          {
              search: opts.search,
              limit: opts.limit || [0,10],
              br: opts.bitRate || this.BITRATE_64,
              mt: opts.mediaType || this.MEDIATYPE_MP3
          },
          opts.success,
          opts.error
      )
  }
  getStationsByGenre(opts) {
      if (typeof opts.genre == 'undefined') throw new Error('Genre parameter is mandatory.')

      getResponse(
          'legacy/genresearch',
          {
              genre: opts.genre,
              limit: opts.limit || [0,10],
              br: opts.bitRate || this.BITRATE_64,
              mt: opts.mediaType || this.MEDIATYPE_MP3
          },
          opts.success,
          opts.error
      )
  }
  getStationsByNowPlaying(opts) {
      if (typeof opts.query == 'undefined') throw new Error('Query parameter is mandatory.')
      else if (typeof opts.query.length != 'undefined') opts.query = opts.query.join('||')

      getResponse(
          'station/nowplaying',
          {
              ct: opts.query,
              genre: opts.genre || undefined,
              limit: opts.limit || 10,
              br: opts.bitRate || this.BITRATE_64,
              mt: opts.mediaType || this.MEDIATYPE_MP3
          },
          opts.success,
          opts.error
      )
  }
  getStationsByAdvancedSearch(opts) {
      if (typeof opts.bitRate == 'undefined') throw new Error('BitRate parameter is mandatory.')
      if (typeof opts.mediaType == 'undefined') throw new Error('MediaType parameter is mandatory.')
      if (typeof opts.genreId == 'undefined') throw new Error('Genre ID parameter is mandatory.')

      getResponse(
          'station/advancedsearch',
          {
              genreId: opts.genreId,
              genre: opts.genre || undefined,
              limit: opts.limit || 10,
              br: opts.bitRate,
              mt: opts.mediaType
          },
          opts.success,
          opts.error
      )
  }
  getRandomStations(opts) {
      getResponse(
          'station/randomstations',
          {
              genre: opts.genre,
              limit: opts.limit || 10,
              br: opts.bitRate || this.BITRATE_64,
              mt: opts.mediaType || this.MEDIATYPE_MP3
          },
          opts.success,
          opts.error
      )
  }
  getGenres(opts) {
      getResponse(
          'legacy/genrelist',
          {},
          opts.success,
          opts.error
      )
  }
  getPrimaryGenres(opts) {
      getResponse(
          'genre/primary',
          {},
          opts.success,
          opts.error
      )
  }
  _getSecondaryGenres(opts) {
      let data = {}

      if (typeof opts.parentId != 'undefined') {
          data = {
              parentid: opts.parentId
          }
      } else if (typeof opts.genreId != 'undefined') {
          data = {
              id: opts.genreId
          }
      } else if (typeof opts.hasChildren != 'undefined') {
          data = {
              haschildren: String(opts.hasChildren)
          }
      } else {
          throw new Error('Some mandatory parameter is missing.')
      }

      getResponse(
          'genre/secondary',
          data,
          opts.success,
          opts.error
      )
  }
  getGenreByParentId(opts) {
      if (typeof opts.parentId == 'undefined') throw new Error('Parent ID parameter is mandatory.')
      this._getSecondaryGenres(opts)
  }
  getGenreById(opts) {
      if (typeof opts.genreId == 'undefined') throw new Error('Genre ID parameter is mandatory.')
      this._getSecondaryGenres(opts)
  }
  getGenresByChildrenFlag(opts) {
      if(typeof opts.hasChildren == 'undefined') opts.hasChildren = true
      this._getSecondaryGenres(opts)
  }
  getPlaylistUrlByStationId(base, stationId) {
    return tuneUrl + base + '?id=' + stationId
  }

}

module.exports = SHOUTcastAPI