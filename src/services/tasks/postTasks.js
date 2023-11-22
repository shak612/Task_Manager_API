const Tasks = require('../../models/tasksModel.json');
const fs = require('node:fs');
const path = require('path');
const { Validator } = require('../../utils/validator');

exports.postTasksService = async (tasksData) => {
    const response = {
        status: false,
        message: "",
    }

    try {
      const timestamp = new Date();
      
      if(!Validator.isEmpty(tasksData.title)){
       response.message = "Title should not be empty!!"
       return response;
      }

      if(!Validator.isEmpty(tasksData.description)){
        response.message = "Description should not be empty!!"
        return response;
      }

      if(!Validator.isBoolean(tasksData.status)){
        response.message = "Status should not be empty!!"
        return response;
      }

      if(tasksData.priority !== undefined){
        if(!Validator.isEmpty(tasksData.priority)){
          response.message = "priority should not be empty!!"
          return response;
        } 
      }

      const combinedData = [...Tasks];

      tasksData['createdAt'] = timestamp;
      tasksData['id'] = combinedData[combinedData.length - 1].id + 1;
      combinedData.push(tasksData);
      
      const taskToCreate = JSON.stringify(combinedData);
       
      const filePath = path.join(__dirname, '../../models/tasksModel.json')
      
      const writeFilePromise = async() => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, taskToCreate, 'utf8', (err) => {
              if(!err){
                  response.status = true;
                  response.message = "Task is successfully added!!"
                  resolve(response);
              }else{
                  response.message = err
                  reject(response);  
              }
            })      
        })
      }

     const result = await writeFilePromise();
     return result;

    } catch (error) {
      console.log(error)
        const response = {
            status: false,
            message: error,
        }     
        return response;
    }
}