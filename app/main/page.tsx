"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// 타입 정의
type EventPost = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
};

type RankingUser = {
  nickname: string;
  score: number;
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

<<<<<<< HEAD
  const [rankings, setRankings] = useState<RankingUser[]>([
    { nickname: "노채원", score: 25000 },
    { nickname: "정하준", score: 24789 },
    { nickname: "장현우", score: 24311 },
    { nickname: "송민재", score: 24019 },
    { nickname: "권나연", score: 23204 },
    { nickname: "서하람", score: 22955 },
    { nickname: "김하린", score: 21674 },
    { nickname: "조윤우", score: 21245 },
    { nickname: "배하윤", score: 20014 },
    { nickname: "임지아", score: 19875 },
    { nickname: "안지훈", score: 19432 },
    { nickname: "박지후", score: 18956 },
    { nickname: "오서연", score: 18201 },
    { nickname: "강우진", score: 17845 },
    { nickname: "최예진", score: 17683 },
    { nickname: "한수아", score: 16123 },
    { nickname: "신예준", score: 15492 },
    { nickname: "유태민", score: 13987 },
    { nickname: "윤다인", score: 13706 },
    { nickname: "이지후", score: 12500 },
    { nickname: "문소율", score: 12039 },
    { nickname: "이서윤", score: 11742 },
    { nickname: "백도윤", score: 11084 },
  ]);
=======
  const [rankingData, setRankingData] = useState<
    { user_nickname: string; score: number }[]
  >([]);
>>>>>>> 2f6e06d6a8cc6b8001f6bc297067c8db4d20e0c4

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
              <Image src="/profile.png" alt="Profile" width={24} height={24} className="rounded-full" />
              <div className="w-[0.1px] h-[20px] mx-0.5 border-1 border-neutral-500 shadow-2xl" />
              <span className="text-sm font-semibold text-black">{nickname}</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-black">로그인해주세요</span>
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
              <button className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100 text-black" onClick={() => router.push("/login")}>로그인</button>
              <button className="bg-white px-3 py-1 text-sm font-bold rounded hover:bg-gray-100 text-black" onClick={() => router.push("/signup")}>회원가입</button>
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
            className={`flex-1 py-2 ${activeTab === tab ? "bg-[#c8a878]" : "bg-[#eadbc1]"} hover:bg-[#b28e5d] rounded font-extrabold text-xl text-black`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === "game" ? "게임소개" : tab === "event" ? "이벤트 소개" : "랭킹"}
          </button>
        ))}
      </div>

      {/* 본문 콘텐츠 */}
      <div className="w-4/5 bg-[#dac2a0] flex flex-col items-center py-10 rounded-xl shadow min-h-[300px] z-0">
<<<<<<< HEAD
        {/* 게임 소개 */}
        {activeTab === "game" && (
          <div className="bg-white w-full max-w-5xl px-6 py-12 rounded-2xl shadow-2xl mb-6 text-black space-y-16 overflow-y-auto">
            <div className="space-y-3">
              <h2 className="text-4xl font-extrabold text-[#b28e5d] flex items-center gap-2">🎮 게임 소개</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                이 게임은 <span className="font-semibold text-[#b28e5d]">스테이지 클리어</span> 방식의
                싱글플레이 캐주얼 슈팅 게임입니다.
                <br />
                몰려오는 적들을 처치하고, <span className="font-bold">점수</span>를 쌓아
                <span className="font-bold"> 랭킹</span>을 겨뤄보세요!
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src="/uploads/Main.png" alt="메인 이미지" className="w-full object-cover max-h-[500px]" />
            </div>
            <div className="space-y-3 text-[17px] leading-relaxed text-gray-800">
              <p>게임은 마법 캐릭터를 조작하여 몰려오는 적을 물리치는 방식으로 진행됩니다.<br />점수는 처치한 적 수와 생존 시간에 따라 누적됩니다.</p>
              <p>각 스테이지마다 새로운 패턴의 적이 등장하며, <br /><span className="font-semibold text-[#b28e5d]">전략적 이동과 회피</span>가 매우 중요합니다.</p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src="/uploads/Sub.png" alt="서브 이미지" className="w-full object-cover max-h-[500px]" />
            </div>
            <div className="space-y-3 text-[17px] leading-relaxed text-gray-800">
              <p>스코어 시스템은 누적 점수 기반으로, <span className="font-semibold">매주 랭킹 리셋</span>됩니다.</p>
              <p>향후 멀티플레이 및 커스터마이징 기능도 업데이트될 예정입니다. 기대해주세요!</p>
            </div>
            <footer className="border-t pt-6 text-sm text-gray-500 text-center">
              <p>ⓒ 2025 Team열정 Co., Ltd. All rights reserved.</p>
              <p>팀명: Team열정 | 연락처: 010-8127-4416</p>
            </footer>
          </div>
        )}

        {/* 이벤트 소개 */}
        {activeTab === "event" && (
          <div className="bg-white w-11/12 p-8 rounded-2xl shadow-2xl text-black">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-extrabold flex items-center gap-2">📢 이벤트 안내</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventList.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-default"
                >
                  <div className="h-48 flex justify-center items-center bg-white">
                    <img src={event.image} alt={event.title} className="max-h-full object-contain" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
=======
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
>>>>>>> 2f6e06d6a8cc6b8001f6bc297067c8db4d20e0c4
            </div>
          </div>
        )}

<<<<<<< HEAD
        {/* 랭킹 */}
        {activeTab === "rank" && (
          <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-2xl text-black space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-3xl font-extrabold text-[#b28e5d] flex items-center gap-2">🏆 랭킹</h2>
              <p className="text-sm text-gray-500">최고 점수를 기록한 유저들을 순위별로 확인하세요!</p>
            </div>
            <div className="space-y-4">
              {rankings.map((user, idx) => (
                <div
                  key={user.nickname}
                  className={`flex items-center justify-between px-6 py-4 rounded-xl shadow-md ${
                    idx === 0 ? "bg-gradient-to-r from-yellow-200 to-yellow-400" :
                    idx === 1 ? "bg-gradient-to-r from-gray-300 to-gray-500" :
                    idx === 2 ? "bg-gradient-to-r from-orange-300 to-orange-500" :
                    "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-gray-700">{idx + 1}위</span>
                    <span className="text-lg font-bold">{user.nickname}</span>
                  </div>
                  <span className="text-sm text-gray-700">{user.score.toLocaleString()}점</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
=======
        {/* 게임 & 이벤트 탭은 그대로 유지 */}
        {/* ... 생략 (당신이 보내준 그대로 유지됨) */}
      </div>
    </main>
  );
}
>>>>>>> 2f6e06d6a8cc6b8001f6bc297067c8db4d20e0c4
