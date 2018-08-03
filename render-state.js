const render = (state, options) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Tic-tac-toe</title>
</head>

<body>
	<table align="center">
		<tr><td>${renderCaption(state)}</td></tr>
		<tr><td>${renderTable(state)}</td></tr>
		<tr><td align="center"><a href="../index.html">Back</a></td></tr>
	</table>
</body>
</html>`;

const renderCaption = state => {
	if(state.winner){
		if(state.winner == "tie"){
			return `It's a tie!`;
		}else{
			return `Player ${state.winner.toUpperCase()} wins!`;
		}
	}
	return `Player ${state.player.toUpperCase()}'s turn.`;
}

const renderTable = state => {
	let cells = state.field.slice();
	Object.keys(state.moves).forEach(move => {
		cells[+move] = renderLink(state.moves[move]);
	});
	return `<table align="center">${[0, 1, 2].map(i => `<tr>
			${[0, 1, 2].map(j => `<td>${cells[3 * i + j]}</td>`).join("")}
	</tr>`).join("")}</table>`
}

const renderLink = key => `<a href="./${key}.html">_</a>`;

module.exports = render;