const asyncHandler = require("express-async-handler");
const Todo = require('../model/todoModel');

// @desc Get todos
// @route /todos
// @access Private
 
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    res.status(200).json(todos);
})

// @desc Set todo
// @route /todos
// @access Private

const setTodo = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }
    const todo = await Todo.create({
        text: req.body.text
    })
    
    res.status(200).json(todo);
})

// @desc Update todo
// @route /todos:id
// @access Private
 
const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        res.status(400);
        throw new Error('Todo not found!');
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTodo);
})

// @desc Update todo
// @route /todos:id
// @access Private
 
const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        res.status(400);
        throw new Error('Todo not found!');
    }
    todo.remove();
    res.status(200).json({message: req.params.id})
})

module.exports = {
    setTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};