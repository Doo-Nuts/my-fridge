import { useState } from "react";
import { Boxes, Settings, ClipboardList, Filter } from "lucide-react";
import { categories } from "../constants/categories";
import ReactRouterDOM from "react-router-dom";

const { Link } = ReactRouterDOM;

type SidebarProps = {
  pathname: string;
};

export default function Sidebar({ pathname }: SidebarProps) {
  console.log("✅ Sidebar loaded");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <aside className="w-64 bg-gray-800 text-gray-200 p-4 border-r border-gray-700 min-h-screen rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-green-400">카테고리</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className={`flex items-center p-3 rounded-lg transition ${
              pathname === "/" ? "bg-green-700 text-white" : "hover:bg-gray-700"
            }`}
          >
            <ClipboardList className="w-5 h-5 mr-2" /> 냉장고 현황
          </Link>
        </li>

        <li>
          <Link
            to="/items"
            className={`flex items-center p-3 rounded-lg transition ${
              pathname === "/items" ? "bg-green-700 text-white" : "hover:bg-gray-700"
            }`}
          >
            <Boxes className="w-5 h-5 mr-2" /> 식재료 관리
          </Link>
        </li>

        {pathname === "/items" && (
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setShowFilter(true)}
            onMouseLeave={() => setShowFilter(false)}
          >
            <div className="flex items-center p-3 rounded-lg transition bg-gray-700 hover:bg-gray-600">
              <Filter className="w-5 h-5 mr-2" /> 필터
            </div>

            {showFilter && (
              <ul className="absolute left-0 top-[40px] bg-gray-700 border border-gray-600 rounded-lg w-52 mt-1 p-2 shadow-lg transition-all duration-200 ease-in-out transform opacity-100 scale-100 max-h-[400px] overflow-y-auto">
                {categories.map(({ key, label }) => (
                  <li key={key} className="hover:bg-gray-600 rounded-lg">
                    <label htmlFor={key} className="flex items-center p-3 w-full cursor-pointer">
                      <input
                        type="checkbox"
                        id={key}
                        checked={selectedCategories.includes(key)}
                        onChange={() => handleCategoryChange(key)}
                        className="mr-2"
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}

        <li>
          <Link
            to="/settings"
            className={`flex items-center p-3 rounded-lg transition ${
              pathname === "/settings" ? "bg-green-700 text-white" : "hover:bg-gray-700"
            }`}
          >
            <Settings className="w-5 h-5 mr-2" /> 설정
          </Link>
        </li>
      </ul>
    </aside>
  );
}
