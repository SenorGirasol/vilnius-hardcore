<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="menu">
  <nav>
    <ul>
      <li aria-current={page.url.pathname === "/" ? "page" : undefined}>
        <a href="/">Home</a>
      </li>
      <li aria-current={page.url.pathname === "/about" ? "page" : undefined}>
        <a href="/about">About</a>
      </li>
      <li aria-current={page.url.pathname === "/events" ? "page" : undefined}>
        <a href="/events">Events</a>
      </li>
      <li>
        <a href="https://mp3.hardcore.lt/1120/">Live @ xi20</a>
      </li>
      <li>
        <a href="https://music.ver.lt">Music</a>
      </li>
      <li aria-current={page.url.pathname === "/blog" ? "page" : undefined}>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <a href="https://oldschool.hardcore.lt">Old version</a>
      </li>
      <li aria-current={page.url.pathname === "/contacts" ? "page" : undefined}>
        <a href="/contacts">Contacts</a>
      </li>
    </ul>
  </nav>
</div>

<style>
  ul {
    position: relative;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li[aria-current="page"]::before {
    --size: 6px;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: calc(47% - var(--size));
    left: calc(0% - var(--size));
    rotate: -90deg;
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--color-text);
  }

  nav a {
    height: 100%;
    padding: 0 0.5rem;
    color: var(--color-text);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
  }

  nav a:hover {
    color: var(--link-hover-color);
  }

  @media screen and (max-width: 720px) {
    nav a {
      font-size: 12pt;
      line-height: 16pt;
    }
  }
</style>
