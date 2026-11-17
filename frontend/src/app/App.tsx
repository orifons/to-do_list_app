import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RouterApp from '@/app/router';


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="typeset typeset-docs max-w-[42em]">
        <RouterApp />
      </div>
    </QueryClientProvider>
  )
}

export default App
