const child_process = require('child_process')

function formatCmdOutput(str) {
  return str
}

const listenList = []

function exec(command) {
  return new Promise((resolve, reject) => {
    listenList.forEach((item) => {
      item.push('> ' + command)
    })
    child_process.exec(command, { encoding: 'utf8' }, (error, stdout, stderr) => {
      console.log(command)
      if (error) {
        error.message = formatCmdOutput(error.message)
        listenList.forEach((item) => {
          item.push(error.toString())
        })
        console.error(error)
        reject(error)
      } else if (stderr) {
        const output = formatCmdOutput(stderr)
        listenList.forEach((item) => {
          item.push(output.trim())
        })
        console.error(output)
        resolve(output)
      } else {
        const output = formatCmdOutput(stdout)
        listenList.forEach((item) => {
          item.push(output.trim())
        })
        console.log(output)
        resolve(output)
      }
    })
  })
}

function getExecContext() {
  const listen = []
  return {
    exec: exec,
    startListen() {
      listenList.push(listen)
    },
    endListen() {
      return listenList.splice(listenList.indexOf(listen), 1)[0]
    },
  }
}

module.exports = {
  exec,
  getExecContext,
}
