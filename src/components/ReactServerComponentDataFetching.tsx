const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

/* 
    Valid Next.js Server Component 
*/

const ReactServerComponentDataFetching = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!response.ok) {
    throw new Error("Failed to fetch posts.");
  }

  const posts = (await response.json()) as Post[];

  return (
    <div className="container">
      <h1>Server Component Data Fetching</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReactServerComponentDataFetching;
