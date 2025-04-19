"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [nickname, setNickName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 백엔드 요청
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: username,
        user_password: password,
        passwordcheck,
      }),
    });

    if (res.ok) {
      alert("회원가입 성공!");
      router.push("/login"); // 로그인 페이지로 이동
    } else {
      alert("입력 오류! 다시 시도하세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c69c6d]">
      <div className="bg-[#e8d7c3] p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-center text-2xl font-bold mb-6 text-black">
          회원가입
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-2 text-black"
            >
              비밀번호 확인
            </label>
            <input
              type="text"
              id="username"
              value={passwordcheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="w-full border border-gray-50 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d] bg-white text-black"
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="nickname"
              className="block text-lg font-medium mb-2 text-black"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname} // 여기 username → nickname 으로 수정
              onChange={(e) => setNickName(e.target.value)}
              className="w-half border border-gray-50 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d] bg-white text-black"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white px-15 py-2 text-lg font-semibold hover:bg-gray-800 rounded-lg"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
