describe("Cell", function() {
    var game;

    beforeEach(function() {
        game = new Game();
    });

    it("После перемещения в предыдущей клетке не должно быть шашки", function() {

        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var prevCell = checker1.cell;

        checker1.clickHandler();
        var cell1 = checker1.getNearCells()[0].cell;

        cell1.clickHandler();

        // старая клетка
        expect(prevCell.hasChecker()).toBe(false);
        expect(prevCell._checker).toBe(null);

        // новая
        expect(cell1.hasChecker()).toBe(true);
        expect(cell1._checker.cell.id).toBe('4b');
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

    it("Получить всю диагональ вверх и влево", function(){
        game.play();
        var cell = game.checkBoard.getCellById('3e');

        var cellIds = cell.getAllCellIdsByDiagonalTopLeft();
        expect(cellIds.length).toEqual(4);
        expect(cellIds[0]).toEqual('4d');
        expect(cellIds[1]).toEqual('5c');
        expect(cellIds[2]).toEqual('6b');
        expect(cellIds[3]).toEqual('7a');
    });

    it("Получить всю диагональ вверх и вправо", function(){
        game.play();
        var cell = game.checkBoard.getCellById('3e');

        var cellIds = cell.getAllCellIdsByDiagonalTopRight();
        expect(cellIds.length).toEqual(3);
        expect(cellIds[0]).toEqual('4f');
        expect(cellIds[1]).toEqual('5g');
        expect(cellIds[2]).toEqual('6h');
    });

    it("Получить всю диагональ вниз и влево", function(){
        game.play();
        var cell = game.checkBoard.getCellById('3e');

        var cellIds = cell.getAllCellIdsByDiagonalBottomLeft();
        expect(cellIds.length).toEqual(2);
        expect(cellIds[0]).toEqual('2d');
        expect(cellIds[1]).toEqual('1c');
    });

    it("Получить всю диагональ вниз и вправо", function(){
        game.play();
        var cell = game.checkBoard.getCellById('3e');

        var cellIds = cell.getAllCellIdsByDiagonalBottomRight();
        expect(cellIds.length).toEqual(2);
        expect(cellIds[0]).toEqual('2f');
        expect(cellIds[1]).toEqual('1g');
    });

    it("После удара нужно стереть во всех полях свойство для убийства", function(){

        var player1 = game.getPlayer1();
        var player2 = game.getPlayer2();

        game.setCurrentPlayer(player1);
        var checker = new Checker(player1, 0, game.checkBoard.getCellById('7e'), game.checkBoard);
        game.checkBoard.checkers.push(checker);
        player1.addChecker(checker);
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);
        checker.makeQueen();
        checker.enable();

        var checker2 = new Checker(player2, 0, game.checkBoard.getCellById('5c'), game.checkBoard);
        game.checkBoard.checkers.push(checker2);
        var cell_5c = game.checkBoard.getCellById('5c');
        cell_5c.setChecker(checker2);
        player2.addChecker(checker2);

        var checker3 = new Checker(player2, 1, game.checkBoard.getCellById('8b'), game.checkBoard);
        game.checkBoard.checkers.push(checker3);
        player2.addChecker(checker3);

        checker.clickHandler();

        var killCells = game.checkBoard.getAllKillCells();
        expect(killCells.length).toEqual(2);

        var cell_3a = game.checkBoard.getCellById('3a');

        cell_3a.clickHandler();

        killCells = game.checkBoard.getAllKillCells();

        expect(killCells.length).toEqual(0);
    });
});