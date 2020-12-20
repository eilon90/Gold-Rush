class GoldRush extends matrix {
    constructor(rows, cols, player1, player2, time, coins) {
        super(rows, cols);
        this.boardBuilder = function(rows, cols) {
            const matrix = this.matrixBuilder(rows, cols);
            matrix[0][0] = 1;
            matrix[rows - 1][cols - 1] = 2;
            return matrix;
        }
        this.matrix = this.boardBuilder(rows, cols);
        this.players = {
            1: {
                name: player1,
                x: 0,
                y: 0,
                score: 0,
                number: 1
            },
            2: {
                name: player2,
                x: this.rows - 1,
                y: this.cols - 1,
                score: 0,
                number: 2
            }
        }
        this.time = time;
        this.coins = coins
    }

    generateCoins(num) {
        let count = 0;
        while (count < num) {
            const coinNum = Math.floor(Math.random() * (this.rows * this.cols));
            const coinLoc = {
                x: coinNum % this.cols,
                y: Math.floor(coinNum / this.rows)
            }
            if(this.get(coinLoc.x, coinLoc.y) === '.') {
                this.alter(coinLoc.x, coinLoc.y, 'c');
                count++;
            }
        }
    }

    generateWalls(num) {
        let count = 0;
        while (count < num) {
            const wallNum = Math.floor(Math.random() * (this.rows * this.cols));
            const wallLoc = {
                x: wallNum % this.cols,
                y: Math.floor(wallNum / this.rows)
            }
            if(this.get(wallLoc.x, wallLoc.y) === '.') {
                this.alter(wallLoc.x, wallLoc.y, 'w');
                count++;
            }
        }
    }

    movePlayer(player, dir) {
        const loc = {x: this.players[player].x, y: this.players[player].y}
        const newLoc = this.players[player];
        const optionalMove = (x, y) =>this.matrix[y] && (this.get(y, x) === '.' || this.get(y, x) === 'c');
        
        switch(dir) {
            case 'right':
                if (optionalMove(loc.x + 1, loc.y)) {newLoc.x++;}
            break;
            case 'left': 
                if (optionalMove(loc.x - 1, loc.y)) {newLoc.x--;}
            break;
            case 'down':
                if (optionalMove(loc.x, loc.y + 1)) {newLoc.y++;}
            break;
            case 'up':
                if (optionalMove(loc.x, loc.y - 1)) {newLoc.y--;}
            break;
        }
        
        this.alter(loc.y, loc.x, '.');
        if (this.get(newLoc.y, newLoc.x) === 'c') {
            this.addScore(player);
            this.coins--;
            if (this.coins === 0) {this.end()}
        }
        this.alter(newLoc.y, newLoc.x, player);

    }

    addScore(player) {
        this.players[player].score += 10;
    }

    end() {
        if (this.players[1].score === this.players[2].score) {
            alert ("It's a Draw!");
        return;
    }
        let winner = (this.players[1].score > this.players[2].score ? this.players[1].name || 'player 1' : this.players[1].name || 'player 2');
        alert (`${winner} wins!`);
    }

    timer() {
        let timeText = `00:${this.time}`
        if (this.time < 10) {timeText = `00:0${this.time}`}
        $('#timer').text(timeText);
        if (this.time > 0) {
            setTimeout(t => {
                this.time--;
                this.timer();
            }, 1000);
        }
        if (this.time === 0) {
            this.end();
        }
    }
}