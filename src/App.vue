<template>
  <div class="site-shell">
    <header class="site-header">
      <nav class="site-nav" aria-label="主导航">
        <RouterLink to="/">Me</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/guestbook">留言板</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
