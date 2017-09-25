const request = require('request').defaults({gzip: true, json: true});
const moment = require('moment');

function Model (koop) {}

Model.prototype.getData = function (req, callback) {

  const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD')

  const api_url = `https://api.acleddata.com/acled/read?event_date=${sevenDaysAgo}&event_date_where=%3E=`;

  request(api_url, (err, res, body) => {
    if (err) {
      return callback(err);
    }

    console.log(`returned with ${res.body.data.length} features`);

    const events = translate(res.body);
    events.ttl = 60;
    events.metadata = {
      name: 'acled events test',
      description: 'test description'
    };

    callback(null, events);

  });
}

function translate(events) {
  // const events = JSON.parse(data);

  const featureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  if (events.success && events.data) {
    featureCollection.features = events.data.map(formatFeature);
  }
  return featureCollection;
}


function formatFeature(event) {
  const feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [event.longitude, event.latitude]
    },
    properties: {
      data_id: event.data_id,
      gwno: event.gwno,
      event_id_cnty: event.event_id_cnty,
      event_id_no_cnty: event.event_id_no_cnty,
      event_date: event.event_date,
      year: event.year,
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
      latitude: event.latitude,
      longitude: event.longitude,
      geo_precision: event.geo_precision,
      source: event.source,
      notes: event.notes,
      fatalities: event.fatalities,
      timestamp: event.timestamp
    }
  };

  return feature;
}

module.exports = Model;
