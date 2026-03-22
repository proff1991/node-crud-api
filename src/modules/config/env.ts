import { config } from "dotenv";

config();

export var getEnv = () => {
  return {
    PORT: Number(process.env.PORT) || 4000,
  };
}