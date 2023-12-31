import { PostThread } from "@/components/forms";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";



async function Page() {
  const user = await currentUser();
  // console.log("🚀 ~ file: page.tsx:8 ~ Page ~ user:", user)

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  // console.log("🚀 ~ file: page.tsx:13 ~ Page ~ userInfo:", userInfo)

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
