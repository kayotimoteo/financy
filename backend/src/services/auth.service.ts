import type { LoginInput, RegisterInput } from "@/dtos/input/auth.input";
import type { LoginOutput, RegisterOutput } from "@/dtos/output/auth.output";
import { comparePassword, hashPassword } from "@/utils/hash";
import { signJwt, verifyJwt } from "@/utils/jwt";
import type { User } from "../../generated/prisma/client";
import { prismaClient } from "../../prisma/prisma";

export class AuthService {
  async register(data: RegisterInput): Promise<RegisterOutput> {
    const emailAlreadyExists = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (emailAlreadyExists) {
      throw new Error("E-mail already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return this.generateTokens(user);
  }

  async login(data: LoginInput): Promise<LoginOutput> {
    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return this.generateTokens(user);
  }

  async refreshToken(token: string): Promise<LoginOutput> {
    const decodedToken = verifyJwt(token);

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    const user = await prismaClient.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return this.generateTokens(user);
  }

  generateTokens(user: User): RegisterOutput {
    const token = signJwt({ id: user.id, email: user.email }, "15m");
    const refreshToken = signJwt({ id: user.id, email: user.email }, "15d");

    return { token, refreshToken, user };
  }
}
