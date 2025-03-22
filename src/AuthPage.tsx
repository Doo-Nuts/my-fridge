import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "./api/auth/fetch-register";
import { Lock, User, Mail } from "lucide-react"; // ✅ 아이콘 추가
import { useAuthStore } from "./store/useAuthStore";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await fetchRegister(email, password, name);
        alert("🎉 회원가입 성공! 로그인 해주세요.");
        setIsLogin(true);
        return;
      }

      if (rememberMe) localStorage.setItem("savedEmail", email);
      else localStorage.removeItem("savedEmail");

      navigate("/"); // ✅ 로그인 후 메인 페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`❌ 오류 발생: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
          {isLogin ? "로그인" : "회원가입"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ 회원가입 시 이름 입력 */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 pl-10 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}

          {/* ✅ 이메일 입력 */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 pl-10 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* ✅ 비밀번호 입력 */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-10 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* ✅ 아이디 저장 및 자동 로그인 체크박스 (로그인 시만 표시) */}
          {isLogin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label className="text-gray-300">
                아이디 저장 및 자동 로그인
              </label>
            </div>
          )}

          {/* ✅ 버튼 (로그인 / 회원가입) */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
          >
            {isLogin ? "로그인" : "회원가입"}
          </button>
        </form>

        {/* ✅ 로그인 <-> 회원가입 전환 버튼 */}
        <p className="mt-4 text-center text-gray-400">
          {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          <button
            className="text-green-400 ml-2 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "회원가입" : "로그인"}
          </button>
        </p>
      </div>
    </div>
  );
}
