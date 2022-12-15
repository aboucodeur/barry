#!/usr/bin/env node
const cp = require("node:child_process")
const readline = require("node:readline")
const os = require("node:os")
const path = require("node:path")
const { promisify } = require("node:util")
const { stdout: output, stdin: input } = require("node:process")

const scriptPath = path.join(__dirname, "../script", "barry.sh")
const rl = readline.createInterface({ input, output })
const execPromises = promisify(cp.exec)
const trimed = (str = "") => str && str.trim()
const close = (input, cb) => {
    cb()
    return input.close()
}

const oss = ["darwin", "linux"]
if (!oss.includes(os.platform())) console.error("Work in ( Linux , Macos )")
else
    rl.question("Your Domain : something.aboucodeur.something \n --------------------------------- : ", (answer) => {
        return execPromises(`/bin/bash ${scriptPath} ${answer || "ultra-glk.com"}`)
            .then(({ stdout, stderr }) => {
                // ** if no errors
                if (!stderr) {
                    const emptyOut = !trimed(stdout)
                    if (emptyOut) close(rl, () => console.log("No internet connection please try again"))
                    else {
                        console.log(trimed(stdout))
                        rl.question("Do you want to ssh this  : [ y:user / n ] : ", (sshans) => {
                            const convertAnswer = sshans.trim().toLowerCase()
                            if (convertAnswer.includes("y")) {
                                // ** give me ssh command string
                                const extractUser = convertAnswer.split(":")[1] || process.env.USERNAME
                                const sshCommand = `ssh ${extractUser}@${trimed(stdout)}`
                                close(rl, () => console.log(sshCommand))
                            }
                            else close(rl, () => {
                                console.log(`your serverip is : ${trimed(stdout)}`)
                                console.log("Thanks !!!")
                            })

                        })
                    }
                }
                else close(rl, () => console.error(stderr))
            })
            .catch(err => console.error(err))
    })