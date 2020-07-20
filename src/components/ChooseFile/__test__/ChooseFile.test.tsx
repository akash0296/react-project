import React from 'react'
import { shallow } from 'enzyme'

import ChooseFile from '../index'
import mockChoosFileData from './ChooseFile.mock.json'

describe('Choose file component tests', () => {
	let ChooseFileComp: any = null
	const handleChangeStub = jest.fn()
	beforeEach(() => {
		ChooseFileComp = shallow(
			<ChooseFile
				name={mockChoosFileData.name}
				accept={mockChoosFileData.accept}
				handleChange={handleChangeStub}
			/>
		)
	})

	it('should render a <input type="file"/>', () => {
		expect(ChooseFileComp.find('.custom-file-input').length).toEqual(1)
	})

	it('validates all props', () => {
		expect(ChooseFileComp.find('.custom-file-input').prop('name')).toEqual(
			mockChoosFileData.name
		)
		expect(ChooseFileComp.find('.custom-file-input').prop('type')).toEqual(
			'file'
		)
		expect(ChooseFileComp.find('.custom-file-input').prop('id')).toEqual(
			mockChoosFileData.name
		)
		expect(ChooseFileComp.find('.custom-file-input').prop('accept')).toEqual(
			mockChoosFileData.accept
		)
	})

	it('matches the snaphot', () => {
		expect(ChooseFileComp).toMatchSnapshot()
	})
})
