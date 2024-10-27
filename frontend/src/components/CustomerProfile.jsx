import { useEffect, useState } from "react";
import { X, Edit2, Check, Upload, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";
import { useParams } from "react-router-dom";

export default function CustomerProfile({}) {
  const [user] = useAtom(userAtom);
  const { userId } = useParams();
  const [categories, setCategories] = useState(["Electronics", "Books"]);
  const [cities, setCities] = useState(["New York", "London"]);
  const [newCategory, setNewCategory] = useState("");
  const [newCity, setNewCity] = useState("");
  const [editNameMode, setEditNameMode] = useState(false);
  const [editedName, setEditedName] = useState(user?.name);
  const [editedAvatarUrl, setEditedAvatarUrl] = useState(
    "https://github.com/shadcn.png"
  );
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(false);

  const updateCustomerData = async (type , updateData) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/customer/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId: customerData.customer._id , [type]: updateData }),
        }
      );
      const data = await res.json();
      if (data.success === false) { 
        return data.message;
      }
      return data.message;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}api/customer/get/${userId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setIsCustomer(false);
          setLoading(false);
          return;
        }
        setCustomerData(data);
        setIsCustomer(true);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCustomerData();
  }, [userId]);

  useEffect(() => {
    if (isCustomer) {
      setEditedName(customerData.userData.name);
      setCategories(customerData.customer.categories);
      setCities(customerData.customer.cities);
    }
  }, [customerData]);

  const handleAddItem = async (type) => {
    if (type === "category" && newCategory.trim()) {
      await updateCustomerData(type , newCategory.trim())
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    } else if (type === "city" && newCity.trim()) {
      await updateCustomerData(type , newCity.trim())
      setCities([...cities, newCity.trim()]);
      setNewCity("");
    }
  };

  const handleRemoveItem = async (type, item) => {
    if (type === "category") {
      await updateCustomerData(type , item)
      setCategories(categories.filter((cat) => cat !== item));
    } else {
      await updateCustomerData(type , item)
      setCities(cities.filter((city) => city !== item));
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem(type);
    }
  };

  const toggleEditNameMode = () => {
    setEditNameMode(!editNameMode);
    if (editNameMode) {
      console.log("Saving name change:", editedName);
    }
  };

  const handleAvatarChange = () => {
    setShowAvatarInput(!showAvatarInput);
    if (showAvatarInput) {
      console.log("Saving avatar change:", editedAvatarUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setEditedAvatarUrl("");
    console.log("Avatar removed");
  };

  return (
    <div className="flex justify-center items-center mt-24">
      {loading ? (
        <div>Loading</div>
      ) : isCustomer ? (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Customer Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={editedAvatarUrl} alt={editedName} />
                <AvatarFallback>
                  {editedName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {editNameMode ? (
                    <Input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-lg font-medium"
                      placeholder="Enter name"
                    />
                  ) : (
                    <h2 className="text-lg font-medium">{editedName}</h2>
                  )}
                  <Button
                    onClick={toggleEditNameMode}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    {editNameMode ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Edit2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex space-x-2">
                <Button
                  onClick={handleAvatarChange}
                  variant="outline"
                  size="sm"
                >
                  {showAvatarInput ? "Save Avatar" : "Change Avatar"}
                </Button>
                <Button
                  onClick={handleRemoveAvatar}
                  variant="outline"
                  size="sm"
                >
                  Remove Avatar
                </Button>
              </div>
              {showAvatarInput && (
                <Input
                  type="text"
                  value={editedAvatarUrl}
                  onChange={(e) => setEditedAvatarUrl(e.target.value)}
                  className="mt-2"
                  placeholder="Enter new avatar URL"
                />
              )}
            </div>

            <div>
              <Label htmlFor="categories">Shop Categories</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 ml-1 hover:bg-secondary-foreground hover:text-secondary rounded-full p-0"
                      onClick={() => handleRemoveItem("category", category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </span>
                ))}
              </div>
              <div className="flex mt-2">
                <Input
                  id="categories"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, "category")}
                  placeholder="Add a category"
                  className="mr-2"
                />
                <Button
                  onClick={() => handleAddItem("category")}
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="cities">Preferred Cities</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {cities.map((city, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {city}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 ml-1 hover:bg-secondary-foreground hover:text-secondary rounded-full p-0"
                      onClick={() => handleRemoveItem("city", city)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </span>
                ))}
              </div>
              <div className="flex mt-2">
                <Input
                  id="cities"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, "city")}
                  placeholder="Add a city"
                  className="mr-2"
                />
                <Button
                  onClick={() => handleAddItem("city")}
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>customer not exist</div>
      )}
    </div>
  );
}
