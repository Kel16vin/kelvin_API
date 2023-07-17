const db = require("../models");
const Staff = db.staff;

const Op = db.sequelize.Op;

//creates and saves a new staff
exports.create = (request, response) => {

    if(!request.body.first_name){
        response.status(400).send({
            message: "Fill in the first name"
    });
    return;
    }

    // creates  staff object
    const add_staff = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        phone_number: request.body.phone_number,
        gender: request.body.gender,
       
    }
    //
    Staff.create(add_staff)
        .then(data => {
            //return data on success
            response.send({
                status:"sucessful",
                status_code:"100",
                data: data
            });
        })
        .catch(err => {
            //return error on failure
            response.status(400).send({
                message: err.message || "Error  occurred while adding Staff"
            });
        });
};

//retrieves all students
exports.retrieve_staff = (request,response) => {
    // const first_name = request
 
    Staff.findAll({})
     .then(data => {
         response.send(data);
     })
     .catch(err => {
 
         //send error response 
         response.status(400).send({
             message: err.message || "Error  occurred while retrieving Staff"
         });
 
     });
 
 };

// retrieve staff by id
exports.find_by_id = (request, response) => {
    /* if(!id){
          response.status(400).send({
              status: "Error",
              status_code: "400",
              message: "Id does not exist!!"
      });
      return; 
      }*/
      const id = request.query.id;
  
      Staff.findByPk(id)
       .then(data => {
           response.send(data);
       })
       .catch(err => {
   
           //send error response 
           response.status(400).send({
               message: err.message || "Error  occurred while retrieving Staff"
           });
   
       });
   
  
  }; 
 