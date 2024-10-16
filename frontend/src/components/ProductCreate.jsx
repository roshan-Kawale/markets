import React, { useEffect, useState } from "react";
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
import {  useNavigate, useParams } from "react-router-dom";
import { updateShopkeeper } from "../api/shopkeeperApi";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";

const productCategories = {
  all: ["All"],

  MensClothing: [
    "T-shirts",
    "Shirts",
    "Pants & Trousers",
    "Jeans",
    "Jackets & Coats",
    "Traditional Wear",
    "Innerwear & Socks",
  ],
  WomenClothing: [
    "Kurtis & Tunics",
    "Sarees",
    "Tops & T-shirts",
    "Dresses",
    "Jeans & Leggings",
    "Jackets & Sweaters",
    "Ethnic Wear",
  ],
  KidsClothing: [
    "T-shirts & Tops",
    "Pants & Shorts",
    "Dresses",
    "School Uniforms",
    "Ethnic Wear",
  ],
  Footwear: ["Men's Footwear", "Women's Footwear", "Kids' Footwear"],
  Accessories: ["Belts", "Caps & Hats", "Bags", "Scarves & Stoles"],

  MobilePhones: [
    "Smartphones",
    "Phone Cases & Covers",
    "Chargers & Cables",
    "Power Banks",
    "Screen Protectors",
  ],
  LaptopsComputers: [
    "Laptops",
    "Desktops",
    "Keyboards & Mice",
    "Laptop Bags",
    "Printers & Scanners",
  ],
  HomeAppliances: [
    "Televisions",
    "Refrigerators",
    "Washing Machines",
    "Air Conditioners",
    "Water Purifiers",
  ],
  AudioHeadphones: ["Headphones", "Speakers", "Earbuds"],
  PersonalGadgets: [
    "Smartwatches",
    "Fitness Bands",
    "Cameras & Accessories",
    "Tablets",
  ],

  HandTools: [
    "Hammers",
    "Screwdrivers",
    "Wrenches",
    "Pliers",
    "Measuring Tools",
  ],
  PowerTools: [
    "Drills & Drivers",
    "Saws",
    "Grinders",
    "Sanders",
    "Power Tool Accessories",
  ],
  ElectricalSupplies: [
    "Cables & Wires",
    "Switches & Sockets",
    "Extension Cords",
    "Electrical Tapes",
    "Lighting",
  ],
  PlumbingSupplie: [
    "Pipes & Fittings",
    "Faucets",
    "Bathroom Fixtures",
    "Showers & Taps",
    "Water Pumps",
  ],
  BuildingMaterials: [
    "Cement",
    "Bricks & Blocks",
    "Paints & Primers",
    "Wall Finishes",
    "Adhesives & Sealants",
  ],
};

export const ProductForm = ({ handleSubmit ,  setFormData}) => {
  const [selectedProductCategory, setSelectedProductCategory] = useState('all')
  const [selectedProductSubcategory, setSelectedProductSubcategory] = useState('')

  const handleProductCategoryChange = (value) => {
    setSelectedProductCategory(value)
    setSelectedProductSubcategory('')
  }


  const [formData, setFormDataState] = useState({
    imageUrls: [],
    productCategory: selectedProductCategory,
    productSubcategory: selectedProductSubcategory,
  });
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //product when edit the product
  const { productId } = useParams();

  // Update formData when product category or subcategory changes
  useEffect(() => {
    setFormDataState((prevFormData) => ({
      ...prevFormData,
      productCategory: selectedProductCategory,
      productSubcategory: selectedProductSubcategory,
    }));
  }, [selectedProductCategory, selectedProductSubcategory]);

  useEffect(() => {
    setFormData(formData);
  }, [formData, setFormData]);


  const fetchProductData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/product/get/${productId}`
      );
      const data = await res.json();
      console.log(data);
      setFormDataState({
       productName: data.productName,
       caption: data.caption,
       price: data.price,
       imageUrls: data.imageUrls,
       discount: data.discount,
       category: data.category,
       productCategory: data.productCategory,
       productSubcategory: data.productSubcategory,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if(productId){
      fetchProductData();
    }
  }, []);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormDataState({
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
    setFormDataState({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    setFormDataState({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between my-5 px-4">
          <div className="flex justify-end">
            <button
              disabled={loading || uploading}
              type="submit"
              className="absolute right-10 top-14 bg-green-500 mb-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Add Product..." : "ADD"}
            </button>
          </div>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="p-4 border-2 border-gray-800 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-2">
                General Information
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="nameProduct"
                  className="block  font-semibold mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="shadow appearance-none rounded-md w-full py-2 px-3 bg-gray-600/20 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="block  font-semibold mb-2"
                >
                  Description Product
                </label>
                <textarea
                  id="caption"
                  className="shadow appearance-none  rounded-md w-full py-2 px-3 bg-gray-600/20 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.caption}
                  minLength="5"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-800 shadow-lg rounded-md">
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
                  className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                {files[0] ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="flex truncate w-20">{files[0]?.name}</h1>
                    <div className="flex gap-2">
                      <label for="images">
                        <IoMdAdd />
                      </label>
                      <FaUpload
                        onClick={handleImageSubmit}
                        disabled={loading || uploading}
                        className="p-1 cursor-pointer text-xl border border-zinc-700 rounded uppercase hover:shadow-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <label for="images">
                    <IoMdAdd />
                  </label>
                )}
              </div>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border-2 border-gray-800 shadow-lg rounded-md my-2">
            <h2 className="text-lg font-semibold mb-2">Pricing</h2>
            <div className="flex gap-6 justify-center items-center">
              <div className="mb-4 w-2/5">
                <label
                  htmlFor="basePricing"
                  className="block  font-semibold mb-2"
                >
                  Base Pricing
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  className="shadow appearance-none  rounded w-full py-2 px-3 bg-gray-600/20 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 w-2/5">
                <label
                  htmlFor="discount"
                  className="block  font-semibold mb-2"
                >
                  Discount
                </label>
                <input
                  type="number"
                  id="discount"
                  className="shadow appearance-none  rounded w-full py-2 px-3 bg-gray-600/20 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-800 shadow-lg rounded-md my-2">
            <h2 className="text-lg font-semibold mb-2">Category</h2>

            {/* <div className="mb-4">
              <label
                htmlFor="productCategory"
                className="block  font-semibold mb-2"
              >
                Product Category
              </label>
              <input
                type="text"
                id="category"
                className="shadow appearance-none rounded w-full py-2 px-3 bg-gray-600/20 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div> */}
            <Accordion type="single" collapsible className="w-full flex gap-4">             
                  <AccordionItem value="product-category" className="w-1/2">
                    <AccordionTrigger>Product Category</AccordionTrigger>
                    <AccordionContent>
                    <ScrollArea className="h-24">
                      <RadioGroup value={formData.productCategory} onValueChange={handleProductCategoryChange}>
                        {Object.keys(productCategories).map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <RadioGroupItem value={category} id="productCategory" className="text-white"/>
                            <Label htmlFor="productCategory">{category.charAt(0).toUpperCase() + category.slice(1)}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="productSubcategory" className="w-1/2 text-black">
                    <AccordionTrigger className="text-white">Product Subcategory</AccordionTrigger>
                    <AccordionContent>
                      <Select value={formData.productSubcategory} onValueChange={setSelectedProductSubcategory}>
                        <SelectTrigger id="productSubcategory">
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories[formData.productCategory || selectedProductCategory]?.map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory.toLowerCase()}>
                              {subcategory}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>      
            </Accordion>
          </div>
        </div>
      </form>
    </>
  );
};

function ProductCreate() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}api/product/create`, {
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
      const value = await updateShopkeeper({
        shopkeeperId: data.product.owner,
        product: data.product._id,
      });
      if (!value) {
        setError("product not added in your list");
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
      <div className="text-2xl font-bold" >Add New Product</div>
      <ProductForm handleSubmit={handleSubmit} setFormData={setFormData} />
    </div>
  );
}

export default ProductCreate;
