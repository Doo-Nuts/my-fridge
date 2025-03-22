export async function fetchLogin(email: string, password: string) {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password}),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    console.log(res.json())

    return { success: true, email };
  } catch (error: unknown) {
    console.error("❌ 로그인 실패:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    
  }
}