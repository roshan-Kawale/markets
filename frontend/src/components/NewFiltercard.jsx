import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { productAtom } from "../atoms/store";
import { useAtom } from "jotai";

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

const shopCategories = ["All", "Clothes", "Electronics", "Hardware"];

export default function NewFilterCard() {
  const [filterType, setFilterType] = useState("product");
  const [rating, setRating] = useState(0);
  const [selectedProductCategory, setSelectedProductCategory] = useState("all");
  const [selectedProductSubcategory, setSelectedProductSubcategory] =
    useState("");
  const [selectedShopCategory, setSelectedShopCategory] = useState("All");

  const [filterData, setFilterData] = useState("");
  const [_, setProducts] = useAtom(productAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setFilterData({
      searchTerm: urlParams.get("searchTerm") || "",
      city: urlParams.get("city") || "",
      rating: urlParams.get("rating") || "",
      minPrice: urlParams.get("minPrice") || "",
      maxPrice: urlParams.get("maxPrice") || "",
      productCategory : urlParams.get("productCategory") || "",
      productSubcategory : urlParams.get("productSubcategory") || "",
    });

    const fetchProducts = async () => {
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}api/product/getall?${searchQuery}`
        );
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, [window.location.search]);

  const handleChange = (id, value) => {
    setFilterData((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log(filterData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(filterData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        urlParams.set(key, value);
      }
    });
    const searchQuery = urlParams.toString();
    navigate(`/?${searchQuery}`);
  };

  const handleProductCategoryChange = (value) => {
    setSelectedProductCategory(value);
    setSelectedProductSubcategory("");
  };

  return (
    <ScrollArea>
      <Card className="w-full  mx-auto border-none">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-1">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-type"
                checked={filterType === "shop"}
                onCheckedChange={(checked) =>
                  setFilterType(checked ? "shop" : "product")
                }
              />
              <Label htmlFor="filter-type">
                {filterType === "shop" ? "Shop" : "Product"}
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                id="city"
                value={filterData.city}
                onValueChange={(value) => handleChange("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chandrapur">Chandrapur</SelectItem>
                  <SelectItem value="Gadchiroli">Gadchiroli</SelectItem>
                  <SelectItem value="Nagpur">Nagpur</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {filterType === "product" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="productCategory">Product Category</Label>
                    <Select
                      id="productCategory"
                      value={filterData.productCategory}
                      onValueChange={(value) => {
                        handleProductCategoryChange(value);
                        handleChange("productCategory", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.keys(productCategories).map((category) => (
                          <SelectItem
                            value={category}
                            id={`product-category-${category}`}
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Product Subcategory</Label>
                    <Select
                      value={filterData.productSubcategory}
                      onValueChange={(value) =>
                        handleChange("productSubcategory", value)
                      }
                    >
                      <SelectTrigger id="productSubcategory">
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories[selectedProductCategory].map(
                          (subcategory) => (
                            <SelectItem
                              key={subcategory}
                              value={subcategory.toLowerCase()}
                            >
                              {subcategory}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <AccordionItem value="shop-category">
                  <AccordionTrigger>Shop Category</AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup
                      value={selectedShopCategory}
                      onValueChange={setSelectedShopCategory}
                    >
                      {shopCategories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={category}
                            id={`shop-category-${category}`}
                          />
                          <Label htmlFor={`shop-category-${category}`}>
                            {category}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>

            {filterType === "product" && (
              <div className="space-y-2">
                <Label>Rating</Label>
                <Slider
                  id="rating"
                  min={0}
                  max={5}
                  step={0.1}
                  value={[filterData.rating]}
                  onValueChange={(value) => {
                    setRating(value[0]);
                    handleChange("rating", value[0]);
                  }}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {rating.toFixed(1)} stars and above
                </div>
              </div>
            )}

            {filterType === "product" && (
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="minPrice"
                    value={filterData.minPrice}
                    onChange={(e) =>
                      handleChange(
                        "minPrice",
                        e.target.value ? parseFloat(e.target.value) : ""
                      )
                    }
                    type="number"
                    placeholder="Min"
                    className="w-20"
                  />
                  <span>to</span>
                  <Input
                    id="maxPrice"
                    value={filterData.maxPrice}
                    onChange={(e) =>
                      handleChange(
                        "maxPrice",
                        e.target.value ? parseFloat(e.target.value) : ""
                      )
                    }
                    type="number"
                    placeholder="Max"
                    className="w-20"
                  />
                </div>
              </div>
            )}

            {/* {filterType === 'shop' && (
            <div className="space-y-2">
              <Label>Shop Type</Label>
              <RadioGroup defaultValue="all">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="shop-type-all" />
                  <Label htmlFor="shop-type-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="shop-type-online" />
                  <Label htmlFor="shop-type-online">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="physical" id="shop-type-physical" />
                  <Label htmlFor="shop-type-physical">Physical Store</Label>
                </div>
              </RadioGroup>
            </div>
          )} */}
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
    </ScrollArea>
  );
}
