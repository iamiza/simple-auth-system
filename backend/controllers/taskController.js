const {Task} = require ("../models");

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({where: {userId : req.user.id}});
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({message: "Error fetching tasks", error});
    }
    // console.log("Decoded user:", req.user);
};

const createTask = async (req, res, next) => {
    const {title, description} = req.body;
    try{
        const task = await Task.create({
            title, 
            description, 
            userId : req.user.id
        });
        res.status(201).json({ message: "Task created", task });
    }
    catch(error){
        //debugging
        // console.log(error.message);
        // console.log(error);
        res.status(500).json({ message: "Error creating task", error });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Task.destroy({ where: { id, userId: req.user.id } });
      if (!deleted) {
        return res.status(404).json({ message: "Task not found or unauthorized" });
      }
      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  };
  
  module.exports = { getTasks, createTask, deleteTask };

