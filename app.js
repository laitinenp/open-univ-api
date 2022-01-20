const
                            express = require('express'),
                            app = express(),
                            cors = require('cors')
                            swaggerUi = require('swagger-ui-express'),
                            YAML = require('yamljs'),
                            swaggerDocument = YAML.load('./open-univ.yaml')

var coursesRouter           = require('./routes/courses')
var usersRouter             = require('./routes/users')
var sessionsRouter          = require("./routes/sessions")
var servicesRouter          = require("./routes/services")

app.use(express.json())
app.use(cors())

app.use('/api/courses',     coursesRouter)
app.use('/api/users',       usersRouter)
app.use('/api/services',    servicesRouter)
app.use('/api/sessions',    sessionsRouter)

// serve swagger pages in /api/doc URI
var swaggerOptions = { }
app.use('/api/doc',         swaggerUi.serve,
                            swaggerUi.setup(swaggerDocument, swaggerOptions))

// serve yaml file in /api/yaml
app.use('/api/yaml',        express.static('./open-univ.yaml'))

module.exports = app;
