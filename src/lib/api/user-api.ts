import { API_URL } from "@/lib/constants";

interface LoginDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    isActivated: boolean;
    rights: string[];
  };
}

export function userApi() {
  async function login(email: string, password: string): Promise<LoginDto> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }
    const { data } = await res.json()
    return data
  }

  async function refreshSession(refreshToken: string): Promise<{accessToken: string, refreshToken: string}> {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { data } = await res.json()
    return data
  }

  return { login, refreshSession };
}
