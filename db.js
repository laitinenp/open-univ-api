// simulate relational database extremely simply

const { response } = require("./app")

var counter = 1

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

var _users = [
    {
        "userId": 123,
        "forename": "Gina",
        "surname": "Lollobrigida",
        "username": "gina",
        "password": "socute",
        "email": "gina@email.com",
        "cart": _services[0]
    }
]

const getAllUsers = (onError, onSuccess) => {
    onSuccess(_users)
}

const getUser = (id, onError, onSuccess) => {
    let done = false
    for ( let i = 0; i < _users.length; i++ ) {
        if ( _users[i].userId === id ) {
            done = true
            onSuccess( _users[ i ] )
        }
    }
    if (! done)
        onError("Customer item not found")       
}

const getUserByUsername = (username, onError, onSuccess) => {
    res = _users.filter( cust => cust.username === username )
    if ( res === null || res.length == 0 ) onError("User item not found")
    else onSuccess( res[0] )
}

const addUser = (data, onError, onSuccess) => {
    _users.push( data )
    data.userId = counter
    counter = counter + 1
    onSuccess(data)
}

const getAllCourses = (onError, onSuccess) => {
    onSuccess(_courses)    
}

const getCourse = (id, onError, onSuccess) => {
    res = _courses.filter( course => course.id === id )
    if ( res == null ) onError("Course item not found")
    else onSuccess( res[0] )
}

const getAllServices = (onError, onSuccess) => {
    onSuccess(_services)   
}

const getService = (id, onError, onSuccess) => {
    res = _services.filter( service => service.id === id )
    if ( res == null ) onError("Service item not found")
    else onSuccess( res[0] ) 
}

module.exports = {
    getAllUsers,
    getUser,
    getUserByUsername,
    addUser,
    getAllCourses,
    getCourse,
    getAllServices,
    getService
}
