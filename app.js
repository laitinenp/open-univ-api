const
                            express = require('express'),
                            app = express(),
                            cors = require('cors')
                            swaggerUi = require('swagger-ui-express'),
                            YAML = require('yamljs'),
                            swaggerDocument = YAML.load('./open-univ.yaml')

var coursesRouter           = require('./routes/courses')
var usersRouter             = require('./routes/users')
var sessionsRouter             = require("./routes/sessions")
var servicesRouter          = require("./routes/services")

app.use(express.json())
app.use(cors())

app.use('/api/courses',     coursesRouter)
app.use('/api/users',       usersRouter)
app.use('/api/services',    servicesRouter)
app.use('/api/sessions',    sessionsRouter)

var swaggerOptions = { }
app.use('/api/doc',         swaggerUi.serve,
                            swaggerUi.setup(swaggerDocument, swaggerOptions))

module.exports = app;
