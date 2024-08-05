import React, { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/product/getall");
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
      const res = await fetch(`/api/product/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id , comment : commentValue }),
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

  return (
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
          <img
            className="w-full h-96 content-center"
            src={product.imageUrls[0]}
            alt="Product"
          />
          <div className="px-2 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaLocationDot />
                <p className="text-gray-500 text-sm font-semibold">
                  {`${product.owner.shopAddress.area} , ${product.owner.shopAddress.city} , ${product.owner.shopAddress.state}`}
                </p>
              </div>
              <div className="flex items-center">
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
                <span>Like</span>
              </div>
            </div>
            <button className="flex gap-1 items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <FaRegCommentDots />
              <div className="flex justify-center items-center gap-1">
                <p className="text-gray-500 text-sm font-semibold">
                  {product?.comments.length ? product.comments.length : ""}
                </p>{" "}
                <span>comment</span>
              </div>
              
               
                
            </button>
            <button className="flex gap-1 items-center text-gray-500 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <FaRegShareFromSquare />
              <div>Share</div>
            </button>
          </div>
          <div className="flex items-center justify-center">
                  <form className="flex justify-between p-1 items-center border-2 rounded-lg w-3/4" onSubmit={(e)=> addCommentHandler({e, id: product._id})}>
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

                  {/* {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <p>No comments Yet</p>
          )} */}
                </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
