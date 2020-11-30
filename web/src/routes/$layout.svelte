<script>
  // TODO: include nav, search bar, header, footer
  import Header from '$components/Header.svelte'
  import Footer from '$components/Footer.svelte'
</script>

<svelte:head>
  <style>
    * {
      margin: 0;
    }
  </style>
</svelte:head>

<main>
  <Header/>
  <slot></slot>
  <Footer/>
</main>

<style>
  main {
    position: relative;
    text-align: center;
    padding-bottom: 2.5rem;    /* Footer height */
    margin: 0 auto;
    min-height: 100vh;
    box-sizing: border-box;
    min-height: 100vh;
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;

    /* Color variables */
    --background: #F3F0F7;

    --primary: #3f50b5;
    --primary-light: #757ce8;
    --primary-dark: #002884;
    --primary-contrast: #fff;

    --secondary: #f44336;
    --secondary-light: #ff7961;
    --secondary-dark: #ba000d;
    --secondary-contrast: #000;

    --neutral: #858199;

    /* Sizing & Spacing vars */
    --max-width: 1024px;

  }
</style>