import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const session: any = await getSession();
  console.log(session, "session");
  if (!session || session.role !== "admin") {
    redirect("/");
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}
