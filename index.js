'use strict';

module.exports.title = 'Regex Router';
module.exports.init = function(app, done) {

    // precompiled regex
    let precompiledRegex = [];

    let precompileRegex = () => {
        let regexConfig = app.config.regex;
        for (let regKey in regexConfig) {
            precompiledRegex.push({
                regexp: new RegExp(regKey),
                sendingZone: regexConfig[regKey].sendingZone
            });
        }
    };
    precompileRegex();

    // message is about to be stored to queue, change routing based on regex
    app.addHook('queue:route', (envelope, routing, next) => {
        if (precompiledRegex.length > 0) {
            for (let pRegex of precompiledRegex) {
                if (pRegex.regexp.test(envelope.parsedEnvelope.from)) {
                    routing.sendingZone = pRegex.sendingZone;
                }
            }
        }

        // finished hook
        next();
    });

    // Plugin init finished
    done();
};