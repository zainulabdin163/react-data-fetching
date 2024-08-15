import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

const ReactQueryDataFetching = () => {
  const [page, setPage] = useState(0);

  const { data: posts, isPending } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/posts?page=${page}`);
      return (await response.json()) as Post[];
    },
  });

  return (
    <div className="container">
      <h1>React Query Data Fetching</h1>

      <button onClick={() => setPage((page) => page - 1)}>
        Fetch Previous Page
      </button>

      <button onClick={() => setPage((page) => page + 1)}>
        Fetch Next Page
      </button>

      {isPending && <h1>Loading...</h1>}

      {!isPending && (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReactQueryDataFetching;
