import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";

import "../global.css";

const QogitaApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <RecoilRoot>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </RecoilRoot>
);

export default QogitaApp;
