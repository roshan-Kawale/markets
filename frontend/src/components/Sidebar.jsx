import { useState } from "react";
import {
  Home,
  Filter,
  User,
  Menu,
  X,
  EllipsisVertical,
  Bookmark,
  BarChart,
  Package,
  ShoppingBag,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";
import { RESET } from "jotai/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import NotificationFeed from "./NotificationFeed";
import SideBarMenuItem from "./SideBarMenuItem";

const SidebarData = () => {
  const [user, setUser] = useAtom(userAtom);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSignOut = (e) => {
    e.preventDefault();
    setUser(RESET);
  };

  const menuItems = [
    { icon: NotificationFeed},
    { icon: Home, label: "Home", link: "/" },
    { icon: Filter, label: "Filter" },
    { icon: Bookmark, label: "Saved", link: "/saved" },
  ];

  const customerMenuItem = [{ icon: ShoppingBag, label: "My Booking", link: "/mybooking" }];

  const shopkeeperMenuItem = [
    { icon: ShoppingBag, label: "Booking", link: "/shopkeeper/bookings" },
    { icon: Package, label: "Inventory", link: "/shopkeeper/inventory" },
    { icon: BarChart, label: "Dashboard", link: "/shopkeeper/dashboard" },
  ];

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4 text-black" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div
        className={`fixed inset-y-0 xl:left-0 left-0 bg-[#121212] dark z-50 w-64  shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <Link to="/">
            <div className="p-4 border-b bg-zinc-800/40">
              <h1 className="text-2xl font-bold">LocalConnect</h1>
            </div>
          </Link>
          <nav className="flex-1 overflow-y-auto py-4 space-y-2">
            <SideBarMenuItem menuItems={menuItems} />
            {user.role === "shopkeeper" ? (
              <SideBarMenuItem menuItems={shopkeeperMenuItem} />
            ) : user.role === "consumer" ? (
              <SideBarMenuItem menuItems={customerMenuItem} />
            ) : null}
          </nav>
          {user.role == null && (
            <div className="p-2 border-t">
              <Link to="/login">
                <div className="flex justify-center items-center gap-2 hover:bg-zinc-800/60 rounded-3xl py-2 px-4">
                  Sign In
                </div>
              </Link>
            </div>
          )}
          {user.role != null && (
            <div className="p-2 border-t">
              <div className="flex items-center gap-2 hover:bg-zinc-800/60 rounded-3xl py-2 px-4">
                <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <Link
                    to={`/${
                      user.role === "shopkeeper"
                        ? "profile"
                        : user.role === "consumer"
                        ? "customer"
                        : "admin"
                    }/${user._id}`}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-sm text-gray-500">View Profile</span>
                  </Link>
                </div>
                <div className="absolute right-4 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <EllipsisVertical />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="bg-[#2e2d2d] border-none"
                    >
                      <DropdownMenuSeparator />

                      <Link>
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="py-2 text-white"
                        >
                          Sign Out
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 lg:hidden"
          onClick={toggleSidebar}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </div>
    </>
  );
};

export default function Sidebar() {
  return (
    <div className="relative shadow-xl rounded  px-4 py-6">
      <SidebarData />
    </div>
  );
}
