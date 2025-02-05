import React, { useEffect, useState } from "react";
import ProductCard from "../components/NewProductCard";
import { productAtom, userAtom } from "../atoms/store";
import { useAtom } from "jotai";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

export default function SavedPage() {
  const [user] = useAtom(userAtom);
  const [_, setProducts] = useAtom(productAtom);
  const [savedProduct, setSavedProduct] = useState();

  const fetchSavedProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/auth/get/${user._id}`
      );
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setSavedProduct(data.savedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchSavedProduct();
  }, [user]);
  console.log(savedProduct);

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/product/getall?${searchQuery}`
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [window.location.search]);

  const handleLike = async ({ e, id }) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/product/like/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id, name: user.name }),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      return data.message;
    } catch (error) {
      console.log(error.message);
    } finally {
      fetchData();
    }
  };

  return (
    <div>
      <div className="relative">
        <Header />
        <div className=" flex p-2">
          <Sidebar />
          <div className="container mx-auto flex items-center justify-center px-4 py-8 lg:ml-64 mt-10">
            {savedProduct?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {savedProduct?.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    isLiked={handleLike}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
