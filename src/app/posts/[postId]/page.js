import { posts } from "@/static";
import Link from "next/link";

async function getPost(postId) {
  const data = await fetch(
    `https://posts-api-yj1i.onrender.com/posts/${postId}`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.POSTS_API_KEY,
      },
    }
  );

  return await data.json();
}

const Post = async ({ params: { postId } }) => {
  const { post } = await getPost(postId);

  if (!post) return null;

  return (
    <main>
      <div>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        <span> - {post.createdBy}</span>
      </div>
      <div>
        {post.comments.map(comment => (
          <div key={comment.id}>
            <Link href={`/posts/${postId}/comments/${comment.id}`}>
              <p>
                {comment.content}
                <span> - {comment.createdBy}</span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;
