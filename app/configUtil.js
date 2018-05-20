module.exports = {
    get : function(app, isGlobal, configKey) {
        var config = app.get('config');
        var propertyVal = null;
        if(!isGlobal) {
            var env = app.get('env');
            propertyVal = config.get(env + ':' + configKey);
        } else {
            propertyVal = config.get(configKey);
        }
        return propertyVal;
    }
};