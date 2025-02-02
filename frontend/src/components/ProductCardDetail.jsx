import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  MessageCircle,
  Share2,
  Star,
  Bookmark,
  Heart,
  MapPin,
  EllipsisVertical,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

export default function Component() {
  const [user] = useAtom(userAtom);
  const { productId } = useParams();

  const [productData, setProductData] = useState({ comments: [] });
  const [likeandCommentToggle, setLikeAndCommnetToggle] = useState(true);
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(null);
  const [ratingId, setRatingId] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/product/get/${productId}`
      );
      const data = await res.json();
      console.log(data);
      setProductData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleLike = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/product/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      fetchProductData(); // Call fetchData again to re-fetch the product data
    }
  };

  //rating systemm
  const handleRatingSubmit = async ({ e, id }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/product/rate/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: rating, userId: user._id }),
        }
      );
      const data = await response.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      fetchProductData(); // Call fetchData again to re-fetch the product data
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/product/comment/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id, comment: comment }),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setComment("");
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      fetchProductData();
    }
  };

  const handleKeyPressComment = (e) => {
    if (e.key === "Enter") {
      addCommentHandler(e);
    }
  }

  return (
    <div className=" flex justify-center items-center mt-16">
      {productData?.length !== null && (
        <Card className="w-full max-w-4xl mx-auto shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* Product Post Section */}
            <div className="relative md:w-1/2 p-6">
              <div className="absolute right-4 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <EllipsisVertical />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuSeparator />

                    <Link to={`/productEdit/${productData._id}`}>
                    <DropdownMenuItem className="py-2">Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="py-2">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center cursor-pointer gap-4">
                    <img
                      src="https://picsum.photos/200"
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />

                    <CardTitle>
                      <Link to={`/profile/${productData?.owner?.userId}`}>
                        {productData?.owner?.shopName}
                      </Link>
                    </CardTitle>
                  </div>
                </div>
                <CardDescription>{productData?.caption}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={`${productData?.imageUrls}?height=300&width=400`}
                  alt="Eco-Friendly Water Bottle"
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <MapPin />
                      <p className="text-gray-500 text-sm font-semibold">
                        {`${productData?.owner?.shopAddress?.area} , ${productData?.owner?.shopAddress?.city} , ${productData?.owner?.shopAddress?.state}`}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <div className="flex gap-1 items-center px-4">
                        <p className="font-bold">
                          {productData?.overallRating}
                        </p>
                        <Star />
                      </div>
                      <Bookmark />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="flex gap-6 item-center">
                  <div className="flex items-center gap-1">
                    <div
                      onClick={(e) => handleLike({ e, id: productData._id })}
                    >
                      {productData?.likes?.some(
                        (like) => like._id === user._id
                      ) ? (
                        <Heart className="text-red-600 fill-red-600" />
                      ) : (
                        <Heart />
                      )}
                    </div>

                    <div className="flex justify-center items-center gap-1">
                      <p className=" text-sm font-semibold">
                        {productData?.likes?.length
                          ? productData?.likes?.length
                          : ""}
                      </p>{" "}
                      <span
                        className="cursor-pointer font-semibold"
                        onClick={() => setLikeAndCommnetToggle(false)}
                      >
                        Like
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageCircle />

                    <div className="flex justify-center items-center gap-1 ">
                      <p className="text-sm font-semibold">
                        {productData?.comments?.length
                          ? productData?.comments?.length
                          : ""}
                      </p>{" "}
                      <span
                        className="cursor-pointer font-semibold"
                        onClick={() => setLikeAndCommnetToggle(true)}
                      >
                        comment
                      </span>
                    </div>
                  </div>

                  <div>
                    <Share2 />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={(e) =>
                    handleRatingSubmit({ e, id: productData._id })
                  }
                  className="flex p-2 justify-between border-2 rounded-xl shadow-lg w-full"
                >
                  <div className="flex flex-col justify-center items-center w-1/2">
                    <input
                      type="range"
                      id={ratingId}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full"
                      onChange={(e) => setRating(e.target.value)}
                    />

                    <span className="text-lg font-bold ml-2">{rating}</span>
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="rounded-xl border-2 shadow-md font-bold py-2 px-4"
                  >
                    Submit Rating
                  </Button>
                </form>
              </CardFooter>
            </div>

            {/* Comments and Likes Section */}
            <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l">
              <CardHeader>
                <CardTitle>
                  {likeandCommentToggle ? "Comments" : "Likes"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Comments */}
                  {likeandCommentToggle && (
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                      <div className="space-y-4">
                        {productData?.comments?.map((comment, index) => (
                          <div className="flex items-start space-x-4 border-y-2 py-2 px-2">
                            <Avatar>
                              <AvatarImage
                                src="/placeholder.svg?height=40&width=40"
                                alt="@user1"
                              />
                              <AvatarFallback>{`U${index}`}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link  to={`/${user.role === "shopkeeper" ? "profile" : user.role=== "consumer" ? "customer" : ""}/${comment?.user._id}`}>
                                <p className="text-sm font-medium">
                                  {comment.user.name}
                                </p>
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                {comment.comment}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}

                  {/* Likes */}
                  {!likeandCommentToggle && (
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                      <div className="space-y-4">
                        {productData?.likes?.map((like, index) => (
                          <div className="flex items-center justify-start space-x-4  border-y-2 py-2 px-2">
                            <Avatar>
                              <AvatarImage
                                src="/placeholder.svg?height=40&width=40"
                                alt="@user1"
                              />
                              <AvatarFallback>{`U${index}`}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link to={`/profile/${like?._id}`}>
                                <p className="text-sm font-medium">
                                  {like.name}
                                </p>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </CardContent>
    
                {likeandCommentToggle && (
                  <CardFooter>
                  <form onSubmit={addCommentHandler} className="w-full flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyPress={handleKeyPressComment}
                      className="flex-grow"
                    />
                    <Button type="submit" variant="outline" disabled={!comment.trim()}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  </form>
                </CardFooter>
                )}
             
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
