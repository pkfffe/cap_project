import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div>1. font-[family-name:var(--font-geist-sans 안녕)]</div>
      <div className="font-[family-name:var(--font-geist-mono)]">
        2. font-[family-name:var(--font-geist-mono 안녕)]
      </div>
      <div className="font-[family-name:var(--font-hahmlet)]">
        3. font-[family-name:var(--font-hahmlet 안녕)]
      </div>
    </div>
  );
}
