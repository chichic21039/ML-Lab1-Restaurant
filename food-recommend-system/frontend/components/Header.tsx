import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-amber-700">
          Food recommend system
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/">Trang chủ</Link>
          <Link href="/results">Kết quả</Link>
        </nav>
      </div>
    </header>
  );
}