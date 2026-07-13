import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import App from './App.vue'

const styles = readFileSync('src/style.css', 'utf8')
const indexHtml = readFileSync('index.html', 'utf8')

describe('personal landing page', () => {
  it('introduces Acbox with the requested description', () => {
    const wrapper = mount(App)

    expect(wrapper.get('h1').text()).toBe('Acbox')
    expect(wrapper.text()).toContain(
      '📦神秘纸箱 · Developer · 希望能成为一个幸福的孩子',
    )
  })

  it('renders the requested social destinations', () => {
    const wrapper = mount(App)

    expect(wrapper.get('[aria-label="GitHub"]').attributes('href')).toBe(
      'https://github.com/sheepbox8646',
    )
    expect(wrapper.get('[aria-label="X"]').attributes('href')).toBe(
      'https://x.com/AcboxLiu',
    )
    expect(wrapper.get('[aria-label="Telegram"]').attributes('href')).toBe(
      'https://t.me/acboxawa',
    )
  })

  it('links the email icon to the requested address', () => {
    const wrapper = mount(App)
    const email = wrapper.get('[aria-label="Email"]')

    expect(email.element.tagName).toBe('A')
    expect(email.attributes('href')).toBe('mailto:me@ac.box')
    expect(email.attributes('data-tooltip')).toBe('me@ac.box')
  })

  it('uses a shadow-free design and only recolors social icons on hover', () => {
    expect(styles).not.toContain('box-shadow:')
    expect(styles).toContain('transition: color 160ms ease;')
    expect(styles).not.toContain('translateY')
    expect(styles).not.toContain('background: rgba(228, 167, 42')
  })

  it('gives every platform icon its own brand color', () => {
    const wrapper = mount(App)

    expect(wrapper.get('[aria-label="GitHub"]').classes()).toContain(
      'social-github',
    )
    expect(wrapper.get('[aria-label="X"]').classes()).toContain('social-x')
    expect(wrapper.get('[aria-label="Telegram"]').classes()).toContain(
      'social-telegram',
    )
    expect(wrapper.get('[aria-label="Email"]').classes()).toContain(
      'social-email',
    )
    expect(styles).toContain('color: #64727e;')
    expect(styles).toContain('color: #5b6873;')
    expect(styles).toContain('color: #6c9fb3;')
    expect(styles).toContain('color: #83939f;')
  })

  it('uses a near-white blue theme throughout the page', () => {
    expect(styles).toContain('background: #f4f8fc;')
    expect(styles).not.toContain('#fff7df')
    expect(indexHtml).toContain('name="theme-color" content="#f4f8fc"')
  })

  it('uses the proportion-corrected square favicon', () => {
    expect(indexHtml).toContain('type="image/png" href="/favicon.png"')
  })

  it('uses a compact layout without glow or gradient dividers', () => {
    expect(styles).not.toContain('radial-gradient')
    expect(styles).not.toContain('linear-gradient')
    expect(styles).toContain('font-size: clamp(1.7rem, 4.5vw, 2rem);')
    expect(styles).toContain('font-size: clamp(0.84rem, 2.2vw, 0.95rem);')
    expect(styles).toContain('gap: 2px;')
    expect(styles).toContain('width: 20px;')
    expect(styles).toContain('height: 20px;')
  })
})
