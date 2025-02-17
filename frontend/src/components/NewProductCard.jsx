import { useState } from "react";
import { Star, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { userAtom } from "../atoms/store";
import { useAtom } from "jotai";
import { useToast } from "../hooks/use-toast";
import { Link } from "react-router-dom";

export default function ProductCard({ product, isLiked }) {
  const [user, setUser] = useAtom(userAtom);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userData, setUserData] = useState(user);

  const { toast } = useToast();

  const [sliderId, setSliderId] = useState(null);

  const handleSavedProduct = async ({ e, id }) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/auth/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id, savedProduct: id }),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setUser({ ...user, savedProduct: [...user.savedProduct, id] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSliderToggle = async ({ e, id }) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/product/get/${id}`
      );
      const data = await res.json();
      if (data.success === false) {
        return;
      }

      data.imageUrls.forEach((url)=> {
        const img = new Image();
        img.src = url;
      });

      setCurrentImageIndex(0);
      setSliderId(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Card className="w-full max-w-sm overflow-hidden group dark bg-[#121212]">
          <CardContent className="p-0">
            <div
              className="relative aspect-square w-full overflow-hidden"
              onClick={() =>
                setCurrentImageIndex(
                  (currentImageIndex + 1) % product.imageUrls?.length
                )
              }
            >
              {product.imageUrls?.length > 1 && <div className="absolute top-2 right-2 bg-[#121212] px-1 rounded-md">
                {currentImageIndex+1}/{product.imageUrls?.length}
              </div>}

              <img
                src={
                  sliderId !== product?._id
                    ? product?.imageUrls[0]
                    : product?.imageUrls?.[currentImageIndex]
                }
                onMouseOver={(e) =>
                  product.imageUrls.length > 1 &&
                  handleSliderToggle({ e, id: product._id })
                }
                alt={`${product?.productName} - Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-96"
              />
            </div>
            <div className="p-4">
              <Link
                to={`/profile/${product?.owner.userId}`}
                className="text-sm text-gray-500"
              >
                {product?.owner.shopName}
              </Link>
              <h2 className="text-lg font-semibold mt-1 truncate">
                {product?.productName}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">
                    {product?.overallRating}
                  </span>
                  <span className="ml-1 text-sm text-gray-400">
                    ({product?.ratings.length})
                  </span>
                </div>
                <p className="text-lg font-bold text-primary">
                  RS{product?.price}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="w-full flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center`}
                onClick={async (e) => {
                  const reply = await isLiked({ e, id: product._id });
                  toast({
                    className:
                      "bg-black/20 border-gray-800 text-[#32de84] capitalize font-semibold text-lg",
                    title: `${reply}`,
                  });
                }}
              >
                {product?.likes.includes(user._id) ? (
                  <Heart className="h-4 w-4 mr-1 text-red-500 fill-red-600" />
                ) : (
                  <Heart className="h-4 w-4 mr-1 fill-current" />
                )}
                <span>{product?.likes.length}</span>
              </Button>
              <Link to={`/productdetail/${product._id}`}>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{product?.comments.length}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={(e) => handleSavedProduct({ e, id: product._id })}
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    user?.savedProduct?.includes(product._id)
                      ? "fill-current"
                      : ""
                  }`}
                />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
