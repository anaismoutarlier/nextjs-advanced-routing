import { posts } from "@/static";
import styles from "../../page.module.css";
import Post from "@/components/Post";
export default function Posts({ params: { categories } }) {
  console.log({ categories });

  const postsToDisplay = posts.filter(post => {
    console.log(post.title, categories, post.categorization);
    return (
      !categories ||
      categories.every(
        (category, index) =>
          post.categorization[index].toLowerCase() === category.toLowerCase()
      )
    );
  });

  return (
    <main className={styles.main}>
      <div>
        {postsToDisplay.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
