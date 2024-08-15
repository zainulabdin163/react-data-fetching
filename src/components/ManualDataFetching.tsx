import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

const ManualDataFetching = () => {
  const [error, setError] = useState<Error | string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current?.signal,
        });

        const posts = (await response.json()) as Post[];

        setPosts(posts);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
            return;
          }

          setError(error);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (isLoading)
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );

  if (error) {
    return (
      <div className="container">
        <h1>Something went wrong! Please try again.</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Manual Data Fetching</h1>

      <button onClick={() => setPage((page) => page + 1)}>
        Fetch Next Page {page}
      </button>

      {isLoading && <h1>Loading...</h1>}

      {!isLoading && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManualDataFetching;
