const request = require('request').defaults({gzip: true, json: true});
const moment = require('moment');

function Model (koop) {}

Model.prototype.getData = function (req, callback) {
  const sevenDaysAgo = moment().subtract(14, 'days').format('YYYY-MM-DD');

  const apiUrl = `https://api.acleddata.com/acled/read?event_date=${sevenDaysAgo}&event_date_where=%3E=`;

  request(apiUrl, (err, res, body) => {
    if (err) {
      return callback(err);
    }

    const events = translate(res.body);
    // 2 days ttl
    events.ttl = 172800;
    events.metadata = {
      name: 'ACLED Live (past 14 days)',
      description: 'Events from the ACLED Live API'
    };

    callback(null, events);
  });
};

function translate (events) {
  const featureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  if (events.success && events.data) {
    featureCollection.features = events.data.map(formatFeature);
  }
  return featureCollection;
}

function formatFeature (event) {
  const feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(event.longitude),
        parseFloat(event.latitude)
      ]
    },
    properties: {
      data_id: event.data_id,
      gwno: event.gwno,
      event_id_cnty: event.event_id_cnty,
      event_id_no_cnty: event.event_id_no_cnty,
      event_date: moment(event.event_date).format('YYYY-MM-DD'),
      year: parseInt(event.year),
      time_precision: event.time_precision,
      event_type: event.event_type,
      actor1: event.actor1,
      ally_actor_1: event.ally_actor_1,
      inter1: event.inter1,
      actor2: event.actor2,
      ally_actor_2: event.ally_actor_2,
      inter2: event.inter2,
      interaction: event.interaction,
      country: event.country,
      admin1: event.admin1,
      admin2: event.admin2,
      admin3: event.admin3,
      location: event.location,
      latitude: parseFloat(event.latitude),
      longitude: parseFloat(event.longitude),
      geo_precision: event.geo_precision,
      source: event.source,
      notes: event.notes,
      fatalities: parseInt(event.fatalities),
      timestamp: event.timestamp
    }
  };

  return feature;
}

module.exports = Model;
