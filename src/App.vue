<template>
  <main class="landing-page">
    <section class="profile" aria-labelledby="profile-name">
      <img
        class="avatar"
        src="/avatar.jpg"
        alt="Acbox 的头像"
        width="132"
        height="132"
      />

      <div class="intro">
        <h1 id="profile-name">Acbox</h1>
        <p>Developer · Open Source · 小箱子</p>
      </div>

      <nav class="social-links" aria-label="社交链接">
        <a
          class="social-link social-github"
          href="https://github.com/sheepbox8646"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          data-tooltip="GitHub"
        >
          <span class="social-icon icon-github" aria-hidden="true"></span>
        </a>

        <a
          class="social-link social-x"
          href="https://x.com/AcboxLiu"
          target="_blank"
          rel="noreferrer"
          aria-label="X"
          data-tooltip="X"
        >
          <span class="social-icon icon-x" aria-hidden="true"></span>
        </a>

        <a
          class="social-link social-telegram"
          href="https://t.me/acboxawa"
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
          data-tooltip="Telegram"
        >
          <span class="social-icon icon-telegram" aria-hidden="true"></span>
        </a>

        <a
          class="social-link social-email"
          href="mailto:me@ac.box"
          aria-label="Email"
          data-tooltip="me@ac.box"
        >
          <span class="social-icon icon-mail" aria-hidden="true"></span>
        </a>
      </nav>
    </section>
  </main>
</template>
