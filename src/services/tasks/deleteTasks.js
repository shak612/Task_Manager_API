const Tasks = require('../../models/tasksModel.json');
const fs = require('node:fs');
const path = require('path');

exports.deleteTasksService = async (taskId) => {
    const response = {
        status: false,
        message: "",
    }

    try {
      if(taskId !== undefined){

          const combinedData = [...Tasks];
    
          const filterData = combinedData.filter((item) => item.id !== Number(taskId))
          
          if(filterData.length > 0){
              const afterDeletedTasks = JSON.stringify(filterData);
               
              const filePath = path.join(__dirname, '../../models/tasksModel.json')
              
              const writeFilePromise = async() => {
                return new Promise((resolve, reject) => {
                    fs.writeFile(filePath, afterDeletedTasks, 'utf8', (err) => {
                      if(!err){
                          response.status = true;
                          response.message = "Task is successfully deleted!!"
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
            response.message = "Document not found to delete!!"
            return response;
          }
      }else{
        response.message = "Please give the id to delete task!!"
        return response;
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