import { randomUUID } from "node:crypto";

const users = [];

const toPublicUser = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export const userModel = {
  async create({ name, email, passwordHash }) {
    const newUser = {
      id: randomUUID(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    return newUser;
  },

  async findByEmail(email) {
    return users.find((user) => user.email === email.toLowerCase()) || null;
  },

  async findById(id) {
    return users.find((user) => user.id === id) || null;
  },

  toPublicUser,
};
