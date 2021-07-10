import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface RequestDTO {
  email: string;
  password: string;
};

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<{user: User, token: string}> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email }});

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    };

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    };

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {user, token};
  };
};

export default AuthenticateUserService;