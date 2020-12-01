<script>
  // Define vars and routes
  const title = 'Grotto';
</script>

<header>
  <h3 class="content">
    <a href="/" title="Profile">
      { title }
    </a>
    <section class="nav-links">
      <a href="/profile" title="Profile">
        <img class="icon-link" src="/tv-icon.png" alt="profile link"/>
      </a>
      <a href="/watchparties" title="My watch parties">
        <img class="icon-link" src="/tv-icon.png" alt="watch parties link"/>
      </a>
    </section>
  </h3>
</header>


<style>
  header {
    width: 100%;
    background: var(--background);
    flex-shrink: 0;
  }

  header .content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 1em;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header .icon-link {
    width: 2.5rem;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }

  a:hover {
    color: var(--primary-dark);
  }

  h3 {
    margin: 0px;
  }
</style>