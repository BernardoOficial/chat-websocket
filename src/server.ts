import { serverHTTP } from "./http";
import "./websocket";
serverHTTP.listen(process.env.PORT || 3001, () => console.log("backend is started! 🚀 PORT " + process.env.PORT || 3001));