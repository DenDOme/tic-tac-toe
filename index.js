const Gameboard = (() => {
    let board = []

    const winCombos = [
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ]
    
    const createPlayer = (player, sign, turn) => {
        return { player, sign, turn };
    }



    const player1 = createPlayer('kerim1', 'X', true);
    const player2 = createPlayer('kerim2', 'O', false);

    let winner = null;

    let turns = 0;

    const playerMove = (function () {
        const box = document.querySelectorAll('.box');
        box.forEach(e => {
            e.addEventListener('click', e => {
                if (player1.turn == true && Gameboard.winner == null && e.target.innerText == '') {
                    board[e.target.id] = player1.sign;
                    e.target.innerText = player1.sign;
                    player1.turn = false;
                    player2.turn = true;
                }
                else if (player2.turn == true && Gameboard.winner == null && e.target.innerText == '') {
                    board[e.target.id] = player2.sign;
                    e.target.innerText = player2.sign;
                    player1.turn = true;
                    player2.turn = false;
                }
                else {
                    return
                }

                winCheck();
            });
        });
        return { box }
    })

    const winCheck = () => {
        turns++;

        let xP = board.reduce((a,e,i) => (e === player1.sign) ? a.concat(i) : a , [])
        let oP = board.reduce((a,e,i) => (e === player2.sign) ? a.concat(i) : a , [])

        for(let [index , combo] of winCombos.entries()){
            if(combo.every(el => xP.indexOf(el) > -1)){
                Gameboard.winner = 'p1';
            }
            else if(combo.every(el => oP.indexOf(el) > -1)){
                Gameboard.winner = 'p2';
            }
            else if(Gameboard.winner == null && Gameboard.winner == undefined && turns == 9){
                Gameboard.winner = 'tie';
            }
        }
        Gameplay.winDisplay()
        
    }
    const gameReset = () => {
        Gameboard.winner = null;
        player1.turn = true;
        player2.turn = false;
        turns = 0;
        board.splice(0,board.length);
    }
    playerMove()
    return { winCheck, gameReset , playerMove , board , winner}
})();

const Gameplay = (() => {
    const winnerDisp = document.getElementById('winner-disp')
    const box = document.querySelectorAll('.box');
    const resetBtn = document.getElementById('reset-btn');
    const winDisplay = () => {
        if(Gameboard.winner === 'p1'){
            winnerDisp.innerHTML = 'X won'
        }
        else if(Gameboard.winner === 'p2'){
            winnerDisp.innerHTML = 'O won'
        }
        else if(Gameboard.winner === 'tie'){
            winnerDisp.innerHTML = 'Tie'
        }
        else {
            return
        }
    };
    
    const gameReplay = () => {
        Gameboard.gameReset();
        box.forEach(e => {
            e.innerHTML = ''
        })
        winnerDisp.innerHTML = ''
    }
    resetBtn.addEventListener('click' , gameReplay)
    return { winDisplay }
})();


