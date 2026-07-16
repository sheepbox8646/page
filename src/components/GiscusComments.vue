<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const container = ref<HTMLDivElement>()

function clearContainer() {
  container.value?.replaceChildren()
}

onMounted(() => {
  if (!container.value) return

  clearContainer()

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.dataset.repo = 'sheepbox8646/page'
  script.dataset.repoId = 'R_kgDOTW0Yvg'
  script.dataset.category = 'Announcements'
  script.dataset.categoryId = 'DIC_kwDOTW0Yvs4DBUKR'
  script.dataset.mapping = 'pathname'
  script.dataset.strict = '0'
  script.dataset.reactionsEnabled = '1'
  script.dataset.emitMetadata = '0'
  script.dataset.inputPosition = 'top'
  script.dataset.theme = 'light'
  script.dataset.lang = 'zh-CN'
  script.dataset.loading = 'lazy'

  container.value.append(script)
})

onBeforeUnmount(clearContainer)
</script>

<template>
  <div ref="container" class="giscus-container"></div>
</template>
