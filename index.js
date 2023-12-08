let tiles = Array.from(document.getElementsByClassName('tile'))  
let values = Array(9).fill(null)
let Light = true;

const do_this = [{opacity: 0},{opacity: 1}]
const pop = [{fontSize: '0'},{fontSize : '100px'}]

let X = 1,O = 1,tie = 1;

function changeMode() {
    if (Light == true) {
        document.getElementsByTagName("body")[0].classList.add("Dark");
        document.getElementsByClassName("board")[0].style.backgroundColor = "#FFFFFF";
        document.getElementsByClassName("title")[0].style.color = "#FFFFFF";
        document.getElementsByTagName("g")[0].style.fill = "white";
        document.getElementById("modes").src = "Assests/darkbulb.png"

        let elem = document.getElementsByClassName("tile");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.backgroundColor = "#000000";
            elem[i].style.color = "#FFFFFF";
        }

        document.getElementById("o").style.color = "#FFFFFF";
        document.getElementById("x").style.color = "#FFFFFF";
        document.getElementById("t").style.color = "#FFFFFF";
        document.getElementById("T").style.color = "#FFFFFF";
        document.getElementById("X").style.color = "#FFFFFF";
        document.getElementById("O").style.color = "#FFFFFF";
        document.getElementById("p11").style.color = "#FFFFFF";
        document.getElementById("p22").style.color = "#FFFFFF";
        document.getElementById("win").style.color = "#FFFFFF";
        Light = false;
    } else {
        document.getElementsByTagName("body")[0].classList.remove("Dark");
        document.getElementsByClassName("board")[0].style.backgroundColor = "#000000";
        document.getElementsByClassName("title")[0].style.color = "rgb(113, 105, 103)";
        document.getElementsByTagName("g")[0].style.fill = "rgb(104, 88, 88)";
        document.getElementById("modes").src = "Assests/lightbulb.png"
        
        let elem = document.getElementsByClassName("tile");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.backgroundColor = "#FFFFFF";
            elem[i].style.color = "rgb(104, 88, 88)";
        }

        document.getElementById("o").style.color = "#000000";
        document.getElementById("x").style.color = "#000000";
        document.getElementById("t").style.color = "#000000";
        document.getElementById("T").style.color = "#000000";
        document.getElementById("X").style.color = "#000000";
        document.getElementById("O").style.color = "#000000";
        document.getElementById("p11").style.color = "#000000";
        document.getElementById("p22").style.color = "#000000";
        document.getElementById("win").style.color = "rgb(104, 88, 88)";
        Light = true;
    }
}

// AI's move

function next_move() {
    let best_score = -Infinity;
    let bestMove;
    for (let i = 1; i <= 9; i++) {
        if (values[i] == null) {
            values[i] = 'X';
            let score = minimax(values, 0, false);
            values[i] = null;
            if (score > best_score) {
                best_score = score;
                bestMove = i;
            }
        }
    }
    let elem = document.getElementById(`${bestMove}`);
    if (elem && elem.innerHTML !== null) {
        values[bestMove] = 'X';
        elem.innerHTML = 'X';
        elem.animate(pop, {duration: 100, iterations: 1});
    }
}

let token = {X:1, O:-1, tie:0}

function minimax(values, depth, Is_maximizing) {   
    result = is_win()
    if (result != 0) {
        return token[result] // returns value as per the winning probabilty
    }
    if (Is_maximizing) {
        let bestScore = -Infinity;
        for (let i = 1; i <= 9; i++) {
            if (values[i] == null) {
                values[i] = 'X'
                score = minimax(values, depth + 1, false)
                values[i] = null
                bestScore = Math.max(score, bestScore) // possibility of X wins
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i = 1; i <= 9; i++) {
            if (values[i] == null) {
                values[i] = 'O'
                score = minimax(values, depth + 1, true)
                values[i] = null
                bestScore = Math.min(score, bestScore) // possibilty of O wins
            }
        }
        return bestScore
    }
}

// end

function is_win() {
    let ans = 0
    if (((values[1] == values[5] && values[5] == values[9]) || (values[3] == values[5] && values[5] == values[7])) && values[5] != null) {
        return values[5];
    } else {
        for (let i = 1; i <= 7; i += 3) {
            if (values[i] == values[i + 1] && values[i + 1] == values[i + 2] && values[i] != null) {
                return values[i];
            } 
        }
        for (let i = 1; i <= 3; i++) {
            if (values[i] == values[i + 3] && values[i + 3] == values[i + 6] && values[i] != null) {
                return values[i];
            }
        }
    }
    for (let i = 1; i <= 9; i++) {
        if (values[i] == null)
            ans = 1;
    }
    if (ans === 0)
        return 'tie'
    else 
        return 0
}

function check_win() {
    const win = is_win();
    if (win != 0) {
        document.getElementById("game_board").style.opacity = `${.5}`;
        document.getElementById("end").style = `opacity: ${100}%; visibility: visible;`;
        document.getElementById("win").innerHTML = `(${win})` + " " + "Wins";
        document.getElementById("end").animate(do_this, { duration: 400, iterations: 1});
        document.getElementById("restart").onclick = reset;
        if (win == 'X') {
            document.getElementById("x").innerHTML = X;
            X++;
        } else if (win == 'O') {
            document.getElementById("o").innerHTML = O;
            O++;
        } else if (win == 'tie') {
            document.getElementById("win").innerHTML = "!TIE!";
            document.getElementById("t").innerHTML = tie;
            tie++;
        }
        return true;   
    } else 
        return false;
}

function reset() {
    values.fill(null);  
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`${i}`).innerHTML = "";
    }
    document.getElementById("game_board").style.opacity = `${1}`;
    document.getElementById("end").style = `opacity: ${0}%; visibility: hidden;`;
    done = false;
    k = 9;
}

let players = 2;

const temp1 = document.querySelectorAll('.p1');
const temp2 = document.querySelectorAll('.p2');

function mode(e) {
    if (!e.target.classList.contains('p1')) {
        temp1.forEach(p1 => {p1.style.visibility = 'visible';});
        temp2.forEach(p2 => {p2.style.visibility = 'hidden';});
        reset();
        players = 1;
    } else {
        temp1.forEach(p1 => {p1.style.visibility = 'hidden';});
        temp2.forEach(p2 => {p2.style.visibility = 'visible';});
        reset();
        players = 2;
    }
}
document.getElementById("p1").onclick = mode;
document.getElementById("p2").onclick = mode;
document.getElementsByClassName("mode")[0].onclick = changeMode;

const start_game = () => {  
    tiles.forEach(tile => tile.addEventListener('click',box_clicked))
}

start_game();

k = 9;
done = false;

function box_clicked(e) {
    const id = e.target.id;

    if(done) 
        return

    if (values[id] == null) {
        let elem = document.getElementById(id);
        if (k % 2 == 0) {
            elem.innerHTML = 'X';
            values[id] = 'X';
        } else {
            elem.innerHTML = 'O';
            values[id] = 'O';
        }
        elem.animate(pop, {duration: 100, iterations: 1});

        done = check_win()
        if (players === 1) {
            next_move();
            done = check_win()
            k -= 1;
        }
        k -= 1; 
    }
}