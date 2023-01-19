import Script from 'next/script';
import { useEffect ,useState} from 'react';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css'
import { Navbar, Footer } from '../components';
import { NFTProvider } from '../context/NFTContext';
const MyApp = ({ Component, pageProps }) => {
  const [pageLoaded,setPageLoaded] = useState(false);
  
  useEffect(()=>{
    setPageLoaded(true);
  },[]);
return(
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className='pt-65'>
        { (pageLoaded) ?
          <Component {...pageProps} />
          :null}
        </div>
        <Footer />
      </div>
      <Script src="https://kit.fontawesome.com/2be9fdd975.js" crossorigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>
);
}

export default MyApp
