"use client";

import { useState } from "react";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"game" | "event" | "rank">("game");
  return (
    <main className="min-h-screen bg-[#c39764] flex flex-col items-center">
      {/* 상단 바 */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        {/* 좌측: 닉네임 */}
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded">
          <span className="text-xl">👤</span>
          <span className="text-sm font-semibold">닉네임</span>
        </div>

        {/* 우측: 로그인 / 회원가입 */}
        <div className="flex gap-2">
          <button
            className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100"
            onClick={() => router.push("/login")}
          >
            로그인
          </button>
          <button className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100">
            회원가입
          </button>
        </div>
      </div>

      {/* 중앙 원형 이미지 */}
      <div className="w-32 h-32 bg-white rounded-full my-4" />

      {/* 상단 탭 메뉴 */}
      <div className="w-4/5 bg-white flex justify-around py-3 mb-4 text-xl font-extrabold">
        <button className="w-1/3 text-center bg-[#c8a878] py-2 hover:bg-[#b28e5d]">
          게임소개
        </button>
        <button className="w-1/3 text-center bg-[#eadbc1] py-2 hover:bg-[#d8c5a6]">
          이벤트 소개
        </button>
        <button className="w-1/3 text-center bg-[#eadbc1] py-2 hover:bg-[#d8c5a6]">
          <button
            className={`w-1/3 text-center py-2 ${
              activeTab === "game" ? "bg-[#c8a878]" : "bg-[#eadbc1]"
            } hover:bg-[#b28e5d]`}
            onClick={() => setActiveTab("game")}
          />
          게임소개
        </button>
        <button
          className={`w-1/3 text-center py-2 ${
            activeTab === "event" ? "bg-[#c8a878]" : "bg-[#eadbc1]"
          } hover:bg-[#b28e5d]`}
          onClick={() => setActiveTab("event")}
        >
          이벤트 소개
        </button>
        <button
          className={`w-1/3 text-center py-2 ${
            activeTab === "rank" ? "bg-[#c8a878]" : "bg-[#eadbc1]"
          } hover:bg-[#b28e5d]`}
          onClick={() => setActiveTab("rank")}
        >
          랭킹
        </button>
      </div>

      {/* 본문 콘텐츠 영역 */}
      <div className="w-4/5 bg-[#dac2a0] flex flex-col items-center py-6 px-4 rounded-lg shadow min-h-[300px]">
        {activeTab === "game" && (
          <>
            <div className="bg-white w-4/5 h-64 mb-4 rounded-lg shadow" />
            <p className="text-sm font-semibold text-black">
              🎮 여기는 게임 소개글입니다!
            </p>
          </>
        )}
        {activeTab === "event" && (
          <>
            <div className="bg-white w-4/5 h-64 mb-4 rounded-lg shadow" />
            <p className="text-sm font-semibold text-black">
              📢 현재 진행 중인 이벤트 안내입니다!
            </p>
          </>
        )}
        {activeTab === "rank" && (
          <>
            <div className="bg-white w-4/5 h-64 mb-4 rounded-lg shadow" />
            <p className="text-sm font-semibold text-black">
              🏆 랭킹 TOP 50 정보가 여기에 표시됩니다!
            </p>
          </>
        )}
      </div>
    </main>
  );
}

//<div> Choo Ga </div>
