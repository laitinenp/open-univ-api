//AnotherMe:password,Me:MyPass,Radu:password,Jyri:1234,Petri:p3tri
const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const handleError = (err, response) => {
    response.status(404).json(err);
};

const prcessToken = (request) => {
    const auth = request.get("authorization");
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const token = auth.substring(7)
        const decodedToken = jwt.verify(token, "sosecret" /* process.env.SECRET */);
        
        if (!token || !decodedToken.id) {
            return false
        }
        return decodedToken.id
    } else {
        return false
    }
  }

router.post("/", async (request, response) => {
    // support only json at the moment
    const contype = request.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        return response.sendStatus(415)
    }

    request.body.password = await bcrypt.hash(request.body.password, 10);
    db.addUser(
        request.body,
        (err) => {
            response.sendStatus(401)
        },
        (status) => {
            db.getUser(
                status.userId,
                (err) => {
                    handleError(err, response);
                },
                (result) => {
                    response.status(201).json(result);
                }
            );
        }
    );
});

router.get("/:userId/cart", async (request, response) => {
    const userId = parseInt(request.params.userId)
    const decodedUserId = prcessToken(request)

    if (decodedUserId != userId) {
        response.sendStatus(401)
    }
    
    db.getUser(
        userId,
        (err) => {
            handleError(err, response);
        },
        (result) => {
            response.json(result.cart);
        }
    )
})

module.exports = router;
