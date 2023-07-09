import { describe, it, expect } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import { mount } from '@vue/test-utils'
import DistanceOutput from '../DistanceOutput.vue'

installQuasarPlugin()

describe.concurrent('DistanceOutput', () => {
  it('renders', () => {
    const wrapper = mount(DistanceOutput, {
      props: {
        unit: 'txt',
        distance: 1
      }
    })
    expect(wrapper.text()).toContain('txt')
    expect(wrapper.text()).toContain('1')
  })

  it('matches snapshot', () => {
    const wrapper = mount(DistanceOutput, {
      props: {
        unit: 'txt',
        distance: 1
      }
    })
    expect(wrapper.text()).toMatchSnapshot()
  })
})
