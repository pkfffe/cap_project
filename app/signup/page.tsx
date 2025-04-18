"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 백엔드 요청
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name: userId, user_password: userPw }),
    });

    if (res.ok) {
      alert("회원가입 성공!");
      router.push("/login"); // 로그인 페이지로 이동
    } else {
      alert("입력 오류! 다시 시도하세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefae0]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-[#c39764] text-white py-2 rounded w-full font-semibold hover:bg-[#b2854c]"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
