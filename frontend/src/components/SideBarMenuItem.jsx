import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import NewFilterCard from "./NewFiltercard";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";

const SideBarMenuItem = ({ menuItems }) => {
  const [user, setUser] = useAtom(userAtom);
  return (
    <div>
      <ul className="space-y-2 px-2">
        {menuItems?.map((item, index) => (
          <li key={index}>
            <div className="flex items-center text-white space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900">
              <item.icon className="h-5 w-5 ml-1" />

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
                <Link to={`${item.link}`}>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarMenuItem;
