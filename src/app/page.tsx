import { getSession } from "@/lib/getSession";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  console.log(session, "------sesssion---------");
  return (
    <>
      <h1>Home component</h1>
      <h3>{JSON.stringify(session, null, 2)}</h3>
      <div>
        <ul>
          <li className="border border-black">
            <Link href={"/"}> home </Link>
          </li>
          <li className="border border-black">
            <Link href={"/login"}> login </Link>
          </li>
          <li className="border border-black">
            <Link href={"/register"}> register </Link>
          </li>
          <li className="border border-black">
            <Link href={"/dashboard"}> dashboard </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
