<script>
  // TODO: include nav, search bar, header, footer
  import Header from '$components/Header.svelte'
  import Footer from '$components/Footer.svelte'
</script>

<style>
  main {
    position: relative;
    text-align: center;
    margin: 0 auto;
    min-height: 100vh;

    /* stretches page to full height and puts footer on bottom: */
    /* DOCS https://dev.to/domysee/keeping-the-footer-at-the-bottom-with-css-flexbox-5h5f */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .page-wrapper {
    flex-grow: 1; /* for keeping footer on bottom */
    width: 100%;
    background-color: var(--purple-page-background);
    padding: 1rem 0;
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;

    /* Color variables */
    --background: #F3F0F7;
    --purple-page-background: #e8e4ff;

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

<svelte:head>
  <style>
    * {
      margin: 0;
    }
  </style>
</svelte:head>

<main>
  <Header/>
  <div class="page-wrapper">
    <slot></slot>
  </div>
  <Footer/>
</main>
