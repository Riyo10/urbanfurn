"use client";

import { useCartFav } from "@/app/context/CartFavContext";

export default function MyOrders() {
  const { orders } = useCartFav();

  if (orders.length === 0) {
    return <p className="text-gray-600 text-center mt-10">No orders yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
      <ul className="space-y-8">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border p-6 rounded shadow-lg bg-white"
          >
            <div className="mb-4 text-sm text-gray-500 space-y-1">
              <div>
                <strong>Order ID:</strong> {order.id}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleString()}
              </div>
            </div>
            {/* <div className="mb-4 font-semibold text-lg text-green-700">
              Total: ₹{order.total.toFixed(2)}
            </div> */}
            <div>
              <strong>Items:</strong>
              <ul className="list-none mt-2 space-y-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded"
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-600">{item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
