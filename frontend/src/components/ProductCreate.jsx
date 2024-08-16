import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { FaUpload } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";
import { Link, useNavigate } from "react-router-dom";
import { updateShopkeeper } from "../api/shopkeeperApi";
function ProductCreate() {
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleImageSubmit = (element) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
console.log(files[0]?.name)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          owner: user._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      const value = await updateShopkeeper({shopkeeperId: data.product.owner , product: data.product._id})
      if(!value) {
        setError("product not added in your list")
        return;
      }
      navigate(`/`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-5 mt-10">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between my-5 px-4">
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <div className="flex justify-end">
            <button
              disabled={loading || uploading}
              type="submit"
              className="bg-green-500 mb-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Add Product..." : "Add Product"}
            </button>
          </div>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="p-4 border-2 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-2">
                General Information
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="nameProduct"
                  className="block text-gray-500 font-semibold mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.productName}
                  maxLength="62"
                  minLength="5"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="descriptionProduct"
                  className="block text-gray-500 font-semibold mb-2"
                >
                  Description Product
                </label>
                <textarea
                  id="caption"
                  className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.caption}
                  minLength="5"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="flex gap-4 flex-col lg:flex-row sm:justify-center mt-4">
              <div className=" p-4 border-2 shadow-lg rounded-md">
                <label
                  htmlFor="size"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Size
                </label>
                <div className="flex gap-2">
                  <div className="bg-gray-200 w-10 h-10 border rounded flex justify-center items-center">
                    <span className="text-md">S</span>
                  </div>
                  <div className="bg-gray-200 w-10 h-10 border rounded flex justify-center items-center">
                    <span className="text-md">M</span>
                  </div>
                  <div className="bg-gray-200 w-10 h-10 border rounded flex justify-center items-center">
                    <span className="text-md">L</span>
                  </div>
                  <div className="bg-gray-200 w-10 h-10 border rounded flex justify-center items-center">
                    <span className="text-md">XL</span>
                  </div>
                  <div className="bg-gray-200 w-10 h-10 border rounded flex justify-center items-center">
                    <span className="text-md">XXL</span>
                  </div>
                </div>
              </div>

              <div className=" p-4 border-2 shadow-lg rounded-md ">
                <label
                  htmlFor="gender"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Gender
                </label>
                <div className="flex gap-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="men"
                      name="gender"
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      value="Men"
                      checked={gender === "Men"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="men" className="ml-2 text-gray-700">
                      Men
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="woman"
                      name="gender"
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      value="Woman"
                      checked={gender === "Woman"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="woman" className="ml-2 text-gray-700">
                      Woman
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="unisex"
                      name="gender"
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      value="Unisex"
                      checked={gender === "Unisex"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="unisex" className="ml-2 text-gray-700">
                      Unisex
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="p-4 border-2 shadow-lg rounded-md">
            <h2 className="text-lg font-semibold mb-2">Upload Img</h2>
            <div className="flex gap-4">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex w-28 h-24 justify-center items-center gap-1"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain border-2 rounded-lg"
                  />
                   <MdDelete
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="flex text-red-700 hover:opacity-75"
                  />
                  
                </div>
              ))}
            <div className="flex justify-center items-center mb-4 border-2 border-dashed h-24 w-28 border-cyan-300">
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                id="images"
                accept="image/*"
                multiple
                hidden
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
             {files[0] ? 
             <div className="flex flex-col justify-center items-center gap-2">
               <h1>{files[0]?.name}</h1>
               <div className="flex gap-2">
              <label for="images"><IoMdAdd /></label>
              <FaUpload 
                onClick={handleImageSubmit}
                disabled={loading || uploading}
                className="p-1 cursor-pointer text-xl text-black-700 border border-zinc-700 rounded uppercase hover:shadow-lg" /> 
                </div>
                </div>
              : 
              <label for="images"><IoMdAdd /></label>}
            </div>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border-2 shadow-lg rounded-md my-2">
            <h2 className="text-lg font-semibold mb-2">Pricing</h2>
            <div className="flex gap-6 justify-center items-center">
              <div className="mb-4 w-2/5">
                <label
                  htmlFor="basePricing"
                  className="block text-gray-500 font-semibold mb-2"
                >
                  Base Pricing
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 w-2/5">
                <label
                  htmlFor="discount"
                  className="block text-gray-500 font-semibold mb-2"
                >
                  Discount
                </label>
                <input
                  type="number"
                  id="discount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="p-4 border-2 shadow-lg rounded-md my-2">
            <h2 className="text-lg font-semibold mb-2">Category</h2>

            <div className="mb-4">
              <label
                htmlFor="productCategory"
                className="block text-gray-500 font-semibold mb-2"
              >
                Product Category
              </label>
              <input
                type="text"
                id="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductCreate;
