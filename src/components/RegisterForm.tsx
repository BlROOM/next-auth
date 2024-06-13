import { register } from "@/lib/action";

export default function RegisterForm() {
  return (
    <>
      <h1>Register Component</h1>
      <form action={register}>
        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          className="border border-black"
        />
        <input
          type="text"
          name="email"
          placeholder="Enter your Email"
          className="border border-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="border border-black"
        />
        <button>회원가입</button>
      </form>
    </>
  );
}
