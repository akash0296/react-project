/**
 * module.config.js
 *
 * This is config file to create modules with the project.
 * module types available to be created ['page', 'component', 'element']
 */

const path = require('path')
const cwd = path.join(__dirname, '..')
const fsp = require('fs').promises
const inquirer = require('inquirer')

/**
 * Factory class of module configurations
 */
class CreateModule {
	/**
	 * module specific questions.
	 * @param {String} questionsFor user selected module - page | component | element
	 */
	askModuleQuestions(questionsFor) {
		const questions = [
			{
				name: 'DIR_NAME',
				type: 'input',
				message: `What is the name of the ${questionsFor}?`,
			},
			{
				name: 'CONTAINER_FILE',
				type: 'confirm',
				message: `Does the ${questionsFor} require a container(HOC) file?`,
			},
			{
				name: 'STYLE_FILE',
				type: 'confirm',
				message: `Does the ${questionsFor} require a style file?`,
			},
			{
				name: 'README_FILE',
				type: 'confirm',
				message: `Does the ${questionsFor} require a Readme file?`,
			},
			{
				name: 'EXAMPLE_FILE',
				type: 'confirm',
				message: `Does the ${questionsFor} require an example file?`,
			},
			{
				name: 'COMPONENTS_DIR',
				type: 'confirm',
				message: `Does the ${questionsFor} require a components sub-directory?`,
			},
			{
				name: 'TEST_DIR',
				type: 'confirm',
				message: `Does the ${questionsFor} require a test sub-directory?`,
			},
			{
				name: 'DUCK_MODULE',
				type: 'confirm',
				message: `Does the ${questionsFor} require a duck sub-directory?`,
			},
			{
				name: 'DUCK_FILES',
				type: 'checkbox',
				message: 'Choose files to be included in the duck sub-directory?',
				choices: [
					'actions',
					'reducer',
					'types',
					'epics',
					'contstants',
					'Services',
				],
				when: answers => answers.DUCK_MODULE,
			},
		]
		return inquirer.prompt(questions)
	}

	/**
	 * intial questions prompt to select a module type
	 */
	selectModuleQuestion() {
		const question = [
			{
				name: 'MODULE_TYPE',
				type: 'list',
				message: "Select a module type you'd like to create?",
				choices: ['page', 'component', 'element'],
			},
		]
		return inquirer.prompt(question)
	}

	init() {
		console.log('\x1b[1;34m', 'Creating a new module...')
	}

	/**
	 * helper function to check of the path exists or not
	 * @param {String} path path to check
	 */
	async checkPath(path) {
		try {
			return fsp
				.access(path)
				.then(() => {
					return true
				})
				.catch(() => {
					return false
				})
		} catch (error) {
			console.error('\x1b[31m%s\x1b[0m', error.message)
			return process.exit()
		}
	}

	/**
	 * Helper method to create file
	 * @param {String} path file path
	 * @param {String} fileContent initial file content
	 */
	async createFile(path, fileContent = '') {
		try {
			await fsp.appendFile(path, fileContent)
		} catch (error) {
			console.error('\x1b[31m%s\x1b[0m', error)
			return process.exit()
		}
	}

	/**
	 * Helper method to create directory
	 * @param {String} path directory path
	 */
	async createDirectory(path) {
		try {
			await fsp.mkdir(path, { recursive: true })
		} catch (error) {
			console.error('\x1b[31m%s\x1b[0m', error)
			return process.exit()
		}
	}

	/**
	 * method to create __test__ sub-directory
	 * @param {String} basePath path to create __test__ sub-directory
	 * @param {String} testName test file name
	 */
	async createTestDir(basePath, testName) {
		try {
			const dirPath = `${basePath}/__test__`
			await this.createDirectory(dirPath)
			await this.createFile(`${dirPath}/${testName}.test.tsx`)
			await this.createFile(`${dirPath}/${testName}.mock.json`)
		} catch (error) {
			console.error('\x1b[31m%s\x1b[0m', error)
			return process.exit()
		}
	}

	/**
	 * method to create modules on src/{moduleType} dir
	 * @param {String} moduleType module type to create
	 * @param {Object} answers user answers from the module specific questions
	 */
	async createModuleFiles(moduleType, answers) {
		try {
			const {
				DIR_NAME,
				DUCK_MODULE,
				DUCK_FILES,
				CONTAINER_FILE,
				README_FILE,
				EXAMPLE_FILE,
				STYLE_FILE,
				TEST_DIR,
				COMPONENTS_DIR,
			} = answers

			/** matching the src/{module} directory naming - src/pages | src/components | src/elements */
			const moduleDirName = `${moduleType}s`
			const basePath = path.join(cwd, `src/${moduleDirName}`)
			const moduleDestination = `${basePath}/${DIR_NAME}`

			if (!DIR_NAME || !moduleDestination) {
				console.error(
					'\x1b[31m%s\x1b[0m',
					'Invalid page name provided. Please try again.'
				)
				return process.exit()
			}

			if (await this.checkPath(moduleDestination)) {
				console.error(
					'\x1b[31m%s\x1b[0m',
					`${moduleType} already exists. Please try again.`
				)
				return process.exit()
			}

			if (!(await this.checkPath(basePath))) {
				const createPathQuestion = [
					{
						name: 'CREATE_DIR',
						type: 'confirm',
						message: `src/${moduleDirName} directory not found. Do you want to create it?`,
					},
				]

				const createPathAnswer = await inquirer.prompt(createPathQuestion)
				const { CREATE_DIR } = createPathAnswer
				if (CREATE_DIR) {
					await this.createDirectory(basePath)
				} else {
					console.log('\x1b[31m%s\x1b[0m', 'Exiting script....')
					return process.exit()
				}
			}

			await this.createDirectory(moduleDestination)
			await this.createFile(`${moduleDestination}/index.tsx`)

			if (CONTAINER_FILE) {
				await this.createFile(`${moduleDestination}/container.tsx`)
			}
			if (README_FILE) {
				await this.createFile(`${moduleDestination}/Readme.md`)
			}

			if (EXAMPLE_FILE) {
				await this.createFile(`${moduleDestination}/${DIR_NAME}.example.tsx`)
			}

			if (STYLE_FILE) {
				await this.createFile(`${moduleDestination}/${DIR_NAME}.styled.ts`)
			}

			if (TEST_DIR) {
				await this.createTestDir(moduleDestination, DIR_NAME)
			}

			if (COMPONENTS_DIR) {
				await this.createDirectory(`${moduleDestination}/components`)
			}

			if (DUCK_MODULE && DUCK_FILES) {
				const ductDestination = `${moduleDestination}/duck`
				await this.createDirectory(ductDestination)
				DUCK_FILES.forEach(
					async file => await this.createFile(`${ductDestination}/${file}.ts`)
				)
			}

			return moduleDestination
		} catch (error) {
			console.error('\x1b[31m%s\x1b[0m', error)
			return process.exit()
		}
	}

	/**
	 * success message after module creation has been successfull
	 * @param {String} path - module created at the path
	 */
	success(path) {
		console.log('\x1b[1;32m', `module successfully created....\n ${path}`)
		process.exit()
	}

	/**
	 * entry point to start the process
	 */
	async createModule() {
		try {
			this.init()

			const moduleTypeAnswers = await this.selectModuleQuestion()

			const { MODULE_TYPE } = moduleTypeAnswers

			// ask questions
			const answers = await this.askModuleQuestions(MODULE_TYPE)

			// create the module
			const modulePath = await this.createModuleFiles.bind(this)(
				MODULE_TYPE,
				answers
			)

			// success message
			this.success(modulePath)
		} catch (error) {
			console.error('\x1b[31m%s\x1b[0m', error)
			return process.exit()
		}
	}
}

/**
 * creating a new factory instance and calling the entry point method
 */
const CreatModuleInstance = new CreateModule()
CreatModuleInstance.createModule()
