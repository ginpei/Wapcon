const expect = require('chai').expect
const sinon = require('sinon')

const obj = {}

describe('front/index.js (temp)', () => {
	let mock

	beforeEach(() => {
		mock = sinon.mock(obj)
	})

	afterEach(() => {
		mock.restore()
	})

	it('runs in test mode', () => {
		expect(process.env.NODE_ENV).to.equal('test')
	})
})
