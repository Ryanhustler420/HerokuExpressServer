// Check if all the old version of application will be afected or not if server goes first and the
// Client goes second to the production enviornoment

// If server code has modified then you have to mention the latest version of application which will access the updated code

// changed something on server, not on android then leave these as it is,
// changed something on apps and server, please mention the latest version of apps release

// older app has version code "14" and new app update is on play store which is code "15",
// all those which has 14 will get a update request, else they will carry on,

// When apps and server both modifies then first upload the apps on playstore and when the become available then release the server code
// what if a version has some error, we do rollback, now we need to dcresee the value here as well and all the changes should be reverted
// well the server code can be rollback and apps can also roll back,
// when android has error, first rollback the apps on playstore and then rollback the server
// when server has error, first rollback the server

const versions = {
    chai_testBot: { latest: 0 },

    // When to change these, (these values will make sure that the user with latest update should not access the old server code), (Application constant.java has these values)
    // If user has downloaded/updated the latest version of application (client) on their devide, but that version required latest release of server in order to work properly

    // NOTE: Here user will have to wait for latest server release
    server_env : { latest: 4 },
    server_end : { latest: 3 },
    server_shop : { latest: 8 },
    server_admin : { latest: 1 },
    server_employee : { latest: 1 },

    // When to change these, (Application client build.app has these values)
    // If added new routes on client side
    // If added something which is only possible with latest server release or client won't work if server is old
    
    // NOTE: Here user will have to download/update the application to the latest release in order to match with latest server release
    android_env: { latest: 40 },
    android_end: { latest: 42 },
    android_shop: { latest: 52 },
    android_admin: { latest: 1 },
    android_employee: { latest: 1 },

    windows_electron_env: { latest: 7 },
    windows_electron_end: { latest: 0 },
    windows_electron_shop: { latest: 1 },
    windows_electron_admin: { latest: 0 },
    windows_electron_employee: { latest: 0 },
}

function increaseAndroidEnvVersion (by = 1) {
    versions.android_env.latest = versions.android_env.latest + by;
}
function increaseAndroidEndVersion (by = 1) {
    versions.android_end.latest = versions.android_end.latest + by;
}
function increaseAndroidShopVersion (by = 1) {
    versions.android_shop.latest = versions.android_shop.latest + by;
}

function decreaseAndroidEnvVersion (by = 1) {
    versions.android_env.latest = versions.android_env.latest - Math.max(by, 0);
}
function decreaseAndroidEndVersion (by = 1) {
    versions.android_end.latest = versions.android_end.latest - Math.max(by, 0);
}
function decreaseAndroidShopVersion (by = 1) {
    versions.android_shop.latest = versions.android_shop.latest - Math.max(by, 0);
}

module.exports = { 
    versions, 

    increaseAndroidEnvVersion,
    increaseAndroidEndVersion,
    increaseAndroidShopVersion,

    decreaseAndroidEnvVersion,
    decreaseAndroidEndVersion,
    decreaseAndroidShopVersion,
};