import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../store/authStore";
import { resetStores } from "../test/helpers";

describe("authStore", () => {
  beforeEach(() => {
    resetStores();
  });

  it("logs in with seed credentials", () => {
    const success = useAuthStore.getState().login("may@shopforge.com", "may123");
    expect(success).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user?.email).toBe("may@shopforge.com");
  });

  it("rejects invalid credentials", () => {
    const success = useAuthStore.getState().login("may@shopforge.com", "wrong");
    expect(success).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("registers a new user and allows re-login", () => {
    const { register, logout, login } = useAuthStore.getState();

    expect(register("Test User", "test@example.com", "secret1")).toBe(true);
    expect(useAuthStore.getState().user?.email).toBe("test@example.com");

    logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);

    expect(login("test@example.com", "secret1")).toBe(true);
    expect(useAuthStore.getState().user?.name).toBe("Test User");
  });

  it("rejects duplicate email registration", () => {
    const { register } = useAuthStore.getState();
    expect(register("Test User", "may@shopforge.com", "secret1")).toBe(false);
  });
});
