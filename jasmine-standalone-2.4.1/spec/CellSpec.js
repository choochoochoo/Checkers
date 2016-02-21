describe("Cell", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it("Переместить шашку кликом по клетке ", function() {

        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.clickHandler();
        var cell1 = checker1.getNearCells()[0];
        var cell2 = checker1.getNearCells()[1];

        expect(cell1.isChecker).toBe(false);

        cell1.clickHandler();

        expect(cell1.isChecker).toBe(true);
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
});