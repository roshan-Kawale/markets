import React, { useState } from 'react'
import { ProductForm } from './ProductCreate'
import { useNavigate, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/store';

function ProductEdit() {
  const [user] = useAtom(userAtom);
  const { productId } = useParams();

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
      const res = await fetch(`/api/product/update/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
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
      <div className="text-2xl font-bold" >Edit Product</div>
      <ProductForm handleSubmit={handleSubmit} setFormData={setFormData} />
    </div>
  )
}

export default ProductEdit
