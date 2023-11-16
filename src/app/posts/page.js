import styles from "./page.module.css";
import { AddPostForm, Post } from "@/components";

async function getPosts() {
  const data = await fetch("https://posts-api-yj1i.onrender.com/posts", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      apiKey: process.env.POSTS_API_KEY,
    },
  });

  return await data.json();
}

async function getTags() {
  const data = await fetch("https://posts-api-yj1i.onrender.com/posts/tags", {
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.POSTS_API_KEY,
    },
  });

  return await data.json();
}

export default async function Posts() {
  const { result, posts } = await getPosts();
  const { tags = [] } = await getTags();

  const fields = [
    {
      name: "title",
    },
    {
      name: "content",
    },
    {
      name: "createdBy",
    },
    {
      name: "tags",
      type: "select",
      values: tags,
    },
    {
      name: "categorization",
      type: "select",
      values: ["Animaux", "Chats", "Chiens"],
    },
  ];
  return (
    <main className={styles.main}>
      <AddPostForm title="New Post" fields={fields} />
      <div className={styles.list}>
        {result &&
          posts.length &&
          posts.map(post => <Post key={post.id} post={post} />)}
      </div>
    </main>
  );
}
