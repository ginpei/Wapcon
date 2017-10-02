const expect = require('chai').expect
const sinon = require('sinon')

const bridge = require('../../../front/lib/bridge.js')
const functions = bridge.functions

describe('front/lib/bridge', () => {
	let stubs

	beforeEach(() => {
		stubs = []
	})

	afterEach(() => {
		stubs.forEach(stub => stub.restore())
	})

	describe('run()', () => {
		const channel = 'foo-bar'
		let arg
		let on
		let send
		let listener

		beforeEach(() => {
			arg = {}

			on = sinon.stub(functions.ipcRenderer, 'on')
			stubs.push(on)
			send = sinon.stub(functions.ipcRenderer, 'send')
			stubs.push(send)

			listener = sinon.spy()
			const createListener = sinon.stub(functions, 'createListener')
				.returns(listener)
			stubs.push(createListener)

			functions.run(channel, arg)
		})

		it('registers a listener', () => {
			expect(on.calledWithExactly('foo-bar', listener)).to.equal(true)
		})

		it('sends arguments to main proc', () => {
			expect(send.calledWith(channel)).to.equal(true)
			expect(send.args[0][0]).to.equal('foo-bar')
			const envelope = send.args[0][1]
			expect(envelope.arg).to.equal(arg)
		})
	})

	describe('getNewId()', () => {
		it('always returns new ID', () => {
			const result0 = functions.getNewId()
			const result1 = functions.getNewId()
			expect(result0).not.to.equal(result1)
		})
	})

	describe('createListener()', () => {
		let removeListener
		let channel
		let resolve
		let reject

		beforeEach(() => {
			removeListener = sinon.stub(functions.ipcRenderer, 'removeListener')
			stubs.push(removeListener)

			channel = 'foo-bar'
			resolve = sinon.spy()
			reject = sinon.spy()
		})

		afterEach(() => {
			removeListener.restore()
		})

		describe('called with a different ID', () => {
			beforeEach(() => {
				const bridge$id = 123
				const listener = functions.createListener({ channel, bridge$id, resolve, reject })
				const event = {}
				const envelope = { bridge$id: 999, result: {} }
				listener(event, envelope)
			})

			it('invokes nothing', () => {
				expect(resolve.called).to.equal(false)
				expect(reject.called).to.equal(false)
			})

			it('keeps the callback registered', () => {
				expect(removeListener.called).to.equal(false)
			})
		})

		describe('called with the same ID and result', () => {
			let listener
			let envelope

			beforeEach(() => {
				const bridge$id = 123
				listener = functions.createListener({ channel, bridge$id, resolve, reject })
				const event = {}
				envelope = { bridge$id: 123, result: {} }
				listener(event, envelope)
			})

			it('resolves carrying result', () => {
				expect(resolve.calledWithExactly(envelope.result)).to.equal(true)
				expect(reject.called).to.equal(false)
			})

			it('removes the callback', () => {
				expect(removeListener.calledWithExactly(channel, listener)).to.equal(true)
			})
		})

		describe('called with the same ID and error', () => {
			let listener
			let envelope

			beforeEach(() => {
				const bridge$id = 123
				listener = functions.createListener({ channel, bridge$id, resolve, reject })
				const event = {}
				envelope = { bridge$id: 123, error: {}, result: {} }
				listener(event, envelope)
			})

			it('rejects carrying an error', () => {
				expect(resolve.called).to.equal(false)
				expect(reject.calledWithExactly(envelope.error)).to.equal(true)
			})

			it('removes the callback', () => {
				expect(removeListener.calledWithExactly(channel, listener)).to.equal(true)
			})
		})
	})
})
