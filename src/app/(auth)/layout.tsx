import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getSession } from "@/lib/getSession";
import { logOut } from "@/lib/action";

export default async function layout({ children }: { children: ReactNode }) {
  const session = await getSession();
  console.log("session", session);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}
