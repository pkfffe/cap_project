"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"game" | "event" | "rank">("game");

  return (
    <main className="min-h-screen bg-[#c69c6d] flex flex-col items-center">
      {/* 상단 바 */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        {/* 좌측: 닉네임 */}
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded">
          <span className="text-xl">👤</span>
          <span className="text-sm font-semibold text-black">닉네임</span>
        </div>

        {/* 우측: 로그인 / 회원가입 */}
        <div className="flex gap-2">
          <button
            className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100 text-black"
            onClick={() => router.push("/login")}
          >
            로그인
          </button>
          <button
            className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100 text-black"
            onClick={() => router.push("/signup")} // 🔥 요기 추가!
          >
            회원가입
          </button>
        </div>
      </div>

      {/* 중앙 원형 이미지 */}
      <div className="w-32 h-32 bg-white rounded-full my-4" />

      {/* 상단 탭 메뉴 */}
      <div className="w-4/5 bg-white flex justify-between gap-2 px-4 py-3 -mb-6 z-10 relative rounded-t-xl shadow-lg">
        <button
          className={`flex-1 py-2 ${
            activeTab === "game" ? "bg-[#c8a878]" : "bg-[#eadbc1]"
          } hover:bg-[#b28e5d] rounded font-extrabold text-xl text-black`}
          onClick={() => setActiveTab("game")}
        >
          게임소개
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "event" ? "bg-[#c8a878]" : "bg-[#eadbc1]"
          } hover:bg-[#b28e5d] rounded font-extrabold text-xl text-black`}
          onClick={() => setActiveTab("event")}
        >
          이벤트 소개
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "rank" ? "bg-[#c8a878]" : "bg-[#eadbc1]"
          } hover:bg-[#b28e5d] rounded font-extrabold text-xl text-black`}
          onClick={() => setActiveTab("rank")}
        >
          랭킹
        </button>
      </div>

      {/* 본문 콘텐츠 영역 */}
      <div className="w-4/5 bg-[#dac2a0] flex flex-col items-center py-10 rounded-xl shadow min-h-[300px] z-0">
        {activeTab === "game" && (
          <>
            <div className="bg-white w-9/10 h-[800px] mb-6 rounded-xl shadow-lg" />
            <p className="text-sm font-semibold text-black">
              🎮 여기는 게임 소개글입니다!
            </p>
          </>
        )}
        {activeTab === "event" && (
          <>
            <div className="bg-white w-9/10 h-[800px] mb-6 rounded-xl shadow-lg" />
            <p className="text-sm font-semibold text-black">
              📢 현재 진행 중인 이벤트 안내입니다!
            </p>
          </>
        )}
        {activeTab === "rank" && (
          <>
            <div className="bg-white w-9/10 h-[800px] mb-6 rounded-xl shadow-lg" />
            <p className="text-sm font-semibold text-black">
              🏆 랭킹 TOP 50 정보가 여기에 표시됩니다!
            </p>
          </>
        )}
      </div>
    </main>
  );
}
