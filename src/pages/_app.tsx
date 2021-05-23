import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "styles/globals.css";

import { Provider as AuthProvider } from "next-auth/client";
import { Provider as StateProvider } from "react-redux";
import { store } from "lib/redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider session={pageProps.session}>
      <StateProvider store={store}>
        <Component {...pageProps} />
      </StateProvider>
    </AuthProvider>
  );
};

export default MyApp;
