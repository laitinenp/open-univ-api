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

/* GET list of courses */
router.get('/', (request, response) => {
  db.getAllCourses(
    (err) => {
        handleError(err, response);
    },
    (courses) => {
        response.json(courses);
    }
  )
})

/* GET a course by id */
router.get('/:id', (request, response) => {
  const id = request.params.id
  db.getCourse(
    id,
    (err) => {
        handleError(err, response);
    },
    (courses) => {
        response.json(courses);
    }
  )
})

module.exports = router;
