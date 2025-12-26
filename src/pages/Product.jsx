import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images?.[0] || "");
      setSize("");
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!productData) return;

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    addToCart(productData._id, size);
    toast.success("Added to cart");
  };

  if (!productData) return null;

  return (
    <div className="border-t-2 pt-10">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Images */}
        <div className="flex-1 flex gap-3">
          <div className="flex sm:flex-col gap-2">
            {productData.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={productData.name}
                onClick={() => setImage(img)}
                className={`w-24 cursor-pointer border ${
                  image === img ? "border-orange-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          <img
            src={image || assets.upload_area}
            alt={productData.name}
            className="w-full border"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{productData.name}</h1>

          <p className="text-3xl mt-4">
            {currency}
            {productData.price}
          </p>

          <p className="mt-4 text-gray-500">{productData.description}</p>

          {/* Sizes */}
          <div className="mt-6">
            <p className="mb-2">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border ${
                    size === s ? "border-orange-500" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!size}
            className={`mt-6 px-8 py-3 text-sm text-white ${
              size ? "bg-black" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
