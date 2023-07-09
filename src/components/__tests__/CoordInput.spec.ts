import { describe, it, expect } from 'vitest'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

import { mount } from '@vue/test-utils'
import CoordInputVue from '../CoordInput.vue'

installQuasarPlugin()

describe.concurrent('CoordInput', () => {
  it('renders', () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lat'
      }
    })
    expect(wrapper.text()).toContain('txt')
    expect(wrapper.find('input').element.value).toBe('1')
  })

  it('matches snapshot', () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lat'
      }
    })
    expect(wrapper.text()).toMatchSnapshot()
  })

  it('interacts', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lat'
      }
    })
    expect(wrapper.find('input').element.value).toBe('1')
    await wrapper.find('input').setValue('2')
    expect(wrapper.find('input').element.value).toBe('2')
  })

  it('emits', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lat'
      }
    })
    await wrapper.find('input').setValue('2')
    const emitted = wrapper.emitted()
    expect(emitted).toHaveProperty('update:value')
    expect(emitted['update:value'].length).toBe(1)
    expect(emitted['update:value'][0]).toEqual([2])
  })

  it('lat bounds to 90', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lat'
      }
    })
    await wrapper.find('input').setValue('89')
    expect(wrapper.emitted()['update:value'][0]).toEqual([89])

    await wrapper.find('input').setValue('91')
    expect(wrapper.emitted()['update:value'][1]).toEqual([NaN])
  })

  it('lat bounds to -90', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lat'
      }
    })
    await wrapper.find('input').setValue('-89')
    expect(wrapper.emitted()['update:value'][0]).toEqual([-89])

    await wrapper.find('input').setValue('-91')
    expect(wrapper.emitted()['update:value'][1]).toEqual([NaN])
  })

  it('lon bounds to 180', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lon'
      }
    })
    await wrapper.find('input').setValue('179')
    expect(wrapper.emitted()['update:value'][0]).toEqual([179])

    await wrapper.find('input').setValue('181')
    expect(wrapper.emitted()['update:value'][1]).toEqual([NaN])
  })

  it('lon bounds to -180', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lon'
      }
    })
    await wrapper.find('input').setValue('-179')
    expect(wrapper.emitted()['update:value'][0]).toEqual([-179])

    await wrapper.find('input').setValue('181')
    expect(wrapper.emitted()['update:value'][1]).toEqual([NaN])
  })

  it('doesnt allow chars', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lon'
      }
    })
    await wrapper.find('input').setValue('12')
    await wrapper.find('input').setValue('asd')
    expect(wrapper.emitted()['update:value'][1]).toEqual([NaN])
  })

  it('allows both dot and comma fraction separator', async () => {
    const wrapper = mount(CoordInputVue, {
      props: {
        title: 'txt',
        value: 1,
        type: 'lon'
      }
    })
    await wrapper.find('input').setValue('12.1')
    expect(wrapper.emitted()['update:value'][0]).toEqual([12.1])
    await wrapper.find('input').setValue('12,1')
    expect(wrapper.emitted()['update:value'][1]).toEqual([12.1])
  })
})
