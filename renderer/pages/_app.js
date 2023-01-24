import Head from 'next/head';

import '../styles/global.css';
import '../styles/bootstrap.min.css';
import { appWithTranslation } from 'next-i18next';





const App = ({ Component, pageProps }) => {
    // const router = useRouter();
    // const [authorized, setAuthorized] = useState(false);

    // useEffect(() => {
    //     // run auth check on initial load
    //     authCheck(router.asPath);

    //     // set authorized to false to hide page content while changing routes
    //     const hideContent = () => setAuthorized(false);
    //     router.events.on('routeChangeStart', hideContent);

    //     // run auth check on route change
    //     router.events.on('routeChangeComplete', authCheck)

    //     // unsubscribe from events in useEffect return function
    //     return () => {
    //         router.events.off('routeChangeStart', hideContent);
    //         router.events.off('routeChangeComplete', authCheck);
    //     }
    // }, []);

    // function authCheck(url) {
    //     // redirect to login page if accessing a private page and not logged in 
    //     const publicPaths = ['/login'];
    //     const path = url.split('?')[0];
    //     if (!userService.userValue && !publicPaths.includes(path)) {
    //         setAuthorized(false);
    //         router.push({
    //             pathname: '/login',
    //             query: { returnUrl: router.asPath }
    //         });
    //     } else {
    //         setAuthorized(true);
    //     }
    // }

    return (
        <>
            <Head>
                <title>Amanpreetsing Typing Tester.exe</title>

                {/* bootstrap css */}
                {/* <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" /> */}
            </Head>

            <div className='page-wrapper'>
                <div className="container pt-4 pb-4">
                    {
                        <Component {...pageProps} />
                    }
                </div>
            </div>

            {/* credits */}
            
        </>
    );
}
export default appWithTranslation(App);
