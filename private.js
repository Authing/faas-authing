var getRawBody = require('raw-body')
const jwt = require('jsonwebtoken')

const resp = (response, respBody, code) => {
    response.setStatusCode(code || 200);
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify(respBody, null, 4));
}

module.exports.handler = function (request, response, context) {    
    getRawBody(request, function (err, body) {

        if(!request.headers.authorization) {
            resp(response, {
                message: '无权限访问'
            }, 400)
        }
        
        // remove "bearer " from token
        const token = request.headers.authorization.substring(7)

        try {
            let decoded = jwt.verify(token, 'YOUR_OIDC_SECRET'),
              expired = (Date.parse(new Date()) / 1000) > decoded.exp
            if (expired) {
                resp(response, '无权限访问，登录信息已过期', 400);
            }else {
              resp(response, {
                message: '这是受保护的 API 资源，只有登录的用户能看到这段文字'
              });
            }
        } catch (error) {
            resp(response, '无权限访问', 400);
        }
    });
};