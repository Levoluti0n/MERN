const express = require('express');
const router = express.Router();
const {
    setTodo,
    getTodos,
    updateTodo,
    deleteTodo,
} = require('../controller/todoController');
const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getTodos).post(protect, setTodo);
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;