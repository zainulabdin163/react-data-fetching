import ManualDataFetching from "./components/ManualDataFetching";
import ReactQueryDataFetching from "./components/ReactQueryDataFetching";

const App = () => {
  return (
    <>
      <ReactQueryDataFetching />
      <ManualDataFetching />

      {/*  
      
      - Valid Next.js Component -

      <Suspense fallback={<div>Loading...</div>}>
        <ReactServerComponentDataFetching />
      </Suspense> 
  
      */}
    </>
  );
};

export default App;
