import "../styles/globals.css"
import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../theme"
import { wrapper } from "../redux/store"
// import Header from "../components/Header"
import { Container } from "@material-ui/core"
import { Provider } from "next-auth/client"
// import Footer from "../components/Footer"
import Layout from "../components/layout/Layout"
import "bootstrap/dist/css/bootstrap.min.css"

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Container>
          <CssBaseline />
          <Provider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Container>
      </ThemeProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default wrapper.withRedux(MyApp)
