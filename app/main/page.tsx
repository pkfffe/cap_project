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

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) setNickname(savedNickname);
  }, []);

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
        {/* 게임 소개 */}
        {activeTab === "game" && (
          <div className="bg-white w-11/12 p-8 rounded-2xl shadow-2xl mb-6 text-black space-y-4">
            <h2 className="text-3xl font-extrabold flex items-center gap-2">
              🎮 게임 소개
            </h2>
            <p className="text-lg leading-relaxed">
              본 게임은 싱글플레이{" "}
              <span className="font-semibold text-[#b28e5d]">
                스테이지 클리어 방식
              </span>
              의 <br />
              <span className="font-semibold text-[#b28e5d]">
                캐주얼 슈팅 게임
              </span>
              입니다.
            </p>
            <p className="text-base text-gray-700">
              몰려오는 적을 처치하고 점수를 쌓아<br />
              <span className="font-semibold">랭킹에 도전</span>해 보세요!
            </p>
            <div className="flex justify-center mt-4">
              <img
                src="/gamepreview.png"
                alt="게임 미리보기"
                className="w-full max-w-md rounded-xl shadow-md object-cover"
              />
            </div>
          </div>
        )}

        {/* 이벤트 소개 */}
        {activeTab === "event" && (
          <div className="bg-white w-11/12 p-8 rounded-2xl shadow-2xl text-black">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-extrabold flex items-center gap-2">
                📢 이벤트 안내
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventList.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-default"
                >
                  <div className="h-48 flex justify-center items-center bg-white">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.description}
                    </p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 랭킹 */}
{activeTab === "rank" && (
  <div className="bg-white w-11/12 p-8 rounded-2xl shadow-2xl text-black space-y-6">
    {/* 제목 */}
    <div className="border-b pb-4 flex items-center gap-2">
      <h2 className="text-3xl font-extrabold text-[#b28e5d]">🏆 랭킹</h2>
      <span className="text-sm text-gray-500">
        최고 점수를 기록한 유저들을 만나보세요!
      </span>
    </div>

    {/* 랭킹 카드 리스트 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1등 */}
      <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-black rounded-xl shadow-lg p-4 space-y-2">
        <div className="text-2xl font-bold">🥇 Legend</div>
        <div className="text-sm">999999점</div>
        <div className="text-xs text-white/80">1위</div>
      </div>

      {/* 2등 */}
      <div className="bg-gradient-to-br from-gray-300 to-gray-500 text-black rounded-xl shadow-lg p-4 space-y-2">
        <div className="text-2xl font-bold">🥈 ProShooter</div>
        <div className="text-sm">854320점</div>
        <div className="text-xs text-white/80">2위</div>
      </div>

      {/* 3등 */}
      <div className="bg-gradient-to-br from-orange-300 to-orange-500 text-black rounded-xl shadow-lg p-4 space-y-2">
        <div className="text-2xl font-bold">🥉 FastHand</div>
        <div className="text-sm">782150점</div>
        <div className="text-xs text-white/80">3위</div>
      </div>
    </div>
  </div>
)}</div>
</main>
)};
