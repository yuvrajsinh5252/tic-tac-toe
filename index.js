let tiles = Array.from(document.getElementsByClassName('tile'))  
let values = Array(9).fill(null)

const do_this = [
    {opacity: 0,scale: 0},
    {opacity: 1,scale: 1}
]

let X = 1,O = 1,tie = 1;

function is_win() {
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
}

function reset() {
    values.fill(null);
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`${i}`).innerHTML = "";
    }
    document.getElementById("game_board").style = `opacity: ${1}`;
    document.getElementById("end").style = `opacity: ${0}%; visibility: hidden;`;
    done = false;
    k = 9;
}

const start_game = () => {  
    tiles.forEach(tile => tile.addEventListener('click',box_clicked))
}

start_game()

k = 9;
done = false;

function box_clicked(e) {
    const id = e.target.id;
    
    if(done) 
        return

    if (values[id] == null) {
        if (k % 2 == 0) {
            document.getElementById(id).innerHTML = 'X';
            values[id] = 'X';
        } else {
            document.getElementById(id).innerHTML = 'O';
            values[id] = 'O';
        }

        const win = is_win();
        if (win == 'X' || win == 'O') {
            document.getElementById("game_board").style = `opacity: ${.5}`;
            document.getElementById("end").style = `opacity: ${100}%; visibility: visible;`;
            document.getElementById("win").innerHTML = `(${win})` + " " + "Wins";
            document.getElementById("end").animate(do_this, { duration: 200, iterations: 1});
            document.getElementById("restart").onclick = reset;
            if (win == 'X') {
                document.getElementById("x").innerHTML = X;
                X++;
            }
            else {
                document.getElementById("o").innerHTML = O;
                O++;
            }
            done = true;
            return;   
        }   
        k -= 1;
    } 
    if (k == 0) {
        document.getElementById("game_board").style = `opacity: ${.5}`;
        document.getElementById("end").style = `opacity: ${100}%; visibility: visible;`;
        document.getElementById("win").innerHTML = "!TIE!";
        document.getElementById("end").animate(do_this, { duration: 200, iterations: 1});
        document.getElementById("restart").onclick = reset;
        document.getElementById("t").innerHTML = tie;
        tie++;
        done = true;
        return;   
    }
    console.log(k);
}