import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthStore } from "../../store/authStore";
import { resetStores } from "../../test/helpers";

const ProtectedContent = () => <div>Protected Content</div>;

const renderProtected = (requireAdmin = false, initialPath = "/protected") =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/" element={<div>Home Page</div>} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute requireAdmin={requireAdmin}>
              <ProtectedContent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe("ProtectedRoute", () => {
  beforeEach(() => {
    resetStores();
  });

  it("redirects unauthenticated users to login", () => {
    renderProtected();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders children for authenticated shoppers", () => {
    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: "2",
        name: "May Shun",
        email: "may@shopforge.com",
        role: "shopper",
        createdAt: "2024-01-01",
      },
      registeredUsers: [],
    });

    renderProtected();
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects non-admin users away from admin routes", () => {
    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: "2",
        name: "May Shun",
        email: "may@shopforge.com",
        role: "shopper",
        createdAt: "2024-01-01",
      },
      registeredUsers: [],
    });

    renderProtected(true);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("allows admin users on admin routes", () => {
    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: "1",
        name: "Admin User",
        email: "admin@shopforge.com",
        role: "admin",
        createdAt: "2024-01-01",
      },
      registeredUsers: [],
    });

    renderProtected(true);
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
