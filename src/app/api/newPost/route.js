export async function POST(req) {
  const body = await req.json();
  console.log(process.env.POSTS_TOKEN, body);
  const data = await fetch("https://posts-api-yj1i.onrender.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.POSTS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  const json = await data.json();
  return Response.json(json);
}
