import { Router } from "express";
import RecipesController from "../controllers/recipes.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();
const recipesController = new RecipesController();

router.post("/", authenticate, recipesController.create);
router.get("/all", authenticate, recipesController.getAllRecipes);
router.get("/", authenticate, recipesController.getMyRecipes);
router.delete("/:id", authenticate, recipesController.delete);

export default router;
