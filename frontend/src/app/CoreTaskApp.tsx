import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { ThemeProvider, useTheme } from '@/components/theme';
import RouterApp from '@/app/router';

const queryClient = new QueryClient();

function AppToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme}
      position="top-center"
      closeButton
      richColors
      visibleToasts={4}
      toastOptions={{
        classNames: {
          toast: "border-border bg-background text-foreground shadow-lg",
          title: "font-semibold",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
    />
  );
}

function CoreTaskApp() {
  useEffect(() => {
    window.dispatchEvent(new Event('coretask:ready'));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="coretask-ui-theme">
        <RouterApp />
        <AppToaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default CoreTaskApp
