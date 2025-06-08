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
          <div className="bg-white w-full max-w-5xl px-6 py-12 rounded-2xl shadow-2xl mb-6 text-black space-y-16 overflow-y-auto">
            {/* 헤더 */}
            <div className="space-y-3">
              <h2 className="text-4xl font-extrabold text-[#b28e5d] flex items-center gap-2">
                🎮 게임 소개
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                이 게임은{" "}
                <span className="font-semibold text-[#b28e5d]">
                  스테이지 클리어
                </span>{" "}
                방식의 싱글플레이 캐주얼 슈팅 게임입니다.
                <br />
                몰려오는 적들을 처치하고,{" "}
                <span className="font-bold">점수</span>를 쌓아
                <span className="font-bold"> 랭킹</span>을 겨뤄보세요!
              </p>
            </div>

            {/* 메인 이미지 */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/uploads/Main.png"
                alt="메인 이미지"
                className="w-full object-cover max-h-[500px]"
              />
            </div>

            {/* 설명 2 */}
            <div className="space-y-3 text-[17px] leading-relaxed text-gray-800">
              <p>
                게임은 마법 캐릭터를 조작하여 몰려오는 적을 물리치는 방식으로
                진행됩니다.
                <br />
                점수는 처치한 적 수와 생존 시간에 따라 누적됩니다.
              </p>
              <p>
                각 스테이지마다 새로운 패턴의 적이 등장하며, <br />
                <span className="font-semibold text-[#b28e5d]">
                  전략적 이동과 회피
                </span>
                가 매우 중요합니다.
              </p>
            </div>

            {/* 서브 이미지 */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/uploads/Sub.png"
                alt="서브 이미지"
                className="w-full object-cover max-h-[500px]"
              />
            </div>

            {/* 스코어 & 시스템 설명 */}
            <div className="space-y-3 text-[17px] leading-relaxed text-gray-800">
              <p>
                스코어 시스템은 누적 점수 기반으로,{" "}
                <span className="font-semibold">매주 랭킹 리셋</span>됩니다.
              </p>
              <p>
                향후 멀티플레이 및 커스터마이징 기능도 업데이트될 예정입니다.
                기대해주세요!
              </p>
            </div>

            {/* 하단 정보 */}
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
                    <p className="text-sm text-gray-600">{event.description}</p>
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
              <h2 className="text-3xl font-extrabold text-[#b28e5d]">
                🏆 랭킹
              </h2>
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
                <div className="text-sm">782150점!</div>
                <div className="text-xs text-white/80">3위</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
