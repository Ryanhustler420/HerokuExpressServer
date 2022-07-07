/**
 * STRICT-WARNING: CHANGE OF STRUCTURE HERE, SHOULD ALSO CHANGE IN MODELS OF MOBILE APPS
 */

// Index Pattern
// .createIndex({email: 1}, {unique: true, background: true})

const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const luxon = require('luxon');
const jwt = require('jsonwebtoken');

require('mongoose-long')(mongoose);
const {
  user,
  GENDERS,
  collection_user,
  collection_shop,
} = require('./_Constants');

const image_containers = {
  image_container_appname: 'appname'
}

const {
  country: {COUNTRY},
} = require('../static data/supported_countries');

const actorsNames = {
  End: 0,
  Shop: 1,
  Repository: 2,
  Admin: 3,
  Employee: 4,
};

const SIGNED_IN_METHODS = {
  APPNAME: 'APPNAME',
  GOOGLE_OAUTH: 'GOOGLE_OAUTH',
}

const userSchema = new mongoose.Schema(
  {
    actor: {
      type: Number,
      required: true,
      enum: _.values(actorsNames),
      min: actorsNames.End,
      max: actorsNames.Admin,
    },
    address: {
      type: String,
      required: true,
      minlenght: 8,
      maxlength: 255,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      enum: _.values(COUNTRY),
      minlength: 3,
      maxlength: 255,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255,
      lowercase: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: _.values(GENDERS),
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
    name: {
      type: String,
      required: true,
      maxlenght: 100,
      minlength: 5,
      maxlength: 255,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    roles: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
      },
    },
    state: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlenght: 5,
      maxlength: 255,
    },
    tokens: [{appName: String, deviceUUID: String, token: String}],
    signedInVia: {
      method: {
        type: String,
        require: true,
        default: SIGNED_IN_METHODS.APPNAME,
        enum: _.values(SIGNED_IN_METHODS)
      },
      signupCompleted: {
        type: Boolean,
        default: true,
      },
    },
    signedInUserFrom: [
      {
        deviceUUID: String,
        deviceName: String,
        appName: String,
        loggedIn: Boolean,
        loggedOutAt: Date,
      },
    ],
    passwordResetToken: { type: String },
    passwordResetTokenExpiresAt: { type: Date }
  },
  {timestamps: true}
);

userSchema.pre('save', function (next) {
  var user = this; // holds the user doc while operation is happening...
  if (user.isModified('password')) {
    bcrypt.genSalt(parseInt(process.env.saltIterator), function (error, salt) {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else next();
});

userSchema.statics.findByToken = function (token, callBack) {
  jwt.verify(
    token,
    process.env.jwtPrivateKeyForPasswordHashing,
    function (error, decode) {
      if (error) return callBack(error);
      User.findOne({_id: decode})
        .select('email name roles tokens createdAt')
        .exec((error, user) => {
          if (_.isNull(user) || _.isUndefined(user)) {
            return callBack('User not found!');
          }
          const found = _.find(user.tokens, ['token', token]);
          if (error || !found) {
            return callBack(error);
          }
          callBack(null, user);
        });
    }
  );
};

userSchema.methods.generatePasswordResetToken = function (cb) {
  var user = this;
  crypto.randomBytes(20, function (error, buffer) {
    if (error) return cb(error);

    var token = buffer.toString('hex');
    user.passwordResetToken = token;

    const today = new luxon.DateTime(new Date()).toJSDate();
    const tommorow = new luxon.DateTime(today).plus({day: 1}).toJSDate();
    user.passwordResetTokenExpiresAt = tommorow;

    user.save(function (error, user) {
      if (error) {
        return cb(error);
      }
      cb(null, user);
    });
  });
};

userSchema.methods.comparePassword = async function (candidatePassword, callBack) {
  const matched = await require('../helper/validatorHelper').compareBcryptPassword(candidatePassword, this.password);
  callBack(null, matched);
};

userSchema.methods.generateToken = function (appName, deviceUUID, callBack) {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toHexString(),
      appName,
      deviceUUID,
    },
    process.env.jwtPrivateKeyForPasswordHashing
  );

  // check if the device already not present in array,
  const index = _.findIndex(user.tokens, ['deviceUUID', deviceUUID]);
  let o = {appName, deviceUUID, token};

  if (index == -1) {
    user.tokens.push(o);
  } else {
    user.tokens = _.filter(user.tokens, (_, idx) => idx != index);
    user.tokens.push(o);
  }

  user.save(function (error, user) {
    if (error) {
      return callBack(error);
    }
    callBack(null, user, o);
  });
};

const User = mongoose.model(collection_user, userSchema);
module.exports = {
  User,
  user,
  actorsNames,
  SIGNED_IN_METHODS,
  methods: {
    // ... for testing purpose or standalone use
  },
};
