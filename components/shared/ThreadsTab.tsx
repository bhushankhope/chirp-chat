import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Result } from "postcss";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let fetchedPosts: any;

  if (accountType === "User") {
    fetchedPosts = await fetchUserPosts(accountId);
  } else {
    fetchedPosts = await fetchCommunityPosts(accountId);
  }

  if (!fetchedPosts) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {fetchedPosts.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? {
                  name: fetchedPosts.name,
                  image: fetchedPosts.image,
                  id: fetchedPosts.id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          } //todo:
          community={thread.community} //todo:
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
