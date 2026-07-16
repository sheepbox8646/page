export interface Project {
  name: string
  description: string
  homepageUrl?: string
  githubRepo?: `${string}/${string}`
  logoUrl?: string
  deprecated?: boolean
}

export interface ProjectCategory {
  title: 'Current Focused' | 'AI' | 'Others'
  projects: Project[]
}

const memoh: Project = {
  name: 'Memoh',
  description: 'An open-source multi-agent platform where every agent gets a computer.',
  githubRepo: 'memohai/Memoh',
  logoUrl: '/project-logos/memoh.svg',
}

export const projectCategories: ProjectCategory[] = [
  {
    title: 'Current Focused',
    projects: [
      memoh,
      {
        name: 'Oh My GitHub',
        description: 'An unofficial GitHub desktop client for repository workflows.',
        githubRepo: 'ohmygit-hub/ohmygithub',
        logoUrl: '/project-logos/oh-my-github.svg',
      },
    ],
  },
  {
    title: 'AI',
    projects: [
      {
        name: 'ChatTutor',
        description: 'A visual and interactive AI tutor.',
        githubRepo: 'HugeCatLab/ChatTutor',
        logoUrl: '/project-logos/chat-tutor.png',
        deprecated: true,
      },
      memoh,
      {
        name: 'Twilight AI',
        description: 'A lightweight, idiomatic AI SDK for Go.',
        githubRepo: 'memohai/twilight-ai',
        logoUrl: '/project-logos/twilight-ai.png',
      },
    ],
  },
  {
    title: 'Others',
    projects: [
      {
        name: 'VueMotion',
        description: 'An animation engine for the Vue ecosystem.',
        githubRepo: 'Bug-Duck/vuemotion',
        logoUrl: '/project-logos/vuemotion.svg',
        deprecated: true,
      },
    ],
  },
]
