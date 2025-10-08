const { Router } = require("express");

const usersController = require("../controllers/usersController");

const router = Router();
// /users
// get all users
router.get("/", usersController.getAllUsers);

// get user by id
router.get("/:id", usersController.getUserById);

// create user
router.post("/", usersController.createUser);

router.patch("/:id", usersController.updateUser);

// delete user
router.delete("/:id", usersController.deleteUser);

module.exports = router;
