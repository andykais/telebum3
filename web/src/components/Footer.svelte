<script>
  // Define vars and routes
  const message = 'Made with ♥ on Earth';

</script>


<footer>
  <p class={'message'}>{message}</p>
</footer>


<!-- ============== Styles ============== -->
<style>
  footer {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2.5rem; /* Footer height */
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  p.message {
    margin: 0px;
  }
</style>