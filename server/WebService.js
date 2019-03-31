const WebDAO = require('./WebDAO');

class WebService {

    loginAuth(loginInfo) {
        return new Promise((resolve, reject) => {
            var DAO = new WebDAO;
            DAO.getUserByUsername(loginInfo.username).then((result) => {
                if (result) {
                    if (loginInfo.password == result.password) {
                        return resolve(result);
                    }
                    return resolve(false);
                } else {
                    return resolve(false);
                }
            })
        })
    }
}

module.exports = WebService;