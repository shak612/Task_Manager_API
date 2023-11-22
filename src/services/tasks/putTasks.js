const Tasks = require('../../models/tasksModel.json');
const fs = require('node:fs');
const path = require('path');
const { Validator } = require('../../utils/validator');

exports.putTasksService = async (taskId, tasksData) => {
    const response = {
        status: false,
        message: "",
    }
  
    try {
     const timestamp = new Date(); 
     
     if(taskId !== undefined && Object.keys(tasksData).length > 0){

         if(tasksData.title !== undefined){
             if(!Validator.isEmpty(tasksData.title)){
              response.message = "Title should not be empty!!"
              return response;
             }
         }
    
         if(tasksData.description !== undefined){ 
          if(!Validator.isEmpty(tasksData.description)){
            response.message = "Description should not be empty!!"
            return response;
          }
         }
    
         if(tasksData.status !== undefined){ 
            if(!Validator.isBoolean(tasksData.status)){
              response.message = "Status should not be empty!!"
              return response;
            }
           }
    
          const combinedData = [...Tasks];
    
          const taskIndex = combinedData.findIndex((item) => item.id === Number(taskId))
    
          if(taskIndex >= 0){
            combinedData[taskIndex].title = tasksData.title ?? combinedData[taskIndex].title;
            combinedData[taskIndex].description = tasksData.description ?? combinedData[taskIndex].description;
            combinedData[taskIndex].status = tasksData.status ?? combinedData[taskIndex].status
            combinedData[taskIndex].priority = tasksData.priority ?? combinedData[taskIndex].priority
            combinedData[taskIndex]['updatedAt'] = timestamp;
          }else{
            response.message = "Document not found please check the id!!" 
            return response;
          }

          const updatedTasks = JSON.stringify(combinedData);
           
          const filePath = path.join(__dirname, '../../models/tasksModel.json')
          
          const writeFilePromise = async() => {
            return new Promise((resolve, reject) => {
                fs.writeFile(filePath, updatedTasks, 'utf8', (err) => {
                  if(!err){
                      response.status = true;
                      response.message = "Task is successfully updated!!"
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
     }else{
        response.message = "Please fill the details to update!!"
        return message
     }  

    } catch (error) {
      console.log(error)
        const response = {
            status: false,
            message: error,
        }     
        return response;
    }
}   