'use client';
import { useCartFav } from '../context/CartFavContext';
import { useRouter } from 'next/navigation';

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^\d]/g, ''), 10);
}

export default function CartPage() {
  const { cart, toggleCart } = useCartFav();
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);

  const handleCheckout = () => {
    router.push('/checkout'); // will read from context on that page
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b py-4">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-contain" />
              <div className="flex-grow">
                <h2 className="font-semibold">{item.name}</h2>
                <p>{item.price}</p>
              </div>
              <button
                onClick={() => toggleCart(item)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-right font-semibold text-lg">
            Total: ₹{totalPrice.toLocaleString()}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-[#004744] hover:bg-[#003a38] text-white px-6 py-3 rounded-md transition"
            >
              Continue to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
