const { request, response } = require("express");

module.exports = app => {

// import student controller
    const staff_logic = require("../controllers/staff.controller.js");

//import express router
    var router = require("express").Router();

// create student api router
    router.post("/add", staff_logic.create);

// retrieve all staff
// http://localhost:8082/staff/retrieve
    router.get("/retrieve", staff_logic.retrieve_staff);

// retrieve staff by id route
// http://localhost:8082/staff/id
    router.get("/id",staff_logic.find_by_id);


// define default route
    app.use('/staff', router);
}
//http://localhost:8082/staff/add