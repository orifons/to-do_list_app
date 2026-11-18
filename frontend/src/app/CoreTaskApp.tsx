import { ThemeProvider } from '@/components/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RouterApp from '@/app/router';


const queryClient = new QueryClient();

function CoreTaskApp() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="coretask-ui-theme">
        <RouterApp />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default CoreTaskApp
