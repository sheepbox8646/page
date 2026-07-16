import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Project } from '../data/projects'
import { clearGitHubRepositoryCache } from '../services/github'
import ProjectCard from './ProjectCard.vue'

const githubProject: Project = {
  name: 'example',
  description: 'An example repository.',
  githubRepo: 'owner/example',
}

function githubResponse(stargazersCount: number, archived = false) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      stargazers_count: stargazersCount,
      archived,
    }),
  } as Response
}

describe('ProjectCard', () => {
  beforeEach(() => {
    clearGitHubRepositoryCache()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows loading and then live GitHub stars and archived state', async () => {
    let resolveResponse: (response: Response) => void = () => undefined
    const response = new Promise<Response>((resolve) => {
      resolveResponse = resolve
    })
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(response))

    const wrapper = mount(ProjectCard, { props: { project: githubProject } })
    await nextTick()
    expect(wrapper.get('.project-github-icon').exists()).toBe(true)
    expect(wrapper.get('.project-star-icon').text()).toBe('★')
    expect(wrapper.get('.project-stars').text()).toContain('Stars')
    expect(wrapper.get('.project-stars').text()).toContain('…')

    resolveResponse(githubResponse(1234, true))
    await flushPromises()

    expect(wrapper.get('.project-stars').text()).toContain('Stars')
    expect(wrapper.get('.project-stars').text()).toContain('1,234')
    expect(wrapper.text()).toContain('Deprecated')
  })

  it('shows an unavailable state instead of reporting zero on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 403 } as Response),
    )

    const wrapper = mount(ProjectCard, { props: { project: githubProject } })
    await flushPromises()

    expect(wrapper.text()).toContain('Stars unavailable')
    expect(wrapper.text()).not.toContain('Stars 0')
  })

  it('reuses successful repository metadata during the session', async () => {
    const fetchMock = vi.fn().mockResolvedValue(githubResponse(8))
    vi.stubGlobal('fetch', fetchMock)

    const first = mount(ProjectCard, { props: { project: githubProject } })
    await flushPromises()
    first.unmount()

    const second = mount(ProjectCard, { props: { project: githubProject } })
    await flushPromises()

    expect(second.text()).toContain('Stars 8')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('aborts an unfinished GitHub request when unmounted', () => {
    let requestSignal: AbortSignal | undefined
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: string, init?: RequestInit) => {
        requestSignal = init?.signal ?? undefined
        return new Promise<Response>(() => undefined)
      }),
    )

    const wrapper = mount(ProjectCard, { props: { project: githubProject } })
    wrapper.unmount()

    expect(requestSignal?.aborted).toBe(true)
  })

  it('supports linked non-GitHub projects without GitHub metadata', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const wrapper = mount(ProjectCard, {
      props: {
        project: {
          name: 'website',
          description: 'A standalone website.',
          homepageUrl: 'https://example.com',
          deprecated: true,
        },
      },
    })

    expect(wrapper.get('h3 a').attributes('href')).toBe('https://example.com')
    expect(wrapper.find('.project-github').exists()).toBe(false)
    expect(wrapper.find('.project-stars').exists()).toBe(false)
    expect(wrapper.find('.project-logo-empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('Deprecated')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('renders a configured project logo in the square logo area', () => {
    vi.stubGlobal('fetch', vi.fn())

    const wrapper = mount(ProjectCard, {
      props: {
        project: {
          name: 'website',
          description: 'A standalone website.',
          logoUrl: '/project-logo.png',
        },
      },
    })

    expect(wrapper.get('.project-logo img').attributes('src')).toBe(
      '/project-logo.png',
    )
    expect(wrapper.find('.project-logo-empty').exists()).toBe(false)
  })
})
