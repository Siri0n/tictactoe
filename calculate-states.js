const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const PLAYER_X  = "x";
const PLAYER_O = "o";
const EMPTY_CELL = "_";
const TIE = "tie";

const getOtherPlayer = player => player == PLAYER_X ? PLAYER_O : PLAYER_X;

const getWinner = state => {
	for(let line of lines){
		if(line.every(n => state.field[n] == PLAYER_X)){
			return PLAYER_X;
		}
		if(line.every(n => state.field[n] == PLAYER_O)){
			return PLAYER_O;
		}
	}
  if(!state.field.some(cell => cell == EMPTY_CELL)){
    return TIE;
  }
}

const initialState = {
	player: PLAYER_X,
	field: Array.from(Array(9)).map(() => EMPTY_CELL),
	moves: {}
}

const stateHash = {};

const states = [];

const getKey = (() => {
  const keyHash = {};
  let lastKey = 0;
  return state => {
    const keyString = state.field.join("");
    if(!keyHash[keyString]){
      keyHash[keyString] = lastKey++;
    }
    return keyHash[keyString];
  }
})();

const addState = (state) => {
	let key = getKey(state);
	if(key in stateHash){
		return key;
	}
	stateHash[key] = state;
	state.key = key;
	states.push(state);
  return key;
}

addState(initialState);

const processState = state => {
	let winner = getWinner(state);
	if(winner){
		state.winner = winner;
		return;
	}
	state.field.forEach((cell, index) => {
		if(cell != EMPTY_CELL){
			return;
		}
		let newState = {
			player: getOtherPlayer(state.player),
			field: state.field.slice(),
			moves: {}
		}
		newState.field[index] = state.player;
		let key = addState(newState);
		state.moves[index] = key;
	});
}

const calculateResult = state => {
  if(state.winner){
    state.result = state.winner;
    return;
  }
  const children = Object.keys(state.moves).map(i => stateHash[state.moves[i]]);
  if(children.some(child => !child.result)){
    throw new Error(state.key);
  }
  if(children.some(child => child.result == state.player)){
    state.result = state.player;
    return;
  }
  if(children.some(child => child.result == TIE)){
    state.result = TIE;
    return;
  }
  state.result = getOtherPlayer(state.player);
}

const main = () => {
  let i = 0;
	while(i < states.length){
		processState(states[i++]);
	}
  while(i > 0){
    calculateResult(states[--i]);
  }
	return stateHash;
}

module.exports = main();