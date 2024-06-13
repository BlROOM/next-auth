"use server";
import { hash } from "bcryptjs";
import { connectDB } from "./db";
import User from "./schema";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";

// 회원가입
export async function register(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  if (!name || !email || !password) {
    console.log("입력값이 부족합니다.");
  }

  connectDB();

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    console.log("이미 가입된 회원입니다.");
  }

  // 없는 회원이면 DB넣기
  const hashPassword = await hash(String(password), 10);
  const user = new User({
    name,
    email,
    password: hashPassword,
  });
  await user.save();
  redirect("/login");
}

// 로그인
export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    console.log("입력값이 부족합니다.");
  }
  try {
    // connectDB();
    console.log("----------email-----", email);
    console.log("----------password-----", password);
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    }); //@auth provider로 signIn 메소드 호출
  } catch (error) {
    console.log(error, "error");
  }
  redirect("/");
}

export async function githubLogin() {
  await signIn("gihub", { callbackUrl: "/" });
}
