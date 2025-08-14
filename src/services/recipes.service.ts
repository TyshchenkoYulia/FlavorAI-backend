import prisma from "../prismaClient";

export default class RecipesService {
  async createRecipe(userId: number, title: string, description: string) {
    return prisma.recipe.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  async getAllRecipes(userId: number) {
    return prisma.recipe.findMany({
      where: {
        NOT: {
          userId: Number(userId),
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getUserRecipes(userId: number) {
    return prisma.recipe.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async deleteRecipe(userId: number, recipeId: number) {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe || recipe.userId !== userId) {
      throw new Error("Recipe not found or access denied");
    }

    return prisma.recipe.delete({ where: { id: recipeId } });
  }
}
