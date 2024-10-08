import React from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";
import { Button } from "../../ui/button";
import IconButton from "src/components/buttons/icon-button";

export const NavBar: React.FC = () => {
  return (
    <div>
      <nav>
        <NavBarBrand />
        {/* add nav bar search here */}
        <IconButton>Search</IconButton>
        <NavBarButtons />
      </nav>
    </div>
  );

  //   import React, { useState } from 'react';
  // import { Input } from "@/components/ui/input"
  // import { Button } from "@/components/ui/button"
  // import { Search, LogIn, User, X } from 'lucide-react'

  // // Assume this is imported from a local file
  // import Logo from './Logo';

  // const Navbar: React.FC = () => {
  //   const [isSearchOpen, setIsSearchOpen] = useState(false);

  //   const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setIsSearchOpen(false);
  //     // Handle search submission here
  //   };

  //   return (
  //     <nav className="bg-white shadow-md">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between items-center h-16">
  //           <div className="flex-shrink-0">
  //             <Logo className="h-8 w-auto text-teal-500" />
  //           </div>

  //           <div className={`hidden sm:block flex-grow max-w-xl mx-4 ${isSearchOpen ? 'sm:hidden' : ''}`}>
  //             <form onSubmit={handleSearchSubmit}>
  //               <div className="relative">
  //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
  //                 <Input
  //                   type="search"
  //                   placeholder="Restaurants, groceries, dishes"
  //                   className="pl-10 w-full"
  //                 />
  //               </div>
  //             </form>
  //           </div>

  //           <div className={`flex items-center ${isSearchOpen ? 'hidden' : ''}`}>
  //             <Button
  //               variant="ghost"
  //               size="icon"
  //               className="sm:hidden mr-2"
  //               onClick={() => setIsSearchOpen(true)}
  //               aria-label="Open search"
  //             >
  //               <Search className="h-5 w-5" />
  //             </Button>

  //             <Button variant="ghost" className="hidden sm:flex items-center space-x-2">
  //               <LogIn className="h-5 w-5" />
  //               <span className="hidden sm:inline">Sign up or log in</span>
  //             </Button>
  //             <Button variant="ghost" size="icon" className="sm:hidden">
  //               <LogIn className="h-5 w-5" />
  //             </Button>

  //             <Button variant="ghost" className="hidden sm:flex items-center space-x-2 ml-2">
  //               <User className="h-5 w-5" />
  //               <span className="hidden sm:inline">Account</span>
  //             </Button>
  //             <Button variant="ghost" size="icon" className="sm:hidden ml-2">
  //               <User className="h-5 w-5" />
  //             </Button>
  //           </div>
  //         </div>

  //         {/* Mobile search bar */}
  //         {isSearchOpen && (
  //           <div className="sm:hidden py-2">
  //             <form onSubmit={handleSearchSubmit} className="flex items-center">
  //               <Input
  //                 type="search"
  //                 placeholder="Restaurants, groceries, dishes"
  //                 className="flex-grow"
  //                 autoFocus
  //               />
  //               <Button
  //                 type="submit"
  //                 size="icon"
  //                 variant="ghost"
  //                 className="ml-2"
  //                 aria-label="Submit search"
  //               >
  //                 <Search className="h-5 w-5" />
  //               </Button>
  //               <Button
  //                 type="button"
  //                 size="icon"
  //                 variant="ghost"
  //                 className="ml-2"
  //                 onClick={() => setIsSearchOpen(false)}
  //                 aria-label="Close search"
  //               >
  //                 <X className="h-5 w-5" />
  //               </Button>
  //             </form>
  //           </div>
  //         )}
  //       </div>
  //     </nav>
  //   );
  // };

  // export default Navbar;
};
