<script setup lang="ts">
import ProjectCard from '../components/ProjectCard.vue'
import { projectCategories } from '../data/projects'
</script>

<template>
  <main class="content-page projects-page">
    <header class="page-heading">
      <h1>Projects</h1>
      <p>Things I am building or have worked on.</p>
    </header>

    <section
      v-for="category in projectCategories"
      :key="category.title"
      class="project-category"
      :aria-labelledby="`category-${category.title.replaceAll(' ', '-')}`"
    >
      <h2 :id="`category-${category.title.replaceAll(' ', '-')}`">
        {{ category.title }}
      </h2>
      <div class="project-list">
        <ProjectCard
          v-for="project in category.projects"
          :key="project.name"
          :project="project"
        />
      </div>
    </section>
  </main>
</template>
