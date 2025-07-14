"use server";

import { userApi } from "@/lib/api/user-api";
import { setSession } from "@/lib/session";

export async function loginAction(previousState: unknown, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !email.includes("@")) {
      return { success: false, errors: { email: "Invalid email" } };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        errors: { password: "Password must be at least 6 characters" },
      };
    }

    const data = await userApi().login(email, password);

    console.log("login data", data);

    await setSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return { success: true, errors: null };
  } catch (error) {
    console.error(error);
    return { success: false, errors: { email: "Invalid email or password" } };
  }
}
