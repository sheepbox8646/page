import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMemoryHistory } from 'vue-router'

import App from './App.vue'
import { createAppRouter } from './router'
import { clearGitHubRepositoryCache } from './services/github'

function githubResponse(stargazersCount = 0, archived = false) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      stargazers_count: stargazersCount,
      archived,
    }),
  } as Response
}

async function mountAt(path: string) {
  const router = createAppRouter(createMemoryHistory())
  await router.push(path)
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  })

  return { router, wrapper }
}

describe('personal site', () => {
  beforeEach(() => {
    clearGitHubRepositoryCache()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(githubResponse()))
  })

  it('renders the centered text navigation and personal profile', async () => {
    const { wrapper } = await mountAt('/')
    const links = wrapper.findAll('.site-nav a')

    expect(links.map((link) => link.text())).toEqual([
      'Me',
      'Projects',
      '留言板',
    ])
    expect(links.map((link) => link.attributes('href'))).toEqual([
      '/',
      '/projects',
      '/guestbook',
    ])
    expect(wrapper.get('h1').text()).toBe('Acbox')
    expect(wrapper.text()).toContain('Developer · Open Source · 小箱子')
    expect(document.title).toBe('Acbox')
  })

  it('keeps the requested social destinations', async () => {
    const { wrapper } = await mountAt('/')

    expect(wrapper.get('[aria-label="GitHub"]').attributes('href')).toBe(
      'https://github.com/sheepbox8646',
    )
    expect(wrapper.get('[aria-label="X"]').attributes('href')).toBe(
      'https://x.com/AcboxLiu',
    )
    expect(wrapper.get('[aria-label="Telegram"]').attributes('href')).toBe(
      'https://t.me/acboxawa',
    )
    expect(wrapper.get('[aria-label="Email"]').attributes('href')).toBe(
      'mailto:me@ac.box',
    )
  })

  it('navigates between the projects and guestbook pages', async () => {
    const { router, wrapper } = await mountAt('/')

    await router.push('/projects')
    await flushPromises()
    expect(wrapper.get('h1').text()).toBe('Projects')
    expect(document.title).toBe('Projects · Acbox')

    await router.push('/guestbook')
    await flushPromises()
    expect(wrapper.get('h1').text()).toBe('留言板')
    expect(document.title).toBe('留言板 · Acbox')
  })

  it('redirects unknown routes to the personal profile', async () => {
    const { router, wrapper } = await mountAt('/missing-page')

    expect(router.currentRoute.value.fullPath).toBe('/')
    expect(wrapper.get('h1').text()).toBe('Acbox')
  })

  it('renders both project categories and their initial projects', async () => {
    const { wrapper } = await mountAt('/projects')
    await flushPromises()

    expect(
      wrapper.findAll('.project-category h2').map((node) => node.text()),
    ).toEqual(['Current Focused', 'AI', 'Others'])
    expect(wrapper.findAll('.project-card h3').map((node) => node.text())).toEqual([
      'Memoh',
      'Oh My GitHub',
      'ChatTutor',
      'Memoh',
      'Twilight AI',
      'VueMotion',
    ])
    expect(wrapper.findAll('.project-deprecated')).toHaveLength(2)
    expect(wrapper.findAll('.project-logo img')).toHaveLength(6)
  })
})
