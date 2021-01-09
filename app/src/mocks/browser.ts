import { setupWorker } from "msw";
import { handlers } from "./handlers";
import { resetDataStorage } from "./storage/dataStorage";

// This configures a Service Worker with the given request handlers.

resetDataStorage();

export const worker = setupWorker(...handlers);
