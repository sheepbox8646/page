import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import GiscusComments from './GiscusComments.vue'

describe('GiscusComments', () => {
  afterEach(() => {
    document.body.replaceChildren()
  })

  it('loads Giscus with the repository discussion configuration', () => {
    const wrapper = mount(GiscusComments)
    const script = wrapper.get('script')

    expect(script.attributes('src')).toBe('https://giscus.app/client.js')
    expect(script.attributes('data-repo')).toBe('sheepbox8646/page')
    expect(script.attributes('data-repo-id')).toBe('R_kgDOTW0Yvg')
    expect(script.attributes('data-category')).toBe('Announcements')
    expect(script.attributes('data-category-id')).toBe(
      'DIC_kwDOTW0Yvs4DBUKR',
    )
    expect(script.attributes('data-mapping')).toBe('pathname')
    expect(script.attributes('data-reactions-enabled')).toBe('1')
    expect(script.attributes('data-emit-metadata')).toBe('0')
    expect(script.attributes('data-input-position')).toBe('top')
    expect(script.attributes('data-theme')).toBe('light')
    expect(script.attributes('data-lang')).toBe('zh-CN')
    expect(script.attributes('data-loading')).toBe('lazy')

    wrapper.unmount()
    expect(document.querySelectorAll('script[src="https://giscus.app/client.js"]')).toHaveLength(0)
  })

  it('does not leave duplicate scripts across remounts', () => {
    const first = mount(GiscusComments)
    first.unmount()
    const second = mount(GiscusComments)

    expect(second.findAll('script[src="https://giscus.app/client.js"]')).toHaveLength(1)
  })
})
