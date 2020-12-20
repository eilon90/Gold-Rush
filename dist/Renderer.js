class Renderer {
    
    renderBoard(matrix) {
        $('#board').empty();

        $('#board').css('grid-template-rows', `repeat(${matrix.length}, 1fr)`);
        const source = $('#board-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({board: matrix});
        $('#board').append(newHTML);
        $('.row').css('grid-template-columns', `repeat(${matrix[0].length}, 1fr)`);
    }

    scoring(players) {
        $('#player1-score').text(`${players[1].name || 'player 1'}: ${players[1].score}`);
        $('#player2-score').text(`${players[2].name || 'player 2'}: ${players[2].score}`);
    }
}