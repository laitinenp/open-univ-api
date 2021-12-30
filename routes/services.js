var db = require('../db.js')
var router = require('express').Router()

const handleError = (err, response) => {
  response.status(404).json(err);
}

const prcessToken = (request) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.substring(7)
      const decodedToken = jwt.verify(token, process.env.SECRET);
      
      if (!token || !decodedToken.id) {
          return false
      }
      return decodedToken.id
  } else {
      return false
  }
}

/* GET list of services */
router.get('/', (request, response) => {
  db.getAllServices(
    (err) => {
        handleError(err, response)
    },
    (services) => {
        response.json(services)
    }
  )
})

/* GET a service by id */
router.get('/:id', (request, response) => {
  const id = request.params.id
  db.getService(
    id,
    (err) => {
        handleError(err, response)
    },
    (service) => {
        let resp = { ...service }   // make a clone object
        resp._links = {
            "self": {
              "href": "http://localhost:3000/api/services"
            }
          },
        resp._embedded = {
            "course": {
              "_links": {
                "self": {
                  "href": "http://localhost:3000/api/courses/" + service.course.id
                }
              }
            }
          }
        response.json(resp)
    }
  )
})

module.exports = router;
