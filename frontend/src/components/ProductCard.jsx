import React, { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { productAtom, userAtom } from "../atoms/store";
import CommentCard from "./CommentCard";
import Slider from "./Slider";
import LikeCard from "./LikeCard";

const ProductCard = () => {
  const [products, setProducts] = useAtom(productAtom);
  const [likeToggle, setLikeToggle] = useState(false);
  const [likesValue, setLikesValue] = useState("");
  const [likeProductId, setLikeProductId] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [commentsValue, setCommentsValue] = useState([]);
  const [commentToggle, setCommentToggle] = useState(false);
  const [productId, setProductId] = useState(null);
  const [sliderToggle, setSliderToggle] = useState(false);
  const [imageUrlValue, setImageUrlValue] = useState([]);
  const [sliderId, setSliderId] = useState(null);
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingForm, setRatingForm] = useState({});
  const [ratingId, setRatingId] = useState(false);

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `/api/product/getall?${searchQuery}`
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLike = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/product/like/${id}`, {
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
      fetchData(); // Call fetchData again to re-fetch the product data
    }
  };

  const addCommentHandler = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `/api/product/comment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id, comment: commentValue }),
        }
      );
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
      fetchData(); // Call fetchData again to re-fetch the product data
    }
  };

  const handleLikeToggle = async ({ e, id }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/product/get/${id}`);
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
      const res = await fetch(`/api/product/get/${id}`);
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
      const res = await fetch(`/api/product/get/${id}`);
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
        `/api/product/rate/${id}`,
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

  const handleRatingChange = (e) => {
    setRatingForm({
      ...ratingForm,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className="lg:absolute left-1/4 md:w-2/3 lg:w-1/2 lg:mt-14 md:mt-28 flex flex-wrap justify-center mb-4">
        {products?.map((product, index) => (
          <div
            key={index}
            className="w-full rounded-xl border-2 overflow-hidden mx-4 mb-4 p-2 shadow-lg bg-white"
          >
            <div className="flex justify-between items-center">
              <Link
                to={`/profile/${product?.owner.userId}`}
                className="flex items-center cursor-pointer gap-4"
              >
                <img
                  src="https://picsum.photos/200"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {product.owner.shopName}
                  </h2>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </Link>
            </div>
            <div className="px-2 py-4">
              <p className="text-gray-800 text-base">{product.caption}</p>
            </div>
            {sliderId !== product._id && (
              <img
                className="w-full h-96 content-center"
                src={product.imageUrls[0]}
                onMouseOver={(e) =>
                  product.imageUrls.length > 1 &&
                  handleSliderToggle({ e, id: product._id })
                }
                alt="Product"
              />
            )}
            {sliderToggle && sliderId === product._id && (
              <Slider imageUrls={imageUrlValue} />
            )}
            <div className="px-2 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaLocationDot />
                  <p className="text-gray-500 text-sm font-semibold">
                    {`${product.owner.shopAddress.area} , ${product.owner.shopAddress.city} , ${product.owner.shopAddress.state}`}
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex gap-1 items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <p className="text-gray-500 text-sm font-semibold">
                      {product?.overallRating}
                    </p>
                    <IoIosStar />
                  </div>
                  <IoBookmarkOutline className="text-xl mx-1" />
                </div>
              </div>
            </div>
            <div className="flex justify-between border-t-2 shadow-xl-2 py-1">
              <div className="flex gap-1 justify-center items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <div
                  onClick={(e) => handleLike({ e, id: product._id })}
                  className="cursor-pointer"
                >
                  {product?.likes.includes(user._id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </div>
                <div className="flex justify-center items-center gap-1">
                  <p className="text-gray-500 text-sm font-semibold">
                    {product?.likes.length ? product.likes.length : ""}
                  </p>{" "}
                  <span
                    onClick={(e) => handleLikeToggle({ e, id: product._id })}
                    className="cursor-pointer"
                  >
                    Like
                  </span>
                  {likeToggle && <LikeCard Likes={likesValue} />}
                </div>
              </div>
              <button className="flex gap-1 items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <FaRegCommentDots />
                <div className="flex justify-center items-center gap-1">
                  <p className="text-gray-500 text-sm font-semibold">
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
              </button>
              <button className="flex gap-1 items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <FaRegShareFromSquare />
                <div>Share</div>
              </button>
            </div>
            {/* <div className="flex items-center justify-center">
              <form
                className="flex justify-between p-1 items-center border-2 rounded-lg w-3/4"
                onSubmit={(e) => addCommentHandler({ e, id: product._id })}
              >
                <input
                  type="text"
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Comment Here..."
                  required
                  className="focus:outline-none"
                />

                <button type="submit" variant="contained" className="mr-2">
                  Add
                </button>
              </form>
            </div> */}
            <div>
              <form
                onSubmit={(e) => handleRatingSubmit({ e, id: product._id })}
                className="flex p-2 justify-between border-2 rounded-xl shadow-lg w-full"
              >
                <div
                  onMouseOver={(e) =>
                    handleRatingToggle({ e, id: product._id })
                  }
                  className="flex flex-col justify-center items-center w-1/2"
                >
                  <input
                    type="range"
                    id={ratingId}
                    min="0"
                    max="5"
                    step="0.1"
                    onChange={handleRatingChange}
                    className="w-full"
                  />
                  {ratingId === product._id && (
                    <span className="text-lg font-bold ml-2">
                      {ratingForm[product._id]}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className=" text-gray-800 hover:bg-gray-700 hover:text-white rounded-xl border-2 shadow-md font-bold py-2 px-4"
                >
                  Submit Rating
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
      {/* {commentToggle && <CommentCard Comments={commentsValue} />} */}
    </>
  );
};

export default ProductCard;
