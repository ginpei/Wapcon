const docker = require('./back/docker.js')

docker.checkMachinStatus()
	.then(result => {
		console.log('Status:', result)
		return result.running ?  docker.stopDocker() : docker.startDocker()
	})
	.then(v => console.log(v))
	.catch(error => console.error('ERROR', error))
