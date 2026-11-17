import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RouterApp from '@/app/router';


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterApp />
    </QueryClientProvider>
  )
}

export default App
