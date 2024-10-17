import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Progress } from "./ui/progress"
import { AlertCircle, CheckCircle2, Upload } from "lucide-react"
import Map from './Map'

const shopCategories = ["Clothes", "Electronics", "Hardware"];

export default function ShopkeeperRegistration() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    contactNumber: '',
    address: '',
    businessType: '',
    businessLicense: null,
  })
  const [errors, setErrors] = useState({})

  const totalSteps = 3

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, businessType: value }))
    setErrors(prev => ({ ...prev, businessType: '' }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, businessLicense: e.target.files[0] }))
      setErrors(prev => ({ ...prev, businessLicense: '' }))
    }
  }

  const validateStep = (currentStep) => {
    const newErrors= {}

    if (currentStep === 1) {
      if (!formData.shopName) newErrors.shopName = 'Shop name is required'
      if (!formData.ownerName) newErrors.ownerName = 'Owner name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
      if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required'
    } else if (currentStep === 2) {
      if (!formData.address) newErrors.address = 'Address is required'
      if (!formData.businessType) newErrors.businessType = 'Business type is required'
    } else if (currentStep === 3) {
      if (!formData.businessLicense) newErrors.businessLicense = 'Business license is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(step)) {
      // Here you would typically send the formData to your backend
      console.log('Form submitted:', formData)
      // Reset form or redirect user
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black mt-16 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopkeeper Registration</h1>
      <Progress value={(step / totalSteps) * 100} className="mb-6" />
      <form onSubmit={handleSubmit} className="space-y-6">
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
                className={errors.shopName ? 'border-red-500' : ''}
              />
              {errors.shopName && <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>}
            </div>
            <div>
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                className={errors.ownerName ? 'border-red-500' : ''}
              />
              {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={errors.contactNumber ? 'border-red-500' : ''}
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
            
          <div className="space-y-4">
            
            <h2 className="text-xl font-semibold">Location and Business Details</h2>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div>
                <Map/>
            </div>
            <div>
              <Label htmlFor="businessType">Shop Category</Label>
              <Select onValueChange={handleSelectChange} value={formData.businessType}>
                <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select Shop Category" />
                </SelectTrigger>
                <SelectContent>
                {shopCategories.map((category) => (
                        <SelectItem value={category}>{category}</SelectItem>
                      ))}
                  
                </SelectContent>
              </Select>
             
              {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
            </div>
          
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Document Verification</h2>
            <div>
              <Label htmlFor="businessLicense">Business License or Registration Certificate</Label>
              <div className="mt-2">
                <Label htmlFor="businessLicense" className="cursor-pointer">
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.businessLicense ? 'border-red-500' : 'border-gray-300'}`}>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG or GIF (max. 10MB)</p>
                  </div>
                  <Input
                    id="businessLicense"
                    name="businessLicense"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.gif"
                  />
                </Label>
                {formData.businessLicense && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    File uploaded: {formData.businessLicense.name}
                  </p>
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
            <Button type="submit" className="ml-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}