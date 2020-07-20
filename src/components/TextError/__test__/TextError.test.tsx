import React from 'react'
import { shallow } from 'enzyme'

import TextError from '../index'
import mockData from './TextError.mock.json'

describe('Text Error component tests', () => {
	let TextErrorComp: any = null
	const handleChangeStub = jest.fn()
	beforeEach(() => {
		TextErrorComp = shallow(<TextError error={mockData.error} />)
	})

	it('should render TextError Component', () => {
		expect(TextErrorComp.find('ErrorTextBlock').length).toEqual(1)
	})

	it('matches the snaphot', () => {
		expect(TextErrorComp).toMatchSnapshot()
	})
})
