<script setup lang="ts">
import GiscusComments from '../components/GiscusComments.vue'
</script>

<template>
  <main class="content-page guestbook-page">
    <header class="page-heading">
      <h1>留言板</h1>
      <p>登录 GitHub 后，可以在这里留下想说的话。</p>
    </header>

    <GiscusComments />
  </main>
</template>
