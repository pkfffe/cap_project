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
  const [newEventFile, setNewEventFile] = useState<File | null>(null);
  const [newEventPreview, setNewEventPreview] = useState<string>("");

  const [viewMode, setViewMode] = useState<"list" | "detail" | "form">("list");
  const [selectedEvent, setSelectedEvent] = useState<EventPost | null>(null);
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

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
  });

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) setNickname(savedNickname);
  }, []);

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.image) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const result = await response.json();
        setEventList([result, ...eventList]);
        setViewMode("list");
        setNewEvent({ title: "", description: "", image: "", date: "" });
      } else {
        alert("이벤트 등록 실패");
      }
    } catch (error) {
      console.error("등록 중 에러:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

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

      {/* 탭 */}
      <div className="w-4/5 bg-white flex justify-between gap-2 px-4 py-3 -mb-6 z-10 relative rounded-t-xl shadow-lg">
        {["game", "event", "rank"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 ${
              activeTab === tab ? "bg-[#c8a878]" : "bg-[#eadbc1]"
            } hover:bg-[#b28e5d] rounded font-extrabold text-xl text-black`}
            onClick={() => {
              setActiveTab(tab as any);
              setViewMode("list");
            }}
          >
            {tab === "game"
              ? "게임소개"
              : tab === "event"
              ? "이벤트 소개"
              : "랭킹"}
          </button>
        ))}
      </div>

      {/* 본문 */}
      <div className="w-4/5 bg-[#dac2a0] flex flex-col items-center py-10 rounded-xl shadow min-h-[300px] z-0">
        {activeTab === "game" && (
          <div className="bg-white w-11/12 p-6 rounded-xl shadow-lg mb-6 text-black">
            <h2 className="text-2xl font-bold mb-4">게임 소개</h2>
            <p className="text-lg mb-2">
              본 게임은 싱글플레이 스테이지 클리어 방식의 캐주얼 슈팅
              게임입니다.
            </p>
            <p className="text-sm">
              적을 처치하고 점수를 쌓아 랭킹에 도전해보세요!
            </p>
          </div>
        )}

        {activeTab === "event" && (
          <div className="bg-white w-11/12 p-6 rounded-xl shadow-lg text-black">
            <h2 className="text-2xl font-bold mb-4">📢 이벤트</h2>

            {/* 작성 버튼 */}
            {viewMode === "list" && (
              <button
                className="bg-[#c8a878] text-white px-4 py-2 rounded mb-4 font-bold hover:bg-[#b28e5d]"
                onClick={() => setViewMode("form")}
              >
                ✍ 이벤트 작성하기
              </button>
            )}

            {/* 카드 리스트 */}
            {viewMode === "list" && (
              <div className="grid grid-cols-2 gap-6">
                {eventList.map((event) => (
                  <div
                    key={event.id}
                    className="bg-[#fff] rounded-lg shadow-md cursor-pointer overflow-hidden hover:shadow-xl"
                    onClick={() => {
                      setSelectedEvent(event);
                      setViewMode("detail");
                    }}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      width={320}
                      height={180}
                      className="w-full h-auto object-contain mx-auto"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-600">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 상세보기 */}
            {viewMode === "detail" && selectedEvent && (
              <div className="text-black">
                <button
                  onClick={() => setViewMode("list")}
                  className="text-sm text-blue-600 mb-4"
                >
                  ← 돌아가기
                </button>
                <h3 className="text-2xl font-bold">{selectedEvent.title}</h3>
                <img
                  src={selectedEvent.image}
                  alt="이벤트 이미지"
                  className="w-full my-4 rounded"
                />
                <p className="text-lg whitespace-pre-wrap">
                  {selectedEvent.description}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {selectedEvent.date}
                </p>
              </div>
            )}

            {/* 작성 폼 */}
            {viewMode === "form" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="제목"
                  className="w-full px-4 py-2 border rounded"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="내용"
                  className="w-full px-4 py-2 border rounded"
                  rows={5}
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />

                {/* 파일 선택 input */}
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewEventFile(file);
                      setNewEventPreview(URL.createObjectURL(file)); // 미리보기용 URL
                    }
                  }}
                />

                {/* 미리보기 */}
                {newEventPreview && (
                  <img
                    src={newEventPreview}
                    alt="미리보기"
                    className="w-full h-48 object-cover rounded shadow"
                  />
                )}

                <input
                  type="text"
                  placeholder="기간 (예: 2025.06.10 ~ 2025.06.30)"
                  className="w-full px-4 py-2 border rounded"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />

                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleAddEvent}
                  >
                    등록
                  </button>
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => setViewMode("list")}
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* 랭킹 */}
        {activeTab === "rank" && (
          <div className="bg-white w-11/12 p-6 rounded-xl shadow-lg mb-6 text-black">
            <h2 className="text-2xl font-bold mb-4">🏆 랭킹</h2>
            <p className="mb-2">현재 가장 높은 점수를 기록한 유저 TOP 3:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>🥇 닉네임: Legend - 999999점</li>
              <li>🥈 닉네임: ProShooter - 854320점</li>
              <li>🥉 닉네임: FastHand - 782150점</li>
            </ol>
          </div>
        )}
      </div>
    </main>
  );
}
