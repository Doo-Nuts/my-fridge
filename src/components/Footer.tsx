import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm p-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* ✅ 브랜드 & 설명 */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-green-400">내 손의 냉장고</h2>
          <p>스마트한 식품 관리 시스템</p>
        </div>

        {/* ✅ 네비게이션 */}
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-white">홈</Link>
          <Link to="/items" className="hover:text-white">냉장고 목록</Link>
          <Link to="/add-item" className="hover:text-white">추가</Link>
          <Link to="/settings" className="hover:text-white">설정</Link>
        </nav>

        {/* ✅ 저작권 정보 */}
        <div className="text-center md:text-right">
          <p>© 2025 내 손의 냉장고. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
