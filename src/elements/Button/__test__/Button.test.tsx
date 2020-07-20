import React from 'react'
import { shallow } from 'enzyme'

import Button from '../index'

describe('Button element tests', () => {
	let wrapper: null | any = null
	beforeEach(() => {
		wrapper = shallow(<Button title="Some title" />)
	})
	it('should render a <button />', () => {
		expect(wrapper.find('.btn-primary').length).toEqual(1)
	})

	it('matches the snaphot', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
