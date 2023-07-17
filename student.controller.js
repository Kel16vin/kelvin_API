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

//deleting data
exports.delete = (request,response) => {
    const id = request.query.id_;
    
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
     Student.destroy({ where: { id: id } })
    .then(() => {
      response.send({
        status: 'Success',
        message:'Student deleted successfully',
        status_code: 200
        
    });
    })
    .catch(err => {
      response.status(400).send('Error occurred while deleting student');
    });
   
};


 /*   exports.update = (request, response) => {

        Student.findByPk(studentId)
  .then((student) => {
    if (student) {
      // Update the student's name, age, and grade
      student.first_name = 'New Name';
      student.last_name = '';
      student.gender = '12th Grade';
      student.class = '';
      student.physical_address = '';
      student.status = '';

      // Save the changes to the database
      return student.save();
    }
    throw new Error('Student not found');
  })
  .then((updatedStudent) => {
    console.log('Student updated:', updatedStudent.toJSON());
  })
  .catch((error) => {
    console.error('Error updating student:', error);
  });


    };*/
