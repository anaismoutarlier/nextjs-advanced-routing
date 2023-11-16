import Link from "next/link";
/**
 * Post component
 * @param {Object} props: id, title, content, createdBy
 * @returns JSX
 */
const Post = ({ post }) => {
  return (
    <div className="post">
      <Link key={post.id} href={`/posts/${post.id}`}>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        <span> - {post.createdBy}</span>
      </Link>
    </div>
  );
};

export { Post };
