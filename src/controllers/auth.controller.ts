import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import { RegisterDto, LoginDto } from "../types/auth.dto";

class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as RegisterDto;
      const result = await this.authService.register(data);
      res
        .status(201)
        .json({ message: "User registered successfully", ...result });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as LoginDto;
      const result = await this.authService.login(data);
      res.json({ message: "Login successful", ...result });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
