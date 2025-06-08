"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type EventPost = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
};

export default function Home() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState<"game" | "event" | "rank">("game");

  const [eventList, setEventList] = useState<EventPost[]>([
    {
      id: 1,
      title: "6단계까지 진출하고 치킨 받자!",
      description: "6단계까지 무사 진출하고 치킨 기프티콘을 받아보세요!",
      image: "/uploads/event1.jpg",
      date: "2025.05.22 ~ 2025.06.08",
    },
    {
      id: 2,
      title: "6월 출석 이벤트",
      description: "매일 접속하고 보상을 획득하세요!",
      image: "/uploads/event2.jpg",
      date: "2025.05.14 ~ 2025.06.15",
    },
  ]);

  const [rankingData, setRankingData] = useState<
    { user_nickname: string; score: number }[]
  >([]);

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) setNickname(savedNickname);
  }, []);

  useEffect(() => {
    if (activeTab === "rank") {
      fetch("http://localhost:5000/ranking")
        .then((res) => res.json())
        .then((data) => setRankingData(data.ranking || []))
        .catch((err) => console.error("랭킹 API 오류:", err));
    }
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-[#c69c6d] flex flex-col items-center">
      {/* 상단 바 */}
      <div className="w-full flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded">
          {nickname ? (
            <>
              <Image
                src="/profile.png"
                alt="Profile"
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className="w-[0.1px] h-[20px] mx-0.5 border-1 border-neutral-500 shadow-2xl" />
              <span className="text-sm font-semibold text-black">
                {nickname}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-black">
              로그인해주세요
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {nickname ? (
            <button
              className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100 text-black"
              onClick={() => {
                localStorage.removeItem("nickname");
                setNickname("");
                alert("로그아웃 성공!");
                router.refresh();
              }}
            >
              로그아웃
            </button>
          ) : (
            <>
              <button
                className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100 text-black"
                onClick={() => router.push("/login")}
              >
                로그인
              </button>
              <button
                className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100 text-black"
                onClick={() => router.push("/signup")}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      {/* 로고 */}
      <div className="w-60 h-60 y-10 relative rounded-full overflow-hidden">
        <Image src="/rogo.png" alt="Logo" fill className="object-cover" />
      </div>

      {/* 탭 메뉴 */}
      <div className="w-4/5 bg-white flex justify-between gap-2 px-4 py-3 -mb-6 z-10 relative rounded-t-xl shadow-lg">
        {["game", "event", "rank"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 ${
              activeTab === tab ? "bg-[#c8a878]" : "bg-[#eadbc1]"
            } hover:bg-[#b28e5d] rounded font-extrabold text-xl text-black`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === "game"
              ? "게임소개"
              : tab === "event"
              ? "이벤트 소개"
              : "랭킹"}
          </button>
        ))}
      </div>

      {/* 본문 콘텐츠 */}
      <div className="w-4/5 bg-[#dac2a0] flex flex-col items-center py-10 rounded-xl shadow min-h-[300px] z-0">
        {/* 랭킹 탭 */}
        {activeTab === "rank" && (
          <div className="bg-white w-11/12 p-8 rounded-2xl shadow-2xl text-black space-y-6">
            <div className="border-b pb-4 flex items-center gap-2">
              <h2 className="text-3xl font-extrabold text-[#b28e5d]">
                🏆 랭킹
              </h2>
              <span className="text-sm text-gray-500">
                최고 점수를 기록한 유저들을 만나보세요!
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rankingData.slice(0, 3).map((user, idx) => {
                const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉";
                const bgColor =
                  idx === 0
                    ? "from-yellow-300 to-yellow-500"
                    : idx === 1
                    ? "from-gray-300 to-gray-500"
                    : "from-orange-300 to-orange-500";

                return (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${bgColor} text-black rounded-xl shadow-lg p-4 space-y-2`}
                  >
                    <div className="text-2xl font-bold">
                      {medal} {user.user_nickname}
                    </div>
                    <div className="text-sm">{user.score}점</div>
                    <div className="text-xs text-white/80">{idx + 1}위</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 게임 & 이벤트 탭은 그대로 유지 */}
        {/* ... 생략 (당신이 보내준 그대로 유지됨) */}
      </div>
    </main>
  );
}
