import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useNavigate, useParams } from "react-router-dom"
import { useAtom } from "jotai"
import { userAtom } from "../atoms/store";

export default function ShopkeeperProfileEdit() {
  const [user] = useAtom(userAtom);
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id) {
    const fetchShopkeeperData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}api/shopkeeper/get/${user._id}`
        );
        const data = await res.json();
        console.log(data);
        setFormData({
          shopkeeperId: data.shopkeeper._id,
          userId: data.userData._id,
          name: data.userData.name,
          shopName: data.shopkeeper.shopName,
          shopDescription: data?.shopkeeper?.shopDescription,
          shopAddress: data.shopkeeper.shopAddress
        });
        console.log(formData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchShopkeeperData();
  }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target
    if(name === "area" || name == "city" || name == "district" || name=="state" || name == "country" ) {
      setFormData((prevData) => ({
        ...prevData,
        shopAddress: {
          ...prevData.shopAddress,
          [name]: value,
        },
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }
  }

  const shopkeeperData = {
    shopkeeperId: formData.shopkeeperId,
    shopName: formData.shopName,
    shopDescription: formData.shopDescription,
    shopAddress: formData.shopAddress
  };

  const userData = {
    userId: formData.userId, 
    name:formData.name
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const resUser = await fetch("${process.env.REACT_APP_BASE_URL}api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const dataUser = await resUser.json();
      console.log("User data updated ", dataUser)
      if (dataUser.success === false) {
        setLoading(false);
        setError(dataUser.message);
        return;
      }

      const resShopkeeper = await fetch("${process.env.REACT_APP_BASE_URL}api/shopkeeper/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopkeeperData),
      });
      const dataShopkeeper = await  resShopkeeper.json();
      console.log("Shopkeeper data updated ", dataShopkeeper)
      if (dataShopkeeper.success === false) {
        setLoading(false);
        setError(dataShopkeeper.message);
        return;
      }

      
      setLoading(false);
      setError(null);
      navigate(`/profile/${user._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    // Here you would typically send the data to an API or perform other actions
  }

  return (
   <div className="flex justify-center items-center mt-20">
    {formData && <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="userName">Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input 
                id="shopName" 
                name="shopName"
                value={formData?.shopName}
                onChange={handleChange}
                placeholder="Enter your shop name" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Shop Description</Label>
              <Textarea 
                id="shopDescription" 
                name="shopDescription"
                value={formData.shopDescription}
                onChange={handleChange}
                placeholder="Describe your shop" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Address</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="area">Area</Label>
                  <Input 
                    id="area" 
                    name="area"
                    value={formData?.shopAddress?.area}
                    onChange={handleChange}
                    placeholder="Enter area" 
                  />
                </div>
                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={handleSelectChange} value={formData.country}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city"
                    value={formData?.shopAddress?.city}
                    onChange={handleChange}
                    placeholder="Enter city" 
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="district">District</Label>
                  <Input 
                    id="district" 
                    name="district"
                    value={formData?.shopAddress?.district}
                    onChange={handleChange}
                    placeholder="Enter district" 
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state"
                    value={formData?.shopAddress?.state}
                    onChange={handleChange}
                    placeholder="Enter state" 
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    name="country"
                    value={formData?.shopAddress?.country}
                    onChange={handleChange}
                    placeholder="Enter Country" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>}
    </div>
  )
}