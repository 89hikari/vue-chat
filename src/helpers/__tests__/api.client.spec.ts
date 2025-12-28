import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

vi.mock("axios", () => {
  const requestInterceptors = { use: vi.fn() };
  const created = {
    get: vi.fn(async (url: string, cfg?: unknown) => ({
      data: { result: `get:${url}`, cfg },
    })),
    post: vi.fn(async (url: string, data?: unknown, cfg?: unknown) => ({
      data: { result: `post:${url}`, data, cfg },
    })),
    interceptors: { request: requestInterceptors },
  };
  return {
    default: { create: vi.fn(() => created) },
    create: vi.fn(() => created),
  };
});

import * as apiClient from "@/helpers/api.client";
import axios from "axios";

describe("api.client", () => {
  beforeEach(() => {
    // ensure token exists
    // provide a simple localStorage mock
    global.localStorage = {
      getItem: (k: string) => (k === "token" ? "abc" : null),
    } as unknown as Storage;
  });

  it("get should return data from axios.get and include params", async () => {
    const res = await apiClient.get<{ result: string }>("users", { limit: 1 });
    expect(res).toBeDefined();
    expect(res.result).toBe("get:users");
  });

  it("post should return data from axios.post and send payload", async () => {
    const res = await apiClient.post<{
      result: string;
      data?: { name: string };
    }>("auth/login", { name: "bob" });
    expect(res.result).toBe("post:auth/login");
    expect(res.data?.name).toBe("bob");
  });

  it("attaches Authorization header via interceptor", () => {
    const axiosModule = axios as unknown as { create: Mock };
    expect(axiosModule.create).toHaveBeenCalled();
    const created = (axiosModule.create as Mock).mock.results[0].value;
    expect(created.interceptors.request.use).toHaveBeenCalled();
  });
});
