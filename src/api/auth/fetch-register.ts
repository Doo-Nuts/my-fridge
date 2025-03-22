export async function fetchRegister(email: string, password: string, name: string) {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return { success: true, email };
  } catch (error: unknown) {
    console.error("❌ 회원가입 실패:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}