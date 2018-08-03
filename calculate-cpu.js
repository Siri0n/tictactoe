const getRandomElement = array => {
  return array[Math.floor(Math.random()*array.length)];
}

const clone = o => {
  return JSON.parse(JSON.stringify(o));
}

const normalizeKeys = states => {
  const keys = Object.keys(states).sort((a, b) => a - b);
  const newStates = {};
  keys.forEach(key => {
    let state = newStates[keys.indexOf(key)] = states[key];
    Object.keys(state.moves).forEach(index => {
      const newKey = keys.indexOf(state.moves[index] + "");
      state.moves[index] = newKey;
    });
  })
  return newStates;
}

const calculateCPU = (states, cpuPlayer) => {
  const newStatesHash = {};
  const newStates = [];

  const addState = state => {
    state = clone(state);
    newStatesHash[state.key] = state;
    newStates.push(state);
  }

  const processState = state => {
    Object.keys(state.moves).forEach(index => {
      const cpuMove = findCpuMove(
        states[state.moves[index]]
      );
      addState(cpuMove);
      state.moves[index] = cpuMove.key;
    });
  }

  const findCpuMove = state => {
    if(state.player != cpuPlayer){
      return state;
    }
    const children = Object.keys(state.moves).map(i => states[state.moves[i]]);
    return children.find(child => child.result == cpuPlayer) || 
      children.find(child => child.result == "tie") ||
      getRandomElement(children) ||
      state;
  }

  addState(findCpuMove(states[0]));

  let i = 0;
  while(i < newStates.length){
    processState(newStates[i++]);
  }
  return normalizeKeys(newStatesHash);
}

module.exports = calculateCPU;