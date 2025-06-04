import { eventList } from "../data";

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = eventList.find((e) => e.id === parseInt(params.id));

  if (!event) return <div>이벤트를 찾을 수 없습니다.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <img
        src={event.image}
        alt={event.title}
        className="mb-4 rounded shadow"
      />
      <p className="mb-4">{event.content}</p>
      <p className="text-gray-600">{event.date}</p>
    </div>
  );
}
