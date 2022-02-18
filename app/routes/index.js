const converterRoute = require('./converter');

module.exports = function(app){
    converterRoute(app);
}