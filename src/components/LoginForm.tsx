import { githubLogin, login } from "@/lib/action";

export default function LoginForm() {
  return (
    <>
      <h1>Login Component</h1>
      <form action={login}>
        <input
          type="text"
          name="email"
          placeholder="Enter your Eamil"
          className="border border-black"
        />
        <input
          type="text"
          name="password"
          placeholder="Enter your passoword"
          className="border border-black"
        />
        <button>로그인</button>
      </form>
      <form action={githubLogin}>
        <button>깃허브로그인</button>
      </form>
    </>
  );
}
