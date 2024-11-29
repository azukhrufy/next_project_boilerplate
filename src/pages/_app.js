import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
// swr
import { SWRConfig } from "swr";

const SWRConfigValue = {
  refreshInterval: 0,
  shouldRetryOnError: false,
  revalidateOnFocus: false,
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={SWRConfigValue}>
      <ChakraProvider
        // theme={CHAKRA_THEME}
        // colorModeManager={colorModeManager}
        toastOptions={{ defaultOptions: { position: "top-right" } }}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}
