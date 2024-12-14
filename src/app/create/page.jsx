"use client";
import toast from "react-hot-toast";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAdd = (data) => {
    const product = {
      Img: data.image,
      ProductCode: data.code,
      ProductName: data.name,
      Qty: data.quantity,
      TotalPrice: data.price,
      UnitPrice: data.unitPrice,
    };
    fetch("https://crud.teamrabbil.com/api/v1/CreateProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        toast.success(`${data.data.ProductName} added successfully`);
        router.replace("/");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar></Navbar>
      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create Product
          </h1>
          <form
            onSubmit={handleSubmit(handleAdd)}
            className="grid grid-cols-2 gap-6 text-black"
          >
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="product-name"
              >
                Product Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="product-name"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="product-code"
              >
                Product Code
              </label>
              <input
                {...register("code", { required: "Code is required" })}
                type="text"
                id="product-code"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="image">
                Image
              </label>
              <input
                {...register("image", { required: "Image is required" })}
                type="text"
                id="image"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="unit-price">
                Unit Price
              </label>
              <input
                {...register("unitPrice", {
                  required: "Unit Price is required",
                })}
                type="number"
                id="unit-price"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="qty">
                Qty
              </label>
              <input
                {...register("quantity", { required: "QTY is required" })}
                type="number"
                id="qty"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="total-price">
                Total Price
              </label>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                id="total-price"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <input
              className="py-2 w-36 rounded-lg bg-amber-500"
              value="Add brand"
              type="submit"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
