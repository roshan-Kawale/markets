import React, { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { Link , useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { productAtom, userAtom } from "../atoms/store";
import CommentCard from "./CommentCard";
import Carousel from "./Carousel";
import LikeCard from "./LikeCard";
import { Slider } from "./ui/slider";
import { useToast } from "../hooks/use-toast"


import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Heart, MessageCircle, Share2, X } from "lucide-react";

const ProductCard = () => {
  const [user] = useAtom(userAtom);
  const [products, setProducts] = useAtom(productAtom);
  const { toast } = useToast()
  const { search } = useParams();

  const [likeToggle, setLikeToggle] = useState(false);
  const [likesValue, setLikesValue] = useState("");
  const [likeProductId, setLikeProductId] = useState(null);
  const [commentsValue, setCommentsValue] = useState([]);
  const [commentToggle, setCommentToggle] = useState(false);
  const [productId, setProductId] = useState(null);
  const [sliderToggle, setSliderToggle] = useState(false);
  const [imageUrlValue, setImageUrlValue] = useState([]);
  const [sliderId, setSliderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ratingForm, setRatingForm] = useState({});
  const [ratingId, setRatingId] = useState(false);

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
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/product/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id , name : user.name }),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      return data.message;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      fetchData();
    }
  };

  const handleLikeToggle = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/product/get/${id}`);
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLikesValue(data.likes);
      setLikeProductId(id);
      setCommentToggle(false);
      setLikeToggle(true);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleCommentToggle = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/product/get/${id}`);
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setCommentsValue(data.comments);
      setProductId(id);
      setLikeToggle(false);
      setCommentToggle(true);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSliderToggle = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/product/get/${id}`);
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setImageUrlValue(data.imageUrls);
      setSliderId(id);
      setSliderToggle(true);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
          body: JSON.stringify({ rating: ratingForm[id], userId: user._id }),
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
      fetchData(); // Call fetchData again to re-fetch the product data
    }
  };

  const handleRatingToggle = ({ e, id }) => {
    e.preventDefault();
    setRatingId(id);
  };

  const handleRatingChange = ({newValue , id}) => {
    const numericValue = Object.values(newValue)[0];
    setRatingForm({
      ...ratingForm,
      [id]: numericValue,
    });
  };

  return (
    <>
      <div className="lg:absolute left-1/3 md:w-1/2 lg:w-1/3 mt-4 flex flex-wrap justify-center mb-4">
        {products?.map((product, index) => (
          <div
            key={product._id}
            className="w-full rounded-xl overflow-hidden mx-4 mb-4 shadow-lg bg-black"
          >
            <div className="flex justify-between items-center pl-8 pt-4">
              <Link
                to={`/profile/${product?.owner.userId}`}
                className="flex items-center cursor-pointer gap-4"
              >
                <img
                  src="https://picsum.photos/200"
                  alt="Profile"
                  className="w-9 h-9 rounded-full"
                />

                <div>
                  <h2 className="text-lg font-bold text-white">
                    {product.owner.shopName}
                  </h2>
                  <p className="text-sm text-gray-300">
                    {product?.owner?.shopDescription}
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex justify-between items-center px-10 py-4">
            <p className="text-white text-base">{product.caption}</p>
            <p className="text-white text-base">RS. {product.price}</p>
            </div>
            {sliderId !== product._id && (
              <img
                className="w-full h-96 content-center mx-auto"
                src={product.imageUrls[0]}
                onMouseOver={(e) =>
                  product.imageUrls.length > 1 &&
                  handleSliderToggle({ e, id: product._id })
                }
                alt="Product"
              />
            )}
            {sliderToggle && sliderId === product._id && (
              <Carousel imageUrls={imageUrlValue} />
            )}
            <div className="px-10 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <FaLocationDot className="text-white" />
                  <p className="text-white text-sm font-semibold">
                    {`${product.owner.shopAddress.area} , ${product.owner.shopAddress.city} , ${product.owner.shopAddress.state}`}
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex gap-1 items-center text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <p className="text-white text-sm font-semibold">
                      {product?.overallRating}
                    </p>
                    <IoIosStar className="text-yellow-200" />
                  </div>
                  <IoBookmarkOutline className="text-xl mx-1 text-white" />
                </div>
              </div>
            </div>
            <div className="flex justify-between border-t-2 border-gray-800 shadow-xl-2 py-1 px-8">
              <div className="flex gap-1 justify-center items-center text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <div
                 onClick={async (e) => {
                  const reply = await handleLike({ e, id: product._id });
                  toast({
                    className: 'bg-black/20 border-gray-800 text-[#32de84] capitalize font-semibold text-lg',
                    title: `${reply}`,
                  });
                }}
                  className="cursor-pointer"
                >
                  {product?.likes.includes(user._id) ? (
                    <Heart className="text-red-800 fill-red-600" />
                  ) : (
                    <Heart className="text-white" />
                  )}
                </div>
                <div className="hidden sm:flex justify-center items-center gap-1">
                  <p className="text-white text-sm font-semibold">
                    {product?.likes.length ? product.likes.length : ""}
                  </p>{" "}
                  <span
                    onClick={(e) => handleLikeToggle({ e, id: product._id })}
                    className="cursor-pointer text-white"
                  >
                    Like
                  </span>
                  {likeToggle && <LikeCard Likes={likesValue} />}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                    onTouchStart={(e) =>
                      handleLikeToggle({ e, id: product._id })
                    }
                  >
                    <div className="flex justify-center items-center gap-1 sm:hidden">
                      <p className="text-white text-sm font-semibold">
                        {product?.likes.length ? product.likes.length : ""}
                      </p>{" "}
                      <div>Like</div>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="block sm:hidden bg-black border-gray-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex justify-end">
                        <AlertDialogCancel>
                          <X />
                        </AlertDialogCancel>
                      </AlertDialogTitle>

                      <AlertDialogDescription className="overflow-scroll max-h-[600px]">
                        {product?.likes.length ? (
                          <LikeCard Likes={likesValue} />
                        ) : (
                          <span className="font-bold text-xl text-white">
                            Not like yet
                          </span>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <button className="flex gap-1 items-center text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <MessageCircle />
                <div className="sm:flex justify-center items-center gap-1 hidden">
                  <p className="text-white text-sm font-semibold">
                    {product?.comments.length ? product.comments.length : ""}
                  </p>{" "}
                  <span
                    onClick={(e) => handleCommentToggle({ e, id: product._id })}
                  >
                    comment
                  </span>
                  {commentToggle && (
                    <CommentCard
                      Comments={commentsValue}
                      productId={productId}
                    />
                  )}
                </div>

                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                    onTouchStart={(e) =>
                      handleCommentToggle({ e, id: product._id })
                    }
                  >
                    <div className="flex justify-center items-center gap-1 sm:hidden">
                      <p className="text-white text-sm font-semibold">
                        {product?.comments.length
                          ? product.comments.length
                          : ""}
                      </p>{" "}
                      <div>comment</div>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="block sm:hidden bg-black border-gray-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex justify-end">
                        <AlertDialogCancel className="bg-black text-white">
                          <X />
                        </AlertDialogCancel>
                      </AlertDialogTitle>

                      <AlertDialogDescription className="overflow-scroll max-h-[600px]">
                        {product?.comments.length ? (
                          <CommentCard
                            Comments={commentsValue}
                            productId={productId}
                          />
                        ) : (
                          <span className="font-bold text-xl text-white">
                            Not comment yet
                          </span>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </button>
              <button className="flex gap-1 items-center text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Share2 />
                <Link to={`/productdetail/${product._id}`}>Share</Link>
              </button>
            </div>
            <div className="">
              <form
                onSubmit={(e) => handleRatingSubmit({ e, id: product._id })}
                className="flex p-2 justify-between border-t-2  border-gray-800 w-full"
              >
                <div
                  onMouseOver={(e) =>
                    handleRatingToggle({ e, id: product._id })
                  }
                  className="flex flex-col justify-center items-center w-1/2"
                >
                  {/* <input
                    type="range"
                    id={ratingId}
                    min="0"
                    max="5"
                    step="0.1"
                    onChange={handleRatingChange}
                    className="w-full"
                  /> */}

                 
                    <Slider
                      defaultValue={[1]}
                      max={5}
                      step={0.1}
                      id="rating"
                      onValueChange={(newValue)=> handleRatingChange({newValue , id: ratingId})}
                    />

                  {ratingId === product._id && (
                    <span className="text-lg text-white font-bold ml-2">
                      {ratingForm[product._id]}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className=" text-white hover:bg-gray-700 hover:text-white rounded-xl border-2 border-gray-800 shadow-md font-bold py-2 px-4"
                >
                  Submit Rating
                </button>
              </form>
            </div>
          </div>
          
        ))}
      </div>
    </>
  );
};

export default ProductCard;
