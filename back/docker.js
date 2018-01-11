const docker = require('wapcon-docker')

const bridge = require('./lib/bridge.js')

async function checkMachineStatus() {
	const status = {}
	const imageStatus = await docker.checkImageStatus()
	if (!imageStatus.ok) {
		status.running = false
	}
	else {
		const machineStatus = await docker.checkMachineStatus()
		status.running = machineStatus.ok
		status.wp = machineStatus.wp
		status.db = machineStatus.db
	}
	return status
}

module.exports = {
	init() {
		bridge('checkMachinStatus', checkMachineStatus)

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
module.exports.functions = {
	checkMachineStatus,
}
