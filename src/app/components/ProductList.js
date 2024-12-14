// pages/product-list.js
"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch("https://crud.teamrabbil.com/api/v1/ReadProduct");
      const data = await res.json();
      setProducts(data.data);
    })();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    UnitPrice: "",
    TotalPrice: "",
    quantity: "",
    code: "",
    img: "",
  });

  const onDelete = async (id) => {
    try {
      const response = await fetch(
        `https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      const result = await response.json();
      router.refresh();
      console.log("Product deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const openEditModal = (item) => {
    setSelected(item);
    console.log(selected);
    setFormData({
      name: item.ProductName || "",
      TotalPrice: item.TotalPrice || "",
      UnitPrice: item.UnitPrice || "",
      code: item.ProductCode || "",
      img: item.Img || "",
      quantity: item.Qty || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        ...selected,
        ProductName: formData.name,
      };

      const res = await (
        await fetch(
          `https://crud.teamrabbil.com/api/v1/UpdateProduct/${selected._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        )
      ).json();

      if (res["status"] === "success") {
        setIsEditModalOpen(false);
        toast.success("Done");
        router.refresh();
      } else {
        toast.error("Sorry");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
        </header>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left text-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-6 font-medium">PRODUCT</th>
                <th className="py-3 px-6 font-medium">UNIT PRICE</th>
                <th className="py-3 px-6 font-medium">QTY</th>
                <th className="py-3 px-6 font-medium">TOTAL PRICE</th>
                <th className="py-3 px-6 font-medium text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <td className="py-4 px-6 flex items-center">
                    <img
                      src={item.Img}
                      className="w-12 h-12 rounded-2xl"
                      alt=""
                    />
                    <p className="ml-2 font-semibold">{item.ProductName}</p>
                  </td>
                  <td className="py-4 px-6">{item.UnitPrice}</td>
                  <td className="py-4 px-6">{item.Qty}</td>
                  <td className="py-4 px-6">{item.TotalPrice}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onDelete(item["_id"])}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl mb-4 text-black">Edit</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Name:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Image:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={formData.img}
                onChange={(e) =>
                  setFormData({ ...formData, img: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Unit Price:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={formData.UnitPrice}
                onChange={(e) =>
                  setFormData({ ...formData, UnitPrice: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Total Price:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={formData.TotalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, TotalPrice: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                QTY:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Code:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-orange-400 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
