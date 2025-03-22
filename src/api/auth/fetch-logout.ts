export async function fetchLogout() {
  try {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("❌ 로그아웃 실패:", error);
  }
}
