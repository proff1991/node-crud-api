import { getEnv } from "./config/env";

(async () => {
    console.log(getEnv().PORT);
})();