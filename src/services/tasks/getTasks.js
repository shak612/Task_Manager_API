const Tasks = require('../../models/tasksModel.json');

exports.getTasksService = async (query) => {
    const response = {
        status: false,
        data: []
    }

    try {
      const allTasks = [...Tasks];

      if(Object.keys(query).length > 0){
        const filterTasks = allTasks.filter((task) => task.status === Boolean(query.status));
        if(filterTasks.length > 0){
          if(query?.sort === "ascending") filterTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          else if(query?.sort === "descending") filterTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          response.status = true;
          response.data = filterTasks;
          return response;
        }else{
          response['message'] = "Status not found"
        }
      }
      
      if(allTasks != undefined){
        response.status = true;
        response.data = allTasks;
      }

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