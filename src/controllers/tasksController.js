const { getTasksService } = require("../services/tasks/getTasks");
const { getSingleTaskService } = require("../services/tasks/getSingleTask");
const { postTasksService } = require("../services/tasks/postTasks");
const { putTasksService } = require("../services/tasks/putTasks");
const { deleteTasksService } = require("../services/tasks/deleteTasks");
const { getTasksBasedOnPriorityService } = require("../services/tasks/getTasksBasedOnPriority");

exports.postTasksController = (req, res) => {
    postTasksService(req.body).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.message
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.getTasksController = (req, res) => {
    getTasksService(req.query).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.data
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.getSingleTaskController = (req, res) => {
    getSingleTaskService(req.params.id).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.data
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.getTasksBasedOnPriorityController = (req, res) => {
    getTasksBasedOnPriorityService(req.params.level).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.data
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.putTasksController = (req, res) => {
    putTasksService(req.params.id, req.body).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.message
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.deleteTasksController = (req, res) => {
    deleteTasksService(req.params.id).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.message
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}