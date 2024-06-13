import { logOut } from "@/lib/action";
import { getSession } from "@/lib/getSession";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  console.log(session, "------sesssion---------");
  return (
    <>
      <h1>Home component</h1>
      <h3>{JSON.stringify(session, null, 2)}</h3>
      <div className="mt-5">
        <ul className="flex flex-col gap-10">
          <li className="w-1/3 border">
            <Link href={"/"}> home </Link>
          </li>
          <li className="w-1/3 border">
            <Link href={"/login"}> login </Link>
          </li>
          <li className="w-1/3 border">
            <Link href={"/register"}> register </Link>
          </li>
          <li className="w-1/3 border mb-3">
            <Link href={"/dashboard"}> dashboard </Link>
          </li>
        </ul>
        <form action={logOut}>
          <button>로그아웃</button>
        </form>
      </div>
    </>
  );
}
