import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '@/components/Layout';
import { StoreProvider } from '@/store/index';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const renderLayout = () => {
    if ((Component as any).layout === null) {
      return <Component {...pageProps} />
    } else {
      return (
        <>
          <Head>
            <title>京林堂-北京spa会所-北京养生会所-北京洗浴会所-北京娱乐休闲</title>
            <meta name="keywords" content="北京会所,北京spa会所,北京养生会所,北京体验,北京娱乐休闲,北京点评,京林堂,北京京林堂" />
            <meta name="description" content="京林堂是汇集北京会所信息资源分享点评平台,推广最优质北京会所,高端spa会所,个人按摩保健,家庭式休闲,北京丝足会所,桑拿洗浴中心等资源的网站。" />
          </Head>
          <Layout>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MKZCGKP2ZP"></Script>
            <Script
              id="GA4"
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MKZCGKP2ZP');
              `
              }}
            />
            <Component {...pageProps} />
          </Layout>
        </>
      )
    }
  }

  return <StoreProvider initialValue={{ user: {} }}>
    {renderLayout()}
  </StoreProvider>
}
