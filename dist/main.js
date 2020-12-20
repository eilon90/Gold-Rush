$('#start').on('click', function() {
    const player1 = $('#player-1-input').val();
    const player2 = $('#player-2-input').val();
    let time;
    let rows;
    let cols;
    let coins;
    let walls;

    switch ($(`input[name = 'time']:checked`).val()) {
        case '1min': time = 60;
        break;
        case '30sec': time = 30;
        break;
        case '15sec': time = 15;
        break;
        case 'no-time': time = -1;
        break;
    }

    switch ($(`input[name = 'size']:checked`).val()) {
        case 'small':
            rows = 10;
            cols = 10;
            coins = 6
            walls = 24
        break;
        case 'medium':
            rows = 20;
            cols = 20;
            coins = 12
            walls = 48
        break;
        case 'large':
            rows = 30;
            cols = 30;
            coins = 18
            walls = 72
        break;
        case 'X-large':
            rows = 40;
            cols = 40;
            coins = 24
            walls = 96
        break;
    }
    const board = new GoldRush(rows, cols, player1, player2, time, coins);
    const renderer = new Renderer;

    board.generateCoins(coins);
    board.generateWalls(walls);
    renderer.renderBoard(board.matrix);
    renderer.scoring(board.players);

    $(document).on('keydown', function(e) {

        switch(e.key) {
            case 'w':
                board.movePlayer(1, 'up');
                break;
            case 'a':
                board.movePlayer(1, 'left');
                break;
            case 's':
                board.movePlayer(1, 'down');
                break;
            case 'd':
                board.movePlayer(1, 'right');
                break;
            case'ArrowUp':
                board.movePlayer(2, 'up');
                break;
            case'ArrowLeft':
                board.movePlayer(2, 'left');
                break;
            case'ArrowDown':
                board.movePlayer(2, 'down');
                break;
            case'ArrowRight':
                board.movePlayer(2, 'right');
                break;
            case'i':
                board.movePlayer(2, 'up');
                break;
            case'j':
                board.movePlayer(2, 'left');
                break;
            case'k':
                board.movePlayer(2, 'down');
                break;
            case'l':
                board.movePlayer(2, 'right');
                break;
        }

        renderer.renderBoard(board.matrix);
        renderer.scoring(board.players);
    })

    if (board.time > 0) {
        board.timer();
    }
}) 







