import theme from "../styles/theme";
import type { AppProps } from "next/app";
import { GlobalStyles } from "@/styles/global";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthGuard from "@/components/Auth/AuthGuard";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const Guard = ({ children, authGuard }: any) => {
    if (authGuard) {
      return <AuthGuard fallback="Carregando">{children}</AuthGuard>;
    }

    return <>{children}</>;
  };

  const authGuard = Component.authGuard ?? true;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Guard authGuard={authGuard}>
            <Component {...pageProps} />
          </Guard>
        </AuthProvider>
        <Toaster position={"top-right"} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
