// simulate relational database extremely simply

const { response } = require("./app")

/*
      example:
        id: 123
        forename: Brita
        surname: Lollobrigida
        username: brita
        password: sosecret
        email: brita@somemail.com
        */
var _customers = [
    {
        "id": 123,
        "forename": "Brita",
        "surname": "Lollobrigida",
        "username": "brita",
        "password": "sosecret",
        "email": "brita@somemail.com"
    }
]

/*       example:
        id: DD10004
        name: API Design & Development
        description: API Design & Development using REST, GraphQL and Open API
        learningObjectives: >
          Student knows the most common API technologies in use today
          Student is able to comprehend the opportunities and challenges in exploiting API's in businesses
          Student is able to design, document and implement REST APIs
          Student is able to design, document and implement GraphQL APIs
          Student is is able to apply OpenAPI Specification in describing and designing APIs
*/
var _courses = [
    {
        "id": "DD10004",
        "name": "API Design & Development",
        "description": "API Design & Development using REST, GraphQL and Open API",
        "learningObjectives": "Student knows the most common API technologies in use today\nStudent is able to comprehend the opportunities and challenges in exploiting API's in businesses\nStudent is able to design, document and implement REST APIs\nStudent is able to design, document and implement GraphQL APIs\nStudent is is able to apply OpenAPI Specification in describing and designing APIs"
    },
    {
        "id": "DD10005",
        "name": "Advanced Databases",
        "description": "Advanced Databases and Management",
        "learningObjectives": "Student knows the most common API technologies in use today\nStudent is able to comprehend the opportunities and challenges in exploiting API's in businesses\nStudent is able to design, document and implement REST APIs\nStudent is able to design, document and implement GraphQL APIs\nStudent is is able to apply OpenAPI Specification in describing and designing APIs"
    }
]

var _services = [
    {
        "id": "DD10004-3001",
        "name": "Api Design & Development, spring 2022",
        "startDate": "c",
        "endDate": "c",
        "course": _courses[0]
    }
]

const getAllCustomers = (onError, onSuccess) => {
    onSuccess(_customers)
}

const getCustomer = (id, onError, onSuccess) => {
    let done = false
    for ( let i = 0; i < _customers.length; i++ ) {
        if ( _customers[i].username === id ) {
            done = true
            onSuccess( _customers[ i ] )
        }
    }
    if (! done)
        onError("Course item not found")       
}

const getAllCourses = (onError, onSuccess) => {
    onSuccess(_courses)    
}

const getCourse = (id, onError, onSuccess) => {
    let done = false
    for ( let i = 0; i < _courses.length; i++ ) {
        if ( _courses[i].id === id ) {
            done = true
            onSuccess( _courses[ i ] )
        }
    }
    if (! done)
        onError("Course item not found")    
}

const getAllServices = (onError, onSuccess) => {
    onSuccess(_services)   
}

const getService = (id, onError, onSuccess) => {
    let done = false
    for ( let i = 0; i < _services.length; i++ ) {
        if ( _services[i].id === id ) {
            done = true
            onSuccess( _services[ i ] )
        }
    }
    if (! done)
        onError("Service item not found")    
}

module.exports = {
    getAllCustomers,
    getAllCourses,
    getCourse,
    getAllServices,
    getService
}
