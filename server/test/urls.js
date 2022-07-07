// Routes Paths
exports.POST_INDEXING_USERS = `/sandbox/v1/api/helper/indexing/users`;
exports.POST_INDEXING_SHOPS = `/sandbox/v1/api/helper/indexing/shops`;
exports.POST_CURRENCIES_ALL = `/sandbox/v1/api/helper/currencies/all`;
exports.POST_CATEGORIES_ALL = `/sandbox/v1/api/helper/categories/all`;
exports.POST_SECRETKEYS_ALL = `/sandbox/v1/api/helper/secretKeys/all`;
exports.POST_COUNTRIES_ALL = `/sandbox/v1/api/helper/countries/all`;
exports.POST_COUNTERS_ALL = `/sandbox/v1/api/helper/counters/all`;
exports.POST_SIUNITS_ALL = `/sandbox/v1/api/helper/siUnits/all`;

exports.GET_HOME = `/sandbox/v1`;
exports.GET_INIT = `/sandbox/v1/__init__`;
exports.GET_API_BLOCK_PASSWORD = `/sandbox/v1/api/block/:password`;
exports.GET_API_UNBLOCK_PASSWORD = `/sandbox/v1/api/unblock/:password`;
exports.GET_ADS_BLOCK_PLATFORM_APPNAME_PASSWORD = `/sandbox/v1/ads/block/:platform/:appname/:password`;
exports.GET_ADS_UNBLOCK_PLATFORM_APPNAME_PASSWORD = `/sandbox/v1/ads/unblock/:platform/:appname/:password`;
exports.GET_ICS_CONFIG_CHANGE_PLATFORM_APPNAME_IMAGE_CONTAINER_PASSWORD = `/sandbox/v1/ic_config/change/:platform/:appname/:image_container/:password`;