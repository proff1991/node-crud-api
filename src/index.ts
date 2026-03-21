import { getEnv } from "./config/env";

(async () => {
    try {
        var PORT = getEnv().PORT;
        console.log(PORT);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Unknown error", error);
        }
        process.exit(1);
    }
})();