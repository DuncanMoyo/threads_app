import { ThreadCard } from "@/components/cards";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCurrentUserWithRetry } from "@/lib/fetchCurrentUserWithRetry";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  if (!params.id) return null;

  const user = await fetchCurrentUserWithRetry(3);
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
    </section>
  );
};

export default Page;
