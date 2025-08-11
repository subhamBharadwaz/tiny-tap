import "dotenv/config";

import app from "./app";
import env from "./env";
import logger from "./middlewares/logger.middleware";

const port = env.PORT || 3000;
app.listen(port, "0.0.0.0",() => {
	logger.info(`Server is running at http://0.0.0.0:${port}`);
});
