class matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrixBuilder = function(rows, cols) {
            const matrix = [];
            for(let r = 0; r < rows; r++) {
                const row = [];
                for(let c = 0; c < cols; c++) {
                    row.push('.');
                }
                matrix.push(row);
            }
            return matrix
        };
        this.matrix = this.matrixBuilder(this.rows, this.cols);
    }

    print() {
        for (let row of this.matrix) {
            let line = '';
            for (let col of row) {
                line += (col + '\t');
            } 
            console.log(line);
        }
    }

    get(rowNum, colNum) {
        return this.matrix[rowNum][colNum];
    }

    alter(row, col, val) {
        this.matrix[row][col] = val;
    }
}