"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSignupClick = () => {
    router.push("/signup"); // Next.js 방식의 라우팅
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c69c6d]">
      <div className="bg-[#e8d7c3] p-8 rounded-xl shadow-lg w-[400px]">
        <h1 className="text-center text-2xl font-bold mb-6 text-black">
          로그인
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-2 text-black"
            >
              아이디
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-50 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d]
               bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-2 text-black"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d] bg-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSignupClick}
              className="text-sm text-black hover:text-gray-600 font-medium"
            >
              회원가입
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-lg font-bold py-2 rounded-lg hover:bg-gray-800"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
