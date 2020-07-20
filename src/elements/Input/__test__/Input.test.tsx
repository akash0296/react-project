import React from 'react'
import { shallow } from 'enzyme'

import Input from '../index'
import mockInputData from './Input.mock.json'

describe('Input element tests', () => {
	let inputElem: any = null
	const handleChangeStub = jest.fn()
	beforeEach(() => {
		inputElem = shallow(
			<Input
				inputType={mockInputData.inputType}
				val={mockInputData.val}
				handleChange={handleChangeStub}
			/>
		)
	})

	it('should render a <input />', () => {
		expect(inputElem.find('.custom-input').length).toEqual(1)
	})

	it('validates all props', () => {
		expect(inputElem.find('.custom-input').prop('value')).toEqual(
			mockInputData.val
		)
		expect(inputElem.find('.custom-input').prop('type')).toEqual(
			mockInputData.inputType
		)
	})

	it('checks the DOM events', () => {
		inputElem
			.find(`.custom-input`)
			.simulate('change', { target: { value: mockInputData.val } })

		expect(handleChangeStub).toHaveBeenCalledTimes(1)
	})

	it('matches the snaphot', () => {
		expect(inputElem).toMatchSnapshot()
	})
})
