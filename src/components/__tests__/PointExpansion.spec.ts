import { describe, it, expect } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import { mount } from '@vue/test-utils'
import PointExpansionVue from '../PointExpansion.vue'

installQuasarPlugin()

describe.concurrent('PointExpansion', () => {
  it('renders closed', () => {
    const wrapper = mount(PointExpansionVue, {
      props: {
        title: 'txt',
        opened: false
      },
      slots: { default: 'content' }
    })
    expect(wrapper.text()).toContain('txt')
    expect(wrapper.html()).toContain('content')
    expect(
      wrapper
        .findAll('div')
        .filter((node) => node.text() === 'content')[0]
        .isVisible()
    ).toBe(false)
  })

  it('renders opened', () => {
    const wrapper = mount(PointExpansionVue, {
      props: {
        title: 'txt',
        opened: true
      },
      slots: { default: 'content' }
    })
    expect(wrapper.text()).toContain('txt')
    expect(wrapper.html()).toContain('content')
    expect(
      wrapper
        .findAll('div')
        .filter((node) => node.text() === 'content')[0]
        .isVisible()
    ).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(PointExpansionVue, {
      props: {
        title: 'txt',
        opened: false
      },
      slots: { default: 'content' }
    })
    expect(wrapper.text()).toMatchSnapshot()
  })

  it('opens', async () => {
    const wrapper = mount(PointExpansionVue, {
      props: {
        title: 'txt',
        opened: false
      },
      slots: { default: 'content' }
    })
    expect(wrapper.text()).toContain('txt')
    expect(wrapper.html()).toContain('content')
    expect(
      wrapper
        .findAll('div')
        .filter((node) => node.text() === 'content')[0]
        .html()
        .includes('display: none')
    ).toBe(true)
    await wrapper.find('legend').trigger('click')
    expect(
      wrapper
        .findAll('div')
        .filter((node) => node.text() === 'content')[0]
        .html()
        .includes('display: none')
    ).toBe(false)
  })
})
