import "@/styles/styles.scss"; // Importa o arquivo SCSS principal
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
