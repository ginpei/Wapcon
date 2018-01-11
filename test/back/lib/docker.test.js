const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const sinon = require('sinon')

const expect = chai.expect
chai.use(chaiAsPromised)

const wapconDocker = require('wapcon-docker')
const docker = require('../../../back/docker.js')  // TODO move this file outside "lib" as well as the target

const functions = docker.functions

let result

describe('back/docker', () => {
	beforeEach(() => {
		result = undefined
	})

	describe('checkMachinStatus', () => {
		beforeEach(() => {
			sinon.stub(wapconDocker, 'checkImageStatus')
			sinon.stub(wapconDocker, 'checkMachineStatus')
		})

		afterEach(() => {
			wapconDocker.checkImageStatus.restore()
			wapconDocker.checkMachineStatus.restore()
		})

		describe('when images are not ready', () => {
			beforeEach(async () => {
				wapconDocker.checkImageStatus
					.returns({ ok: false })

				result = await functions.checkMachineStatus()
			})

			it('does not make status running', () => {
				expect(result.running).to.equal(false)
			})
		})

		describe('when containers are not ready', () => {
			beforeEach(async () => {
				wapconDocker.checkImageStatus
					.returns({ ok: true })
				wapconDocker.checkMachineStatus
					.returns({ ok: false, wp: true, db: false })

				result = await functions.checkMachineStatus()
			})

			it('does not make status running', () => {
				expect(result.running).to.equal(false)
			})

			it('contains wp status', () => {
				expect(result.wp).to.equal(true)
			})

			it('contains db status', () => {
				expect(result.db).to.equal(false)
			})
		})

		describe('when containers are ready', () => {
			beforeEach(async () => {
				wapconDocker.checkImageStatus
					.returns({ ok: true })
				wapconDocker.checkMachineStatus
					.returns({ ok: true })

				result = await functions.checkMachineStatus()
			})

			it('does not make status running', () => {
				expect(result.running).to.equal(true)
			})
		})
	})
})
