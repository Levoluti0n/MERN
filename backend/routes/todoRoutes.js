const express = require('express');
const router = express.Router();
const {
    setTodo,
    getTodos,
    updateTodo,
    deleteTodo,
} = require('../controller/todoController');

router.route('/').get(getTodos).post(setTodo);
router.route('/:id').put(updateTodo).delete(deleteTodo);

module.exports = router;