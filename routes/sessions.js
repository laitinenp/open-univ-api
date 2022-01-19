const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//require("dotenv").config();
const router = require("express").Router();

const handleError = (err, response, code = 404) => {
    response.status(code).json(err);
};

router.post("/", async (request, response) => {
    // support only json at the moment
    const contype = request.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        return response.sendStatus(415)
    }

    const username = request.body.username;
    const password = request.body.password;

    db.getUserByUsername(
        username,
        (err) => {
            response.sendStatus(401)
        },
        async (status) => {
            // TODO: ei tarvita kun käytetään oikeata tietokantaa. HUOM. korjaa tästä alaspäin copyt pois.
            statusCopy = { ...status }
            if (status.length == 0) {
                response.sendStatus(401)
            } else {
                if (await bcrypt.compare(password, status["password"])) {
                    const token = jwt.sign(
                        {
                            username: username,
                            id: status["userId"],
                        },
                        "sosecret" // TODO: laadi ympäristömuuttuja process.env.SECRET
                    );
                    delete statusCopy["password"];
                    statusCopy["token"] = token;
                    response.status(201).json(statusCopy);
                } else {
                    handleError({ err: "wrong password" }, response,401);
                }
            }
        }
    )
})

router.delete("/:id", async (request, response) => {
    response.status(501).send("Not implemented yet.")
})

module.exports = router
