import React, { useState } from "react";
import { NavBarBrand } from "./nav-bar-brand";
import IconButton from "src/components/buttons/icon-button";
import { Input } from "src/components/ui/input";
import { Search, User, LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export const NavBar: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: `/register?returnTo=${window.location.pathname}`,
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearchOpen(false);
    // Handle search submission here
  };

  return (
    <div>
      <nav className="bg-white shadow-sm border-b-[1px] border-b-gray-100 flex py-3.5 px-8 w-full justify-between fixed z-50">
        <NavBarBrand />

        <div className="hidden sm:block flex-grow max-w-xl mx-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Restaurants, groceries, dishes"
                className="pl-10 w-full"
              />
            </div>
          </form>
        </div>

        <div className="flex">
          {!isAuthenticated ? (
            <IconButton className="mr-2" onClick={handleLogin}>
              Sign up or log in
            </IconButton>
          ) : (
            <IconButton
              icon={<LogOut className="h-4 w-4" />}
              className="mr-2"
              onClick={handleLogout}
            >
              Logout
            </IconButton>
          )}

          <IconButton icon={<User className="h-4 w-4" />}>Account</IconButton>
        </div>
      </nav>
    </div>
  );
};
