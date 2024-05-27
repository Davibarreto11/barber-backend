import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";

import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

import type User from "../infra/typeorm/entities/User";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(
    private readonly usersRepository: IUsersRepository,

    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Seu email está errado!", 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Sua senha está errada", 401);
    }

    const { expiredIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiredIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
