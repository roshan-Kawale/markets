import React, { useEffect, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ScrollArea } from "./ui/scroll-area";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { AlertTriangle, EllipsisVertical, Pencil, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { RESET } from "jotai/utils";

const ShopProfileCard = () => {
  const [shopkeeperData, setShopkeeperData] = useState();
  const [isShopkeeper, setIsShopkeeper] = useState(true);
  const { userId } = useParams();
  const [user , setUser] = useAtom(userAtom);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchShopkeeperData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}api/shopkeeper/get/${userId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setIsShopkeeper(false);
          return;
        }
        console.log(data);
        setIsShopkeeper(true);
        setShopkeeperData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchShopkeeperData();
  }, [userId]);

  const handleDeleteShopkeeper = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/shopkeeper/delete/${shopkeeperData.shopkeeper._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await res.json();
      console.log(data);
      setUser(RESET);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isShopkeeper ? (
        <div className=" p-4 sm:h-screen">
          <div className="flex flex-col gap-4 sm:fixed justify-start items-center">
            <div className="bg-black border-2 border-gray-800  sm:fixed sm:w-[96vw] sm:h-[33vh] rounded-3xl p-4 flex flex-col">
              <div className="flex sm:flex-row gap-8 p-4">
                <div>
                  <img
                    src="https://i.pravatar.cc/300"
                    alt="Employee Profile"
                    className="rounded-full w-20 h-20 mx-auto mb-4"
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-2">
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      {shopkeeperData?.userData?.name}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-8">
                    <div className="text-sm mb-2 flex flex-col gap-1">
                      <span className="text-gray-400 ">Shop Name</span>
                      <span className="font-semibold">
                        {shopkeeperData?.shopkeeper?.shopName}
                      </span>
                    </div>
                    <div className="text-sm mb-2 flex flex-col gap-1">
                      <span className="text-gray-400 ">Shop Address</span>
                      <span className="font-semibold flex flex-wrap">
                        {shopkeeperData?.shopkeeper?.shopAddress.area},{" "}
                        {shopkeeperData?.shopkeeper?.shopAddress.city},{" "}
                        {shopkeeperData?.shopkeeper?.shopAddress.district},{" "}
                        {shopkeeperData?.shopkeeper?.shopAddress.state},{" "}
                        {shopkeeperData?.shopkeeper?.shopAddress.country}
                      </span>
                    </div>
                  </div>
                </div>
                {user._id === userId && (
                  <div
                    asChild
                    className="absolute right-8 top-10 sm:top-6 cursor-pointer hover:text-green-300"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none">
                        <EllipsisVertical />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="bg-[#2e2d2d]/70 border-none"
                      >
                        <DropdownMenuSeparator />

                        <Link to="/profileEdit">
                          <DropdownMenuItem className="py-2 text-white">
                            <Pencil className="w-4 h-4 mr-2"/>
                            Edit
                          </DropdownMenuItem>
                        </Link>

                        <AlertDialog>
                          <AlertDialogTrigger className="p-2 hover:bg-white hover:text-black w-full flex justify-start rounded-md items-center text-white">
                            <TrashIcon className="w-4 h-4 mr-2" />
                            Delete
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-black">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteShopkeeper}
                              >
                  
                                Yes, delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-4 sm:px-4">
                <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
                  <MdOutlinePostAdd className="text-xl" />

                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Posts</p>
                    <p className="text-xs">
                      {shopkeeperData?.shopkeeper?.products.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
                  <MdEmail className="text-xl" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Email</p>
                    <p className="text-xs">{shopkeeperData?.userData?.email}</p>
                  </div>
                </div>
                <div className="flex items-center px-5 py-3 gap-2 rounded-2xl bg-[#2e2d2d]/70">
                  <FaPhoneAlt className="text-xl" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Phone number</p>
                    <p className="text-xs">
                      {shopkeeperData?.shopkeeper?.contactNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* second div */}
            <ScrollArea className="bg-black border-2 border-gray-800 rounded-3xl sm:mt-[34vh] h-[62vh] w-[96vw] relative">
              <div className="flex px-8 py-4 gap-2 justify-start items-center sm:fixed absolute w-[95vw] rounded-tl-3xl bg-black">
                <div className="w-2 h-9 rounded-md bg-[#2cb6bd]"></div>
                <h2 className="text-xl">Posts</h2>
                {user._id === userId && (
                  <Link to="/productcreate" className="text-xl cursor-pointer">
                    <MdOutlinePostAdd />
                  </Link>
                )}
              </div>
              <div className="rounded-md sm:p-8 flex flex-wrap justify-center items-center sm:justify-normal gap-3 mt-20 sm:mt-12">
                {shopkeeperData?.shopkeeper?.products.map((product, index) => (
                  <Link to={`/productdetail/${product._id}`} key={product._id}>
                    <img
                      src={`${product.imageUrls}`}
                      alt="Employee Profile"
                      className="w-32 h-32 sm:h-40 sm:w-40 rounded-xl mx-auto mb-4"
                    />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="bg-white w-full h-screen flex items-center">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-row items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <CardTitle className="text-xl font-semibold">
                Not a Valid Shopkeeper
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You are not registered as a valid shopkeeper yet. Please
                complete your registration to access all features.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/detail" className="w-full">
                <Button className="w-full">Go to Detail Page</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ShopProfileCard;
