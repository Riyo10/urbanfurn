'use client';
import { useCartFav } from '../context/CartFavContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^\d.]/g, '')); // fixed to parse decimals properly
}

export default function CheckoutPage() {
  const { cart, placeOrder } = useCartFav();  // <-- get placeOrder here
  const [billingName, setBillingName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentType, setPaymentType] = useState('card');
  const [paid, setPaid] = useState(false);
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);

  const handlePayment = () => {
    if (!billingName || !address) {
      alert('Please fill in both your name and address.');
      return;
    }

    setTimeout(() => {
      placeOrder();  // <-- save order and clear cart
      setPaid(true);
    }, 1000); // simulate payment delay
  };

  if (paid) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-4 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-2">Thank you, {billingName}, for your order.</p>
        <p className="text-gray-500 mb-6">Your items will be shipped to:</p>
        <p className="italic text-gray-700">{address}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-[#004744] hover:bg-[#003a38] text-white px-6 py-3 rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Order Items */}
      <div className="mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <div>{item.name}</div>
            <div>{item.price}</div>
          </div>
        ))}
        <div className="text-right font-semibold text-lg mt-4">
          Total: ₹{totalPrice.toFixed(2)}
        </div>
      </div>

      {/* Billing Name */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Billing Name</label>
        <input
          type="text"
          value={billingName}
          onChange={(e) => setBillingName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Your full name"
        />
      </div>

      {/* Shipping Address */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Shipping Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Your complete address"
          rows={3}
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Payment Method</label>
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="card">Credit / Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handlePayment}
        className="w-full bg-[#004744] hover:bg-[#003a38] text-white px-6 py-3 rounded-md"
      >
        Pay Now
      </button>
    </div>
  );
}
