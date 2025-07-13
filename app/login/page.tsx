"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animating, setAnimating] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  // Email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      setToast({ message: "Login failed. Check credentials.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    setToast(null);
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setToast({ message: "Google login successful!", type: "success" });
      setTimeout(() => router.push("/"), 1500);
    } catch (error: any) {
      setToast({ message: error.message || "Google login failed.", type: "error" });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    setAnimating(true);
    setTimeout(() => {
      router.push("/signup");
    }, 400);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div
      className={clsx(
        "relative max-w-md mx-auto mt-20 p-6 bg-white rounded shadow transition-opacity duration-500",
        animating && "opacity-0"
      )}
    >
      {/* Toast */}
      {toast && (
        <div
          className={clsx(
            "absolute top-[-60px] left-1/2 transform -translate-x-1/2 px-5 py-2 rounded shadow text-white text-center text-sm font-medium transition-opacity duration-300 z-50",
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          )}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#004744]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          disabled={loading || googleLoading}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#004744]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          disabled={loading || googleLoading}
        />
        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full bg-[#004744] text-white py-2 rounded hover:bg-[#003a38] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading || googleLoading}
        className="w-full mt-4 flex items-center justify-center space-x-3 border border-gray-300 rounded bg-white py-2 text-gray-700 font-semibold hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FcGoogle size={24} />
        <span>{googleLoading ? "Signing in with Google..." : "Sign in with Google"}</span>
      </button>

      <button
        type="button"
        onClick={handleSignUpRedirect}
        className="w-full bg-white border border-[#004744] text-[#004744] py-2 rounded mt-6 transition-transform duration-300 hover:scale-105 hover:bg-[#f0fdfa]"
        disabled={loading || googleLoading}
      >
        New User? Sign Up
      </button>
    </div>
  );
}
