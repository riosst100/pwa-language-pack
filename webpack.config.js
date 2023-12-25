const { configureWebpack, graphQL } = require('@magento/pwa-buildpack');
const webpack = require('webpack');
const {
    getAvailableWebsitesConfigData
} = graphQL;

const { DefinePlugin } = webpack;

module.exports = async () => {
    const config = await configureWebpack();

    const { availableStoresByUserIp } = await getAvailableWebsitesConfigData();
    global.AVAILABLE_WEBSITES = availableStoresByUserIp;

    config.plugins.push(new DefinePlugin({
        AVAILABLE_WEBSITES: JSON.stringify(availableStoresByUserIp)
    }));

    return config;
};
