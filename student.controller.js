const db = require("../models");

// import sequelize student model
const Student = db.students;

// sequelize clause
const Op = db.sequelize.Op;

// creates and saves a new student
exports.create = (request, response) => {

    if(!request.body.first_name){
        response.status(400).send({
            message: "Fill in the first name"
    });
    return;
    }

    // creates  student object
    const add_student = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        gender: request.body.gender,
        class: request.body.class,
        physical_address: request.body.physical_address,
        status: request.body.status ? request.body.status: false
    }
    //
    Student.create(add_student)
        .then(data => {
            //return data on success
            response.send(data);
        })
        .catch(err => {
            //return error on failure
            response.status(400).send({
                message: err.message || "Error  occurred while adding Student"
            });
        });
};

//retrieves all students
exports.retrieve_students = (request,response) => {
   const first_name = request.query.first_name;
   // {"first_name": ""}
   var condition = first_name ? {first_name: { [Op.like]: `%${first_name}%`}} : null;

   

   Student.findAll({where: condition})
    .then(data => {
        response.send(data);
    })
    .catch(err => {

        //send error response 
        response.status(400).send({
            message: err.message || "Error  occurred while retrieving Student"
        });

    });

};

//retrieving students by id
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

    Student.findByPk(id)
     .then(data => {
         response.send(data);
     })
     .catch(err => {
 
         //send error response 
         response.status(400).send({
             message: err.message || "Error  occurred while retrieving Student"
         });
 
     });
 

};

    // Update a Student by ID
exports.update_student = (request,response) => {
    const id = request.params.id;
    Student.update(request.body, {
        where: {id:id}
    }).then(num => {
        console.log("RETURN" , num);
        if(num > 0){
            response.send({
                status: 100,
                status_message: "Success",
                message:`Student with id = ${id} updated successfully`

            });
    }else{
        response.send({
            status: 400,
            status_message: "Error",
            message:`Student with id = ${id} not found`


        });
    }
    }).catch(err => {
        response.status(500).send({
            status_message: "Error",
            message: `Error updating Student with id = ${id}. Error message `
        });
    });
};

//Delete student by id
exports.delete_student = (request,response) => {
    const id = request.params.id;
    Student.destroy({
        where: {id:id}
    }).then(num => {
        console.log("RETURN" , num);
        if(num > 0){
            response.send({
                status: 100,
                status_message: "Success",
                message:`Student with id = ${id} deleted successfully`

            });
    }else{
        response.send({
            status: 400,
            status_message: "Error",
            message:`Student with id = ${id} not found`


        });
    }
    }).catch(err => {
        response.status(500).send({
            
            message: `Error deleting Student with id = ${id}. Error message `
        });
    });
};
