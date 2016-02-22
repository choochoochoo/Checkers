describe("CheckCell", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it("После перемещения в предыдущей клетке не должно быть шашки", function() {

        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var prevCell = checker1.cell;

        checker1.clickHandler();
        var cell1 = checker1.getNearCells()[0];

        cell1.clickHandler();

        // старая клетка
        expect(prevCell.isChecker).toBe(false);
        expect(prevCell.checker).toBe(null);

        // новая
        expect(cell1.isChecker).toBe(true);
        expect(cell1.checker.cell.id).toBe('4b');
    });

    it("Получить клетку по диагонали вверх и влево", function() {
        game.play();
        var cell = game.checkBoard.getCellById('3c');
        var id = cell.getCellIdByDiagonalTopLeft();
        expect(id).toEqual('4b');
    });

    it("Получить клетку по диагонали вверх и влево", function() {
        game.play();
        var cell = game.checkBoard.getCellById('3c');
        var id = cell.getCellIdByDiagonalTopRight();
        expect(id).toEqual('4d');
    });

    it("Получить клетку по диагонали вниз и влево", function() {
        game.play();
        var cell = game.checkBoard.getCellById('6d');
        var id = cell.getCellIdByDiagonalBottomLeft();
        expect(id).toEqual('5c');
    });

    it("Получить клетку по диагонали вниз и вправо", function() {
        game.play();
        var cell = game.checkBoard.getCellById('6d');
        var id = cell.getCellIdByDiagonalBottomRight();
        expect(id).toEqual('5e');
    });
});