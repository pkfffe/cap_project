import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c69c6d]">
      <div className="bg-[#e8d7c3] p-8 rounded-xl shadow-lg w-[400px]">
        <h1 className="text-center text-2xl font-bold mb-6">로그인</h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-2"
            >
              아이디
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d]"
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-gray-600 hover:underline">
              회원가입
            </a>
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
