const express = require('express');
const { getJutsuScrolls, getJutsuScrollById, createJutsuScroll, updateJutsuScroll, deleteJutsuScroll } = require('../controllers/jutsuScrollController');

const router = express.Router();

router.get('/', getJutsuScrolls);
router.get('/:id', getJutsuScrollById);
router.post('/', createJutsuScroll);
router.put('/:id', updateJutsuScroll);
router.delete('/:id', deleteJutsuScroll);

module.exports = router;
