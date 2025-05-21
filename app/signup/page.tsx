"use client";

import axios from "axios";
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

    if (!username.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (password !== passwordcheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          userid: username,
          password: password,
          nickname: nickname,
        }
      );

      alert(response.data.message);
      router.push("/main");
    } catch (error: any) {
      const msg = error.response?.data?.message || "회원가입 실패";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c69c6d]">
      <div className="bg-[#e8d7c3] p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-center text-2xl font-bold mb-6 text-black">
          회원가입
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* 아이디 */}
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

          {/* 비밀번호 */}
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

          {/* 비밀번호 확인 + ✓ */}
          <div>
            <label
              htmlFor="passwordcheck"
              className="block text-lg font-medium mb-2 text-black"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type="password"
                id="passwordcheck"
                value={passwordcheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                className="w-full border border-gray-50 rounded-lg p-2 pr-10 focus:outline-none focus:ring focus:ring-[#c69c6d] bg-white text-black"
              />
              {passwordcheck.length > 0 && password === passwordcheck && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">
                  ✓
                </span>
              )}
            </div>
          </div>

          {/* 닉네임 */}
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
              value={nickname}
              onChange={(e) => setNickName(e.target.value)}
              className="w-full border border-gray-50 rounded-lg p-2 focus:outline-none focus:ring focus:ring-[#c69c6d] bg-white text-black"
            />
          </div>

          {/* 가입하기 버튼 */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white px-8 py-2 text-lg font-semibold hover:bg-gray-800 rounded-lg"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
