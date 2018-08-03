const states = require("./calculate-states");
const calculateCPU = require("./calculate-cpu");
const render = require("./render-state");
const fs = require("fs");


function writeFile(key, state, folder){
	return new Promise((resolve, reject) => {
		var html = render(state);
		var filename = `${folder}/${key}.html`;
		fs.writeFile(filename, html, "utf8", err => err ? reject(err) : resolve());
	});
}

var cpuStates1 = calculateCPU(states, "o");
var cpuStates2 = calculateCPU(states, "x");

Promise.all(
  Object.keys(states).map(
    key => writeFile(key, states[key], "hotseat")
  )
)
.then(() => console.log("Hotseat complete"))
.then(
  Promise.all(
    Object.keys(cpuStates1).map(
      key => writeFile(key, cpuStates1[key], "cpu1")
    )
  )
)
.then(() => console.log("CPU1 complete"))
.then(
  Promise.all(
    Object.keys(cpuStates2).map(
      key => writeFile(key, cpuStates2[key], "cpu2")
    )
  )
)
.then(() => console.log("CPU2 complete"))
.then(() => console.log("Success"));