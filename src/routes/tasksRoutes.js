const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.get('/tasks', tasksController.getTasksController)
router.get('/tasks/:id', tasksController.getSingleTaskController)
router.get('/tasks/priority/:level', tasksController.getTasksBasedOnPriorityController)
router.post('/tasks', tasksController.postTasksController)
router.put('/tasks/:id', tasksController.putTasksController)
router.delete('/tasks/:id', tasksController.deleteTasksController)

module.exports = router;