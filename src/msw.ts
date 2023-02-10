import SwaggerParser from "@apidevtools/swagger-parser";
import { noop, sleep } from "@charrue/toolkit";
import { rest } from "msw";
import type { RestHandler } from "msw";
import { setupServer } from "msw/node";
import { parse as queryStringParse } from "qs";
import { afterAll, afterEach, beforeAll } from "vitest";

import { getPropertyValue } from "./swagger";
import type { Swagger } from "./types";

type SleepTime = number | Record<string | "*", number>;

class MSWServer {
  private server: ReturnType<typeof setupServer> | null = null;
  private baseUrl = "";
  private sleepTime: SleepTime = 0;

  startServer = async (swaggerPath?: string, baseUrl?: string, defaultSleepTime: SleepTime = 0) => {
    this.baseUrl = baseUrl || "";
    this.sleepTime = defaultSleepTime;

    if (swaggerPath) {
      const parser = new SwaggerParser();
      const api = (await parser.dereference(swaggerPath)) as Swagger;

      if (api) {
        const { paths = {} } = api;

        const handlers: RestHandler[] = [];
        Object.keys(paths).map((endpointPath) => {
          const responses = paths[endpointPath].post?.responses;

          if (responses) {
            handlers.push(
              rest.all(`${baseUrl}${endpointPath}`, (req, res, ctx) => {
                return res(ctx.json(getPropertyValue(responses["200"].schema)));
              }),
            );
          }
        });

        this.server = setupServer(...handlers);
      }
    } else {
      this.server = setupServer();
    }

    if (!this.server) {
      return;
    }

    beforeAll(() => {
      this.server!.listen();
    });

    afterEach(() => {
      this.server!.resetHandlers();
    });

    afterAll(() => {
      this.server!.close();
    });
  };

  registerMock = (
    url: string,
    response:
      | any
      | ((params: Record<string, any>, status: { error: boolean; fail: boolean }) => any),
  ) => {
    if (!this.server) {
      console.warn("you should start msw server first.");
      return;
    }

    const requestUrl = url.startsWith(this.baseUrl) ? url : this.baseUrl + url;

    this.server.use(
      rest.all(requestUrl, async (req, res, ctx) => {
        const {
          error = false,
          fail = false,
          ...body
        } = queryStringParse(await req.text()) as Record<string, any>;

        const data = typeof response === "function" ? response(body, { error, fail }) : response;

        await sleep(this.getApiSleepTime(url));

        return res(ctx.status(error ? 500 : 200), ctx.json(data));
      }),
    );
  };

  private getApiSleepTime = (url: string) => {
    if (typeof this.sleepTime === "number") {
      return Math.max(this.sleepTime, 0);
    }

    return Math.max(this.sleepTime[url] || this.sleepTime["*"] || 0, 0);
  };
}

const { startServer, registerMock } = new MSWServer();

export { startServer, registerMock };
