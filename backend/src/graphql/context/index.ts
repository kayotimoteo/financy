import type { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { type JwtPayload, verifyJwt } from "@/utils/jwt";

export interface GraphqlContext {
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
  token?: string;
  user?: string;
}

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;

  let user: string | undefined;
  let token: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice("Bearer ".length);

    try {
      const payload = verifyJwt(token) as JwtPayload;

      user = payload.id;
    } catch {
      // Token inválido ou expirado — contexto segue sem usuário autenticado
    }
  }

  return { user, token, req, res };
};
