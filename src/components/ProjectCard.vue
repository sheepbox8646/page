<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import type { Project } from '../data/projects'
import {
  getGitHubRepositoryMetadata,
  type GitHubRepositoryMetadata,
} from '../services/github'

const props = defineProps<{
  project: Project
}>()

const metadata = ref<GitHubRepositoryMetadata>()
const metadataState = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
let controller: AbortController | undefined

const githubUrl = computed(() =>
  props.project.githubRepo
    ? `https://github.com/${props.project.githubRepo}`
    : undefined,
)
const projectUrl = computed(() => props.project.homepageUrl ?? githubUrl.value)
const isDeprecated = computed(
  () => props.project.deprecated === true || metadata.value?.archived === true,
)

const formattedStars = computed(() => {
  if (!metadata.value) return undefined
  return new Intl.NumberFormat('en-US').format(metadata.value.stargazersCount)
})

onMounted(async () => {
  if (!props.project.githubRepo) return

  controller = new AbortController()
  metadataState.value = 'loading'

  try {
    metadata.value = await getGitHubRepositoryMetadata(
      props.project.githubRepo,
      controller.signal,
    )
    metadataState.value = 'ready'
  } catch {
    if (controller.signal.aborted) return
    metadataState.value = 'error'
  }
})

onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <article class="project-card">
    <div class="project-card-main">
      <div
        class="project-logo"
        :class="{ 'project-logo-empty': !project.logoUrl }"
        aria-hidden="true"
      >
        <img
          v-if="project.logoUrl"
          :src="project.logoUrl"
          alt=""
          width="52"
          height="52"
        />
      </div>

      <div class="project-card-copy">
        <h3>
          <a
            v-if="projectUrl"
            :href="projectUrl"
            target="_blank"
            rel="noreferrer"
          >
            {{ project.name }}
          </a>
          <span v-else>{{ project.name }}</span>
        </h3>
        <p>{{ project.description }}</p>
      </div>
    </div>

    <footer v-if="githubUrl || isDeprecated" class="project-meta">
      <a
        v-if="githubUrl"
        class="project-github"
        :href="githubUrl"
        target="_blank"
        rel="noreferrer"
      >
        <span class="project-github-icon" aria-hidden="true"></span>
        GitHub
      </a>
      <span v-if="githubUrl" class="project-stars" aria-live="polite">
        <span class="project-star-icon" aria-hidden="true">★</span>
        Stars
        <span v-if="metadataState === 'loading'">…</span>
        <span v-else-if="metadataState === 'error'">unavailable</span>
        <span v-else-if="metadataState === 'ready'">{{ formattedStars }}</span>
      </span>
      <strong v-if="isDeprecated" class="project-deprecated">
        Deprecated
      </strong>
    </footer>
  </article>
</template>
