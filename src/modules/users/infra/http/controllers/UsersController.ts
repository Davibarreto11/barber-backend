import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { classToPlain } from "class-transformer";

import CreateUserService from "../../../services/CreateUsersServiece";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, barber } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      barber,
      name,
      email,
      password,
    });

    return response.json(classToPlain(user));
  }
}

export default new UsersController();
