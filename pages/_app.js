import Head from "next/head";

import "../styles/style.scss";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Anon Q&A | Damián Catanzaro</title>
                <meta
                    name="description"
                    content="Preguntas y respuestas anonimas a Damián Catanzaro"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
