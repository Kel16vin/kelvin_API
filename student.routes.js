const { request, response } = require("express");

module.exports = app => {

// import student controller
    const students_logic = require("../controllers/student.controller.js");

//import express router
    var router = require("express").Router();

// create student api router
//http://localhost:8082/students/add
    router.post("/add", students_logic.create);

//retrieve all students api route
// http://localhost:8082/students/retrieve
    router.get("/retrieve",students_logic.retrieve_students);

// retrieve students by id route
// http://localhost:8082/students/id
    router.get("/id",students_logic.find_by_id);

//delete students by id route
//http://localhost:8082/students/delete
    router.post("/delete",students_logic.delete);

//updating students route
//http://localhost:8082/students/update
    //router.put("/update",students_logic.update);    

// define default route
    app.use('/students', router);


}




