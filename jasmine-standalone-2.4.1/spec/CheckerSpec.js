describe("Checker spec", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it("Получить ближайшие id клеток", function() {
        game.play();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 1);
        var nearCells = checker.getNearCells();

        expect(nearCells[0].cell.id).toEqual('2b');
        expect(nearCells[1].cell.id).toEqual('2d');

        checker = game.checkBoard.getCheckerByPlayerAndId(1, 5);
        nearCells = checker.getNearCells();
        expect(nearCells[0].cell.id).toEqual('3c');
        expect(nearCells[1].cell.id).toEqual('3e');

        checker = game.checkBoard.getCheckerByPlayerAndId(1, 0);
        nearCells = checker.getNearCells();
        expect(nearCells[0].cell.id).toEqual('2b');
        expect(nearCells.length).toEqual(1);

        game.checkBoard.selectedChecker = checker;

        game.nextRound();

        checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        nearCells = checker.getNearCells();

        expect(nearCells[0].cell.id).toEqual('5a');
        expect(nearCells[1].cell.id).toEqual('5c');

        checker = game.checkBoard.getCheckerByPlayerAndId(2, 1);
        nearCells = checker.getNearCells();

        expect(nearCells[0].cell.id).toEqual('5c');
        expect(nearCells[1].cell.id).toEqual('5e');
    });

    it("Активировать клетки для хода", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.realObj.click();
        var cell1 = checker1.getNearCells()[0].cell;
        var cell2 = checker1.getNearCells()[1].cell;
        expect(cell1.isEnable).toBe(true);
        expect(cell2.isEnable).toBe(true);

        var checker2 = game.checkBoard.getCheckerByPlayerAndId(1, 11);
        checker2.realObj.click();

        expect(cell1.isEnable).toBe(false);
        expect(cell2.isEnable).toBe(false);

        var cell21 = checker2.getNearCells()[0].cell;
        var cell22 = checker2.getNearCells()[1].cell;
        expect(cell21.isEnable).toBe(true);
        expect(cell22.isEnable).toBe(true);
    });

    it("Переместить шашку", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.realObj.click();
        var cell1 = checker1.getNearCells()[0].cell;
        var cell2 = checker1.getNearCells()[1].cell;

        expect(cell1.isChecker).toBe(false);

        cell1.setChecker(checker1);

        expect(cell1.isChecker).toBe(true);
    });
});