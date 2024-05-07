import { injectable, inject } from "tsyringe";
import type User from "../infra/typeorm/entities/User";

import AppError from "../../../shared/errors/AppError";

import ICacheProvider from "../../../shared/container/providers/CacheProvider/models/ICacheProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,

    @inject("HashProvider")
    private readonly hashProvider: IHashProvider,

    @inject("CacheProvider")
    private readonly cacheProvider: ICacheProvider
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used");
    }

    const hasgedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hasgedPassword,
    });

    await this.cacheProvider.invalidate("providers-list:*");

    return user;
  }
}

export default CreateUserService;
