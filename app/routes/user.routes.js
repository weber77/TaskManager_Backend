const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post(
    "/api/invitation",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.invitationRequest
  );

  app.get(
    "/api/getUser/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOne
  );

  app.put(
    "/api/test/requestResponse/",
    [authJwt.verifyToken, authJwt.verifyToken],
    controller.invitationResponse
  );

  

};