import { getEnv } from "./modules/config/env";
import { makeFastifyApp } from './modules/app';

(async () => {
    try {
        var PORT = getEnv().PORT;
        var fastifyApp = makeFastifyApp();
        await fastifyApp.listen({ port: PORT });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.name);
            console.error(error.message);
            console.error(error.stack);
        } else {
            console.error("Unknown error: ", error);
        }
        process.exit(1);
    }
})();