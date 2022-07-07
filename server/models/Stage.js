const _ = require('lodash');
const mongoose = require('mongoose');

const {collection_stage} = require('./_Constants');
const image_containers = {
  image_container_appname: 'appname'
}

const stageSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    thumbnailUrl: {
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
    productImages: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'A product should have atleast 1 image',
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5000,
    },
    productPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    url: {
      type: String,
      required: true,
    }
  },
  {timestamps: true}
);

const Stage = mongoose.model(collection_stage, stageSchema);
module.exports = {Stage, stageSchema};
