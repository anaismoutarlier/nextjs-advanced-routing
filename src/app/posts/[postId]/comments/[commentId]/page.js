import { posts } from "@/static";

const Comment = ({ params: { postId, commentId } }) => {
  console.log(postId, commentId);
  const post = posts.find(post => String(post.id) === postId);

  const comment = post?.comments.find(
    comment => String(comment.id) === commentId
  );
  return (
    <main>
      <div>
        <div key={comment.id}>
          <p>
            {comment.content}
            <span> - {comment.createdBy}</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Comment;
