var getRawBody = require('raw-body')

module.exports.handler = function (request, response, context) {    
    // get request body
    getRawBody(request, function (err, body) {
        var respBody = {
            message: '这是公开的 API 资源，任何人都可以访问'
        };
        
        response.setStatusCode(200);
        response.setHeader('content-type', 'application/json');
        response.send(JSON.stringify(respBody, null, 4));
    });
};