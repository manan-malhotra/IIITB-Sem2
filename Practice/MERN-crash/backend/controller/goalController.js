const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
// @via     AuthMiddleware

const getGoals = asyncHandler(async (req,res)=>{
    const goals = await Goal.find({user:req.user.id});
    res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
// @via     AuthMiddleware

const setGoals = asyncHandler(async (req,res)=>{

    if(!req.body.text){
        throw new Error('No message')
    }
    const goal = await Goal.create({
        text : req.body.text,
        user: req.user.id
    })
    res.status(201).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
// @via     AuthMiddleware

const updateGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("Not your goal to update")
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
// @via     AuthMiddleware

const deleteGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("Not your goal to delete")
    }
    await goal.deleteOne()
    res.status(200).json({
        id: req.params.id})
})

module.exports = {getGoals, setGoals, updateGoal, deleteGoal}