"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupClick = () => {
    router.push("/signup");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          userid: username,
          password,
        }
      );

      const { message, nickname, token } = response.data;
      alert(message);
      localStorage.setItem("token", token);
      localStorage.setItem("nickname", nickname);
      router.push("/main");
    } catch (error: any) {
      const message = error.response?.data?.message || "로그인 실패";
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c69c6d]">
      <div className="bg-[#e8d7c3] p-8 rounded-xl shadow-lg w-[400px]">
        <h1 className="text-center text-2xl font-bold mb-6 text-black">
          로그인
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-50 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d] bg-white text-black"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d] bg-white text-black"
              required
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
