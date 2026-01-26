import pino from "pino";

const isServer = typeof window === "undefined";
const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: isDev ? "debug" : "info",
  transport:
    isServer && isDev
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
  browser: {
    asObject: true,
  },
});
