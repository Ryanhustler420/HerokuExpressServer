exports.CLIENT_PORT = 3000;
exports.SERVER_PORT = 8080; // using (/etc/nginx/sites-available/default) file's location block

exports.IMAGE_CONTAINER_SUBDIRECTORY = {
  DEV: 'dev',
  PROD: 'prod',
}

exports.static_indian_timezone = 'Asia/Kolkata';

exports.COROUTINE_COMMANDS = { REMOVE: { name: 'remove', cause: 'nothing' }, KEEP: { name: 'keep', cause: 'nothing' }, DO_NOTHING: { name: 'do_nothing', cause: 'nothing' } };

exports.cookie_keys = {
  appname_auth_token: 'appname_auth_token',
}

exports.header_keys = {
  ics_config: 'ics_config',
  ads_config: 'ads_config',
  appname_auth_token: 'appname_auth_token',
  appname_app_version: 'appname_app_version',
  appname_route_caller_appname: 'appname_route_caller_appname',
  appname_access_platform_names_array: 'appname_access_platform_names_array',
};

exports.middleware_strictness = {
  please_allow: 'please_allow', // we'll let them go further without checking for any condition, they are free to access the route, [Not Reccomanded]
  dont_allow: 'dont_allow', // we'll never allow anyone if the pass the middleware test, [Highly Reccomanded]
  spoof_them: 'spoof_them', // we'll send a dummy success no matter what, though we'll not perform any action to that route, just return them a happy message that everything is fine [Special Case, Like Some Routes Invoke From Background Thread]
}

exports.APP_NAMES = {
  CONTRIBUTOR: 'contributor',
  EMPLOYEE: 'employee',
  ADMIN: 'admin',
  SHOP: 'shop',
  END: 'end',
};

exports.PLATFORMS = {
  ANDROID: 'android',
  WINDOWS: 'windows',
  DESKTOP: 'desktop',
  OTHER: 'other',
  IOS: 'ios',
}

// Genders
exports.GENDERS = {
  ALL: 'All',
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

// Model Names
exports.tag = 'tag';
exports.user = 'user';
exports.stage = 'stage';
exports.country = 'country';
exports.currency = 'currency';
exports.category = 'category';
exports.secretKey = 'secretKey';
exports.notification = 'notification';

// Collection Names

// use as type but not present as independent collection
exports.collection_tag = 'tags';
exports.collection_notification = 'notifications';

// present in db as independent collections, mutable
exports.collection___init__ = '__init__';
exports.collection_user = 'users';
exports.collection_shop = 'shops';

// present in db as independent collection, immutable
exports.collection_stage = 'stages';
exports.collection_siUnit = 'si_units';
exports.collection_country = 'countries';
exports.collection_currency = 'currencies';
exports.collection_category = 'categories';