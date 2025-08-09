import { Metadata } from "next";
import FormComponent from "./form";
import { POST } from "@/utilities/fetch-helper";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

async function formSubmit(redirectPath: string, formData: FormData) {
  "use server";

  const username = formData.get("username");
  const password = formData.get("password");

  const result = await POST<{
    access_token: string;
    access_token_expires: Date;
    refresh_token: string;
    refresh_token_expires: Date;
  }>({
    isAuth: false,
    path: "/api/system/authentication/login",
    body: JSON.stringify({ username, password }),
    cache: "no-cache",
  });

  if (result.status === 200) {
    const access_token = result.data!.access_token;
    const access_token_expires = result.data!.access_token_expires;
    const refresh_token = result.data!.refresh_token;
    const refresh_token_expires = result.data!.refresh_token_expires;

    const cookieStore = await cookies();
    cookieStore.set({
      name: "access_token",
      value: access_token,
      expires: new Date(access_token_expires),
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      priority: "high"
    });
    cookieStore.set({
      name: "refresh_token",
      value: refresh_token,
      expires: new Date(refresh_token_expires),
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      priority: "high"
    });

    redirect(redirectPath);
  } else if (result.status === 401) {
    redirect("/login?result=unauthorize");
  } else {
    redirect("/login?result=error");
  }
}

export default function LoginPage() {
  return (
    <div className="flex items-center h-full">
      <div className="w-full max-w-xs m-auto">
        <FormComponent action={formSubmit} />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Login"
};

export interface LoginForm {
  username: string;
  password: string;
}