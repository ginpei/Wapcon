const docker = require('wapcon-docker')

const bridge = require('./lib/bridge.js')

module.exports = {
	init() {
		bridge('checkMachinStatus', async (_, options) => {
			const status = {}
			const imageStatus = await docker.checkImageStatus()
			if (!imageStatus.ok) {
				status.running = false
			}
			else {
				const machineStatus = await docker.checkMachineStatus()
				if (machineStatus.ok) {
					status.running = true
				}
				else {
					status.running = false
					status.wp = status.wp
					status.db = status.db
				}
			}
			return status
		})

		bridge('startMachine', async (_, options) => {
			return await docker.startMachine(null, options)
		})

		bridge('stopMachine', async (_, options) => {
			return await docker.stopMachine()
		})

		bridge('checkImageAvailability', async (_, options) => {
			return await docker.checkImageStatus()
		})
	},
}
