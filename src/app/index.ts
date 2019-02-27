import { errorHandler } from "../infra/middlewares/index";
import { Scanner } from "../modules/route/scanner";
import { App } from "./App";

const app = new App();

new Scanner().scanControllers(app);

app.registerMiddleware(errorHandler);

export { app };
