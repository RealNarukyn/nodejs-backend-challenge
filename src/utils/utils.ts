import * as bcrypt from "bcryptjs";
// const bcrypt = require("bcryptjs");

export const cypherPassword = async (password: string) => {
  let c_password: string = "";

  bcrypt.hash(password, 10, (err: Error, result: string) => {
    if (err) {
      console.log("Error hashing:", err);
    }

    c_password = result;
  });

  return c_password;
};

export const getUniqueID = (): string => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
  return Math.random().toString(36).slice(2, 9);
};
