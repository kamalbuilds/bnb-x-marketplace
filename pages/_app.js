import '../styles/globals.css';
import dynamic from 'next/dynamic';
import DynamicWagmi from '../src/components/dynamicWagmi';
import 'antd-mobile/es/components/action-sheet/action-sheet';

// const DynamicWagmi = dynamic(() => import('../src/components/dynamicWagmi/index'), {
//     ssr: false,
// });

function MyApp({ Component, pageProps }) {
    return (
        <DynamicWagmi>
            <Component {...pageProps} />
        </DynamicWagmi>
    );
}

export default MyApp;
