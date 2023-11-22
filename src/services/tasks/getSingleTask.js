const Tasks = require('../../models/tasksModel.json');

exports.getSingleTaskService = async (params) => {
    const response = {
        status: false,
        data: {}
    }
    
    try {
      const allTasks = Tasks;
      const filteredTasks = allTasks.find((task) => task.id == params)

      if(!filteredTasks){
        response.message = "Document Not Found!!"
        return response;
      }

      response.status = true;
      response.data = filteredTasks;
      return response;  
    } catch (error) {
        console.log(error)
        const response = {
            status: false,
            message: error,
        }     
        return response;
    }
}