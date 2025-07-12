"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ProfileForm() {
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({ username: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user?.uid) {
      const loadData = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setForm({
              username: data.username || "",
              phone: data.phone || "",
              address: data.address || "",
            });
          }
        } catch (error) {
          setMessage({ type: "error", text: "Failed to load profile data." });
          console.error("Load profile error:", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="text-center mt-10 text-gray-700">
        Checking user session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        User is not logged in.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateDoc(doc(db, "users", user.uid), form);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
      console.error("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-semibold mb-6 border-b pb-4 text-[#004744]">
        Your Profile
      </h2>

      {loading && (
        <div className="mb-4 text-center text-[#004744] font-medium">
          Loading...
        </div>
      )}

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block font-medium mb-1 text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Enter your username"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#004744]"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block font-medium mb-1 text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+1 234 567 890"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#004744]"
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block font-medium mb-1 text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Enter your address"
            rows={3}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#004744]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#004744] text-white py-3 rounded font-semibold hover:bg-[#00695f] transition disabled:opacity-50`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
