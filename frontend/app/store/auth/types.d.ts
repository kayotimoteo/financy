export type User = {
  id: string;
  name: string;
  email: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type SignupOutput = {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  login: {
    token: string;
    refreshToken: string;
    user: User;
  };
};
