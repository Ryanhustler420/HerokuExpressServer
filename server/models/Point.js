const mongoose = require('mongoose');

const GeoJSONTypes = {
  POINT: 'Point',
  POLYGON: 'Polygon',
  MULTIPOINT: 'MultiPoint',
  LINE_STRING: 'LineString',
  MULTI_POLYGON: 'MultiPolygon',
  MULTI_LINE_STRING: 'MultiLineString',
  GEOMETRY_COLLECTION: 'GeometryCollection',
};

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [GeoJSONTypes.POINT],
    default: GeoJSONTypes.POINT,
  },
  coordinates: {
    type: [Number], // lng, lat -> respect the order
    required: true,
  },
});

module.exports = {pointSchema, GeoJSONTypes};
