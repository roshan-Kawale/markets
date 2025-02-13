import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";
import { AlertCircle, CheckCircle2, Trash2, Upload } from "lucide-react";
import Map from "./Map";
import { userAtom, locationAtom } from "../atoms/store";
import { useAtom } from "jotai";
import { CardContent } from "./ui/card";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const shopCategories = ["Clothes", "Electronics", "Hardware"];

export default function ShopkeeperRegistration() {
  const [user, setUser] = useAtom(userAtom);
  const [location, setLocation] = useAtom(locationAtom);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [gradientPosition, setGradientPosition] = useState(0);

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    shopDescription: "",
    contactNumber: "",
    area: location?.area || "",
    city: location?._normalized_city || "",
    district: location?.state_district || "",
    state: location?.state || "",
    country: location?.country || "",
    lat: location.lat || "",
    lng: location.lng || "",
    businessType: "",
    businessLicense: null,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: user?.email,
      area: location?.area,
      city: location?._normalized_city,
      district: location?.state_district,
      state: location?.state,
      country: location?.country,
      lat: location?.lat,
      lng: location?.lng,
    }));
  }, [user, location]);

  const Data = {
    userId: user._id,
    shopName: formData.shopName,
    shopDescription: formData.shopDescription,
    shopAddress: {
      area: formData.area,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      country: formData.country,
    },
    location: {
      lat: formData.lat,
      lng: formData.lng,
    },
    businessType: formData.businessType,
    businessLicense: formData.businessLicense,
    contactNumber: formData.contactNumber,
  };

  console.log("data", Data);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientPosition((prevPosition) => (prevPosition + 1) % 200);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const handleImageSubmit = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setImageUploadError(false);

      storeImage(e.target.files[0])
        .then((url) => {
          setFormData({
            ...formData,
            businessLicense: url, // Store only a single URL in formData.url
          });
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Please upload only one image.");
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
          setUploadProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => reject(error));
        }
      );
    });
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      businessLicense: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, businessType: value }));
    setErrors((prev) => ({ ...prev, businessType: "" }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, businessLicense: e.target.files[0] }));
      setErrors((prev) => ({ ...prev, businessLicense: "" }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.shopName) newErrors.shopName = "Shop name is required";
      if (!formData.shopDescription)
        newErrors.shopDescription = "shopDescription is required";
      if (!formData.contactNumber)
        newErrors.contactNumber = "Contact number is required";
    } else if (currentStep === 2) {
      if (!formData.area) newErrors.area = "area is required";
      if (!formData.city) newErrors.city = "city is required";
      if (!formData.district) newErrors.district = "district is required";
      if (!formData.state) newErrors.state = "state is required";
      if (!formData.country) newErrors.country = "country is required";
      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
    } else if (currentStep === 3) {
      if (!formData.businessLicense)
        newErrors.businessLicense = "Business license is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/shopkeeper/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setErrors({ ...errors, submit: data.message });
        return;
      }
      setLoading(false);
      setErrors({ ...errors, submit: null });
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErrors({ ...errors, submit: error.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black mt-16 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Shopkeeper Registration
      </h1>
      <Progress value={(step / totalSteps) * 100} className="mb-6" />
      <form className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div>
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                className={errors.shopName ? "border-red-500" : ""}
              />
              {errors.shopName && (
                <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="shopDescription">shopDescription</Label>
              <Input
                id="shopDescription"
                name="shopDescription"
                value={formData.shopDescription}
                onChange={handleInputChange}
                className={errors.shopDescription ? "border-red-500" : ""}
              />
              {errors.shopDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shopDescription}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                name="ownerName"
                value={user.name}
                onChange={handleInputChange}
                className={errors.ownerName ? "border-red-500" : ""}
              />
              {errors.ownerName && (
                <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user?.email}
                onChange={handleInputChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactNumber}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Location and Business Details
            </h2>

            <div>
              <Map />
              {/* <GoogleMap/> */}
            </div>
            <div>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter Country"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state or province"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Enter district"
                    />
                    {errors.district && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.district}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="Enter area or neighborhood"
                  />
                  {errors.area && (
                    <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                  )}
                </div>
              </CardContent>
            </div>
            <div>
              <Label htmlFor="businessType">Shop Category</Label>
              <Select
                onValueChange={handleSelectChange}
                value={formData.businessType}
              >
                <SelectTrigger
                  className={errors.businessType ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select Shop Category" />
                </SelectTrigger>
                <SelectContent>
                  {shopCategories.map((category) => (
                    <SelectItem value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.businessType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.businessType}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Document Verification</h2>
            <div>
              <Label htmlFor="businessLicense">
                Business License or Registration Certificate
              </Label>
              <div className="mt-2">
                <Label htmlFor="businessLicense" className="cursor-pointer">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.businessLicense
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, PNG, JPG or GIF (max. 10MB)
                    </p>
                  </div>
                  <Input
                    id="businessLicense"
                    name="businessLicense"
                    type="file"
                    onChange={handleImageSubmit}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.gif"
                  />
                </Label>
                {uploading && (
                  <div>
                    <p>File uploading : {Math.round(uploadProgress)}%</p>
                    <Progress value={uploadProgress} max="100" />
                  </div>
                )}

                {formData.businessLicense && (
                  <div className="space-y-4 p-6 flex flex-col justify-center items-center">
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      File uploaded:
                    </p>

                    <div className="">
                      <Link to={`${formData.businessLicense}`}>
                        View Business License
                      </Link>
                      <iframe
                        className="sm:w-[500px] h-full"
                        src={`${formData.businessLicense}`}
                        alt="businessLicense"
                      />
                    </div>
                  </div>
                )}

                {errors.businessLicense && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    {errors.businessLicense}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button type="button" onClick={handlePrevious} variant="outline">
              Previous
            </Button>
          )}
          {step < totalSteps ? (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} type="submit" className="ml-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
      {errors.submit && (
        <p className="text-red-500 text-sm mt-1">{errors.submit}</p>
      )}
    </div>
  );
}
