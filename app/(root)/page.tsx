import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchCurrentUserWithRetry } from "@/lib/fetchCurrentUserWithRetry";

export default async function Home() {
  const user = await fetchCurrentUserWithRetry(3)
  const result = await fetchPosts(1, 30);
  // console.log("🚀 ~ file: page.tsx:5 ~ Home ~ result:", result);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
            <p className="no-result">No threads founs</p>
        ): (
          <>
            {result.posts.map((post) => (
              <ThreadCard key={post._id} id={post._id} currentUserId={user?.id} parentId={post.parentId} content={post.text} author={post.author} community={post.community} createdAt={post.createdAt} comments={post.children} />
            ))}
          </>
        )}
      </section>
    </>
  );
}
