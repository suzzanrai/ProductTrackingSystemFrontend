import { en } from "../en";
import { neCommon } from "./common";
import { neLogin } from "./login";
import { neRegister } from "./register";

export const ne: typeof en = {
  ...neCommon,
  ...neLogin,
  ...neRegister,
};
