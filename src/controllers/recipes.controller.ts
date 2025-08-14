import { Response, NextFunction } from "express";
import RecipesService from "../services/recipes.service";
import { AuthRequest } from "../middlewares/authMiddleware";

class RecipesController {
  private recipesService = new RecipesService();

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const recipe = await this.recipesService.createRecipe(
        req.user.id,
        title,
        description
      );
      res.status(201).json({ message: "Recipe created successfully", recipe });
    } catch (error) {
      next(error);
    }
  };

  getAllRecipes = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const recipes = await this.recipesService.getAllRecipes(req.user.id);
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  };

  getMyRecipes = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const recipes = await this.recipesService.getUserRecipes(req.user.id);
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const recipeId = Number(req.params.id);
      await this.recipesService.deleteRecipe(req.user.id, recipeId);
      res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default RecipesController;
