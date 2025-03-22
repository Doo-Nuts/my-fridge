// import { createContext, useContext, useEffect, useState } from "react";
// import { fetchCurrentUser } from "../api/auth/fetch-current-user";
// import { fetchLogout } from "../api/auth/fetch-logout";
// import { fetchLogin } from "../api/auth/fetch-login"; // ✅ 로그인 API 추가

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>; // ✅ 로그인 함수 추가
//   logout: () => void;
// }

// // ✅ Context 생성
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // ✅ 세션 유지 확인 (새로고침 시 자동 로그인)
//   const loadUser = async () => {
//     try {
//       const currentUser = await fetchCurrentUser();
//       setUser(currentUser);
//     } catch (err) {
//       console.log(err);
//       setUser(null); // 세션 만료 시 로그아웃 처리
//     }
//   };

//   // ✅ 로그인 함수 추가 (로그인 성공 시 즉시 user 업데이트)
//   const login = async (email: string, password: string) => {
//     await fetchLogin(email, password);
//     await loadUser(); // 로그인 후 유저 정보 다시 불러오기
//   };

//   // ✅ 로그아웃
//   const logout = async () => {
//     await fetchLogout();
//     setUser(null);
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ useAuth() 커스텀 훅
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
//   }
//   return context;
// };
