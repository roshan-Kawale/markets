import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "../hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
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
  ChevronLeft,
  ChevronRight,
  Calendar,
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
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  // Convert single image URL to array if needed
  const imageUrls = Array.isArray(productData?.imageUrls)
    ? productData?.imageUrls
    : productData?.imageUrls
      ? [productData?.imageUrls]
      : []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const handleBookNow = () => {
    toast({
      title: "Booking initiated",
      description: "You'll be redirected to complete your booking",
    })
    // Add your booking logic here
  }

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
    <div className=" flex justify-center items-center mt-16 dark">
      {productData?.length !== null && (
         <Card className="w-full max-w-5xl mx-auto shadow-lg border-2 bg-[#121212]">
         <div className="flex flex-col lg:flex-row">
           {/* Product Post Section */}
           <div className="relative lg:w-1/2 p-4">
             <div className="absolute right-6 top-6 z-10">
               <DropdownMenu>
                 <DropdownMenuTrigger className="outline-none bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                   <EllipsisVertical className="h-5 w-5" />
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end" className="w-40">
                   <Link to={`/productEdit/${productData._id}`}>
                     <DropdownMenuItem className="py-2 cursor-pointer">Edit</DropdownMenuItem>
                   </Link>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem className="py-2 cursor-pointer text-red-500 dark:text-red-400">
                     Delete
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             </div>
 
             <CardHeader>
               <div className="flex justify-between items-center">
                 <div className="flex items-center cursor-pointer gap-3">
                   <Avatar className="h-10 w-10 border-2 border-primary/20">
                     <AvatarImage src="https://picsum.photos/200" alt="Profile" />
                     <AvatarFallback>SP</AvatarFallback>
                   </Avatar>
                   <div>
                     <CardTitle className="text-lg hover:text-primary transition-colors">
                       <Link to={`/profile/${productData?.owner?.userId}`}>{productData?.owner?.shopName}</Link>
                     </CardTitle>
                   </div>
                 </div>
               </div>
             </CardHeader>
 
             {/* Image Carousel */}
             <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
               {imageUrls.length > 0 ? (
                 <>
                   <img
                     src={`${imageUrls[currentImageIndex]}?height=400&width=500`}
                     alt={`Product image ${currentImageIndex + 1}`}
                     className="w-full h-full object-cover transition-opacity duration-300"
                   />
 
                   {imageUrls.length > 1 && (
                     <>
                       <button
                         onClick={prevImage}
                         className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                         aria-label="Previous image"
                       >
                         <ChevronLeft className="h-5 w-5" />
                       </button>
                       <button
                         onClick={nextImage}
                         className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                         aria-label="Next image"
                       >
                         <ChevronRight className="h-5 w-5" />
                       </button>
 
                       <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                         {imageUrls.map((_, index) => (
                           <button
                             key={index}
                             onClick={() => setCurrentImageIndex(index)}
                             className={`h-2 w-2 rounded-full transition-all ${
                               currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                             }`}
                             aria-label={`Go to image ${index + 1}`}
                           />
                         ))}
                       </div>
                     </>
                   )}
                 </>
               ) : (
                 <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                   <p className="text-gray-500 dark:text-gray-400">No image available</p>
                 </div>
               )}
             </div>
 
             <CardContent className="space-y-4">
               <p className="text-sm dark:text-gray-300">{productData?.caption}</p>
 
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                   <MapPin className="h-4 w-4" />
                   <p className="text-xs font-medium">
                     {`${productData?.owner?.shopAddress?.area}, ${productData?.owner?.shopAddress?.city}, ${productData?.owner?.shopAddress?.state}`}
                   </p>
                 </div>
 
                 <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
                     <p className="font-bold text-yellow-600 dark:text-yellow-400">
                       {productData?.overallRating || "0"}
                     </p>
                     <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                   </div>
                   <button className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                     <Bookmark className="h-5 w-5" />
                   </button>
                 </div>
               </div>
 
               <div className="flex gap-6 items-center pt-2">
                 <button
                   onClick={(e) => handleLike({ e, id: productData._id })}
                   className="flex items-center gap-1 group"
                 >
                   {productData?.likes?.some((like) => like._id === user._id) ? (
                     <Heart className="text-red-600 fill-red-600 h-5 w-5" />
                   ) : (
                     <Heart className="h-5 w-5 group-hover:text-red-500 transition-colors" />
                   )}
                   <span className="text-sm font-medium">
                     {productData?.likes?.length ? productData?.likes?.length : ""}
                   </span>
                 </button>
 
                 <button className="flex items-center gap-1 group">
                   <MessageCircle className="h-5 w-5 group-hover:text-primary transition-colors" />
                   <span className="text-sm font-medium">
                     {productData?.comments?.length ? productData?.comments?.length : ""}
                   </span>
                 </button>
 
                 <button className="flex items-center gap-1 group">
                   <Share2 className="h-5 w-5 group-hover:text-primary transition-colors" />
                 </button>
               </div>
             </CardContent>
 
             <div className="px-6 pb-4 space-y-4">
               <div className="flex flex-col space-y-2">
                 <p className="text-sm font-medium">Rate this product</p>
                 <div className="flex p-3 justify-between items-center border-2 rounded-xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                   <div className="flex flex-col items-center w-1/2">
                     <input
                       type="range"
                       id={ratingId}
                       min="0"
                       max="5"
                       step="0.1"
                       className="w-full accent-primary"
                       value={rating}
                       onChange={(e) => setRating(e.target.value)}
                     />
                     <span className="text-lg font-bold mt-1">{rating}</span>
                   </div>
                   <Button
                     onClick={(e) => handleRatingSubmit({ e, id: productData._id })}
                     variant="default"
                     className="rounded-xl font-medium"
                   >
                     Submit Rating
                   </Button>
                 </div>
               </div>
 
               
             </div>
           </div>
 
           {/* Comments and Likes Section */}
           <div className="lg:w-1/2 p-4 border-t lg:border-t-0 lg:border-l dark:border-gray-800">
             <Tabs defaultValue="comments" className="w-full">
               <TabsList className="grid w-full grid-cols-2 mb-4">
                 <TabsTrigger value="comments">Comments</TabsTrigger>
                 <TabsTrigger value="likes">Likes</TabsTrigger>
               </TabsList>
 
               <TabsContent value="comments" className="space-y-4">
                 <ScrollArea className="h-[400px] w-full rounded-md border dark:border-gray-800 p-4">
                   <div className="space-y-4">
                     {productData?.comments?.length > 0 ? (
                       productData.comments.map((comment, index) => (
                         <div key={index} className="flex items-start space-x-4 border-b dark:border-gray-800 py-3 px-2">
                           <Avatar>
                             <AvatarImage src="/placeholder.svg?height=40&width=40" alt={`@${comment.user.name}`} />
                             <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                           </Avatar>
                           <div className="space-y-1">
                             <Link
                               to={`/${user.role === "shopkeeper" ? "profile" : user.role === "consumer" ? "customer" : ""}/${comment?.user._id}`}
                             >
                               <p className="text-sm font-medium hover:text-primary transition-colors">
                                 {comment.user.name}
                               </p>
                             </Link>
                             <p className="text-sm text-gray-600 dark:text-gray-400">{comment.comment}</p>
                            
                           </div>
                         </div>
                       ))
                     ) : (
                       <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                         <MessageCircle className="h-10 w-10 text-gray-400 mb-2" />
                         <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
                         <p className="text-sm text-gray-400 dark:text-gray-500">Be the first to comment</p>
                       </div>
                     )}
                   </div>
                 </ScrollArea>
 
                 <form onSubmit={addCommentHandler} className="flex space-x-2">
                   <Input
                     type="text"
                     placeholder="Add a comment..."
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     onKeyPress={handleKeyPressComment}
                     className="flex-grow dark:bg-gray-900 dark:border-gray-800"
                   />
                   <Button type="submit" variant="default" disabled={!comment.trim()}>
                     <MessageCircle className="w-4 h-4 mr-2" />
                     Post
                   </Button>
                 </form>
               </TabsContent>
 
               <TabsContent value="likes">
                 <ScrollArea className="h-[450px] w-full rounded-md border dark:border-gray-800 p-4">
                   <div className="space-y-2">
                     {productData?.likes?.length > 0 ? (
                       productData.likes.map((like, index) => (
                         <div
                           key={index}
                           className="flex items-center justify-between border-b dark:border-gray-800 py-3 px-2"
                         >
                           <div className="flex items-center space-x-3">
                             <Avatar>
                               <AvatarImage src="/placeholder.svg?height=40&width=40" alt={`@${like.name}`} />
                               <AvatarFallback>{like.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div>
                               <Link to={`/profile/${like?._id}`}>
                                 <p className="text-sm font-medium hover:text-primary transition-colors">{like.name}</p>
                               </Link>
                             </div>
                           </div>
                           <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                             <Heart className="h-4 w-4" />
                             <span className="sr-only">Like</span>
                           </Button>
                         </div>
                       ))
                     ) : (
                       <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                         <Heart className="h-10 w-10 text-gray-400 mb-2" />
                         <p className="text-gray-500 dark:text-gray-400">No likes yet</p>
                         <p className="text-sm text-gray-400 dark:text-gray-500">Be the first to like</p>
                       </div>
                     )}
                   </div>
                 </ScrollArea>
               </TabsContent>
             </Tabs>
             <Button
                 onClick={handleBookNow}
                 className="w-full mt-16 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md"
               >
                 <Calendar className="mr-2 h-5 w-5" />
                 Book Now
               </Button>

           </div>
         </div>
       </Card>
      )}
    </div>
  );
}

{/* <Card className="w-full max-w-4xl mx-auto shadow-md">
<div className="flex flex-col md:flex-row">
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

  <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l">
    <CardHeader>
      <CardTitle>
        {likeandCommentToggle ? "Comments" : "Likes"}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        
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
</Card> */}
