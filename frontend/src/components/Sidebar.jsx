import { useState } from "react";
import {
  Home,
  Filter,
  Bell,
  User,
  ShoppingBag,
  Heart,
  Map,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import NewFilterCard from "./NewFiltercard";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";

const SidebarData = () => {
  const [user] = useAtom(userAtom);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Filter, label: "Filter" },
    { icon: Bell, label: "Notifications" },
    { icon: ShoppingBag, label: "Products" },
    { icon: Heart, label: "Favorites" },
    { icon: Map, label: "Local Shops" },
    { icon: Settings, label: "Settings" },
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
        className={`fixed inset-y-0 lg:left-48 left-0 bg-black z-50  w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b bg-zinc-800/40">
            <h1 className="text-2xl font-bold">LocalShop</h1>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center text-white space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900"
                  >
                    <item.icon className="h-5 w-5" />

                    {item.label == "Filter" ? (
                      <Dialog>
                        <DialogTrigger>
                          <span>{item.label}</span>
                        </DialogTrigger>
                        <DialogContent className="h-[90vh] text-black">
                          <NewFilterCard />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {user.role == null && (
            <div className="p-2 border-t">
              <div className="flex items-center gap-2 hover:bg-zinc-800/60 rounded-3xl py-2 px-4">
                <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                <div>
                  <p className="font-medium">John doe</p>
                  <Link
                    
                    className="flex items-center space-x-3"
                  >
                    <span className="text-sm text-gray-500">View Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {user.role === "shopkeeper" && (
            <div className="p-2 border-t">
              <div className="flex items-center gap-2 hover:bg-zinc-800/60 rounded-3xl py-2 px-4">
                <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <Link
                    to={`/profile/${user._id}`}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-sm text-gray-500">View Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {user.role === "consumer" && (
            <div className="p-2 border-t">
              <div className="hover:bg-zinc-800/40 rounded-3xl py-2 px-4">
                <a href="#" className="flex items-center space-x-3">
                  <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">View Profile</p>
                  </div>
                </a>
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
    <div className="">
      <div className=" bg-black shadow-xl border-gray-900 rounded px-4 py-6">
        <SidebarData />
      </div>
    </div>
  );
}
