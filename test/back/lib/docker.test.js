const expect = require('chai').expect
const path = require('path')
const sinon = require('sinon')

const docker = require('../../../back/docker.js')
const functions = docker.functions

describe('back/docker', () => {
	describe('createArgFromPreferences()', () => {
		let result

		beforeEach(() => {
			const resolveStub = sinon.stub(path, 'resolve')
			resolveStub.withArgs('user/db').returns('/path/to/wapcon/user/db')
			resolveStub.withArgs('user/wp').returns('/path/to/wapcon/user/wp')
			resolveStub.withArgs('~/my-great-theme').returns('/home/foo/my-great-theme')

			result = functions.createArgFromPreferences({
				databasePath: 'user/db',
				themeList: [
					{ path: '~/my-great-theme' },
				],
				wordpressPath: 'user/wp',
			})
		})

		afterEach(() => {
			path.resolve.restore()
		})

		it('returns resolved db path', () => {
			expect(result.databasePath).to.equal('/path/to/wapcon/user/db')
		})

		it('returns resolved wp path', () => {
			expect(result.wordpressPath).to.equal('/path/to/wapcon/user/wp')
		})

		it('returns `-v` options', () => {
			expect(result.themeVolumeOptions.length).to.equal(2)
			expect(result.themeVolumeOptions[0]).to.equal('-v')
			expect(result.themeVolumeOptions[1]).to.equal('/home/foo/my-great-theme:/var/www/html/wp-content/themes/wapcon-0')
		})
	})
})
