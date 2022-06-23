// @desc Get todos
// @route /todos
// @access Private
 
const getTodos = (req, res) => {
    res.status(200).json({message: 'get Todos'});
}

// @desc Set todo
// @route /todos
// @access Private

const setTodo = (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }
    res.status(200).json({message: 'set Todo'})
}

// @desc Update todo
// @route /todos:id
// @access Private
 
const updateTodo = (req, res) => {
    res.status(200).json({message: `update Todo ${req.params.id}`})
}

// @desc Update todo
// @route /todos:id
// @access Private
 
const deleteTodo = (req, res) => {
    res.status(200).json({message: `delete Todo ${req.params.id}`})
}

module.exports = {
    setTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};