import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./lib/schema";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log(credentials, "credentials");
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("입력값이 부족합니다.");
        }
        await connectDB();
        const user = await User.findOne({ email }).select("+password +role");
        console.log(user, "----------user------");
        // mongoDB에서 select 메소드를 통해 password 와 role 값 가져오가
        if (!user) {
          throw new CredentialsSignin("존재하지 않는 회원입니다.");
        }
        // 사용자가 입력한 비밀번호와 데이터 베이스의 비밀번호와 일치하는지 확인
        // bcryptjs에서 compare 메소드로 확인 (데이터베이스에 비밀번호는 암호화되어 들어감)
        const isMatched = await compare(String(password), user.password);
        if (!isMatched) {
          throw new CredentialsSignin("비밀번호가 일치하지 않습니다.");
        }
        // const { name, role, _id } = user;
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }: any) => {
      console.log("signIn", user, account);
      if (account?.provider === "github") {
        // github 소셜 로그인을 위한 로직
        const { name, email } = user;
        await connectDB();
        // const existingUser = await User.findOne({email});
        const existingUser = await User.findOne({ authProviderId: user.id });
        if (!existingUser) {
          await new User({
            name,
            email,
            authProviderId: user.id,
            role: "user",
          }).save();
        }
        const socialUser = await User.findOne({ authProviderId: user.id });
        user.role = socialUser.role || "user";
        user.id = socialUser?.id || null;
        return true;
      } else {
        return true;
      }
    },
    async jwt({ token, user }: any) {
      console.log("jwt", token, user);
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.role) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
});
