const _ = require('lodash');
const mongoose = require('mongoose');
const {collection_notification, APP_NAMES} = require('./_Constants');

const image_containers = {
  image_container_appname: 'appname'
}

const N_REASON = {
  SEEN: 'SEEN',
  WISH: 'WISH',
  IDEA: 'IDEA',
  QUOTE: 'QUOTE',
  NOTIFY: 'NOTIFY',
  MOTIVATION: 'MOTIVATION'
}

const notificationSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  imageContainer: {
    minlength: 1,
    type: String,
    required: true,
    default: image_containers.image_container_appname,
    enum: _.values(image_containers),
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  appName: {
    type: String,
    required: true,
    trim: true,
    enum: _.values(APP_NAMES)
  },
  n_reason: {
    type: String,
    required: true,
    trim: true,
    enum: _.values(N_REASON)
  },
  senderId: {
    type: String,
    required: true,
    trim: true,
  },
  metaData: {
    type: mongoose.Schema.Types.Mixed
  }
}, {timestamps: true});

const Notification = mongoose.model(collection_notification, notificationSchema);
module.exports = {Notification, notificationSchema, N_REASON};