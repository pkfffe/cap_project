"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState<"game" | "event" | "rank">("game");
  const [eventList] = useState([
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
      const fetchRanking = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking`);
          if (!res.ok) throw new Error("응답 오류");
          const data = await res.json();
          setRankingData(data.ranking || []);
        } catch (err) {
          console.error("랭킹 불러오기 실패:", err);
        }
      };
      fetchRanking();
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
        {activeTab === "rank" && (
          <div className="bg-white w-11/12 p-8 rounded-2xl shadow-2xl text-black space-y-6">
            <div className="border-b pb-4 flex items-center gap-2">
              <h2 className="text-3xl font-extrabold text-[#b28e5d]">
                🏆 랭킹
              </h2>
              <span className="text-sm text-gray-500">
                최고 점수를 기록한 유저들을 만나보세요
              </span>
            </div>

            {/* 1~3위 카드 */}
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
                    <div className="text-sm">
                      {user.score.toLocaleString()}점
                    </div>
                    <div className="text-xs text-white/80">{idx + 1}위</div>
                  </div>
                );
              })}
            </div>

            {/* 4~10위 테이블 */}
            {rankingData.length > 3 && (
              <div className="mt-8 w-full overflow-x-auto">
                <table className="w-full table-auto text-left border-collapse text-black bg-white rounded-xl shadow">
                  <thead className="bg-[#eadbc1] text-sm text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-300">
                        순위
                      </th>
                      <th className="px-4 py-2 border-b border-gray-300">
                        닉네임
                      </th>
                      <th className="px-4 py-2 border-b border-gray-300">
                        점수
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankingData.slice(3, 10).map((user, index) => (
                      <tr key={index} className="hover:bg-[#f5f0e6] transition">
                        <td className="px-4 py-2 border-b border-gray-200 font-semibold">
                          {index + 4}위
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200">
                          {user.user_nickname}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200">
                          {user.score.toLocaleString()}점
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
