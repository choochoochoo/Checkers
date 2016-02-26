describe("Game algorithm for attack", function() {
    var game;

    beforeEach(function() {
        game = new Game(new TableBoard());
    });

    it("Если рядом шашка противника доступная для удара нужно активировать клетку через одну", function() {
        game.play();
        // было на 3e
        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker1.clickHandler();
        // Поставить на 4f
        var cell1 = checker1.getNearCells()[1].cell;
        cell1.clickHandler();

        // было 6f
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 2);
        checker2.clickHandler();
        // поставить на 5e
        var cell2 = checker2.getNearCells()[0].cell;
        cell2.clickHandler();

        // было на 3g
        var checker3 = game.checkBoard.getCheckerByPlayerAndId(1, 11);
        checker3.clickHandler();
        // Поставить на 4h
        var cell3 = checker3.getNearCells()[1].cell;
        cell3.clickHandler();

        checker2.clickHandler();
        var enableCells = game.checkBoard.getEnableCells();
        expect(enableCells.length).toEqual(1);
        expect(enableCells[0].id).toEqual('3g');

    });

    it("Если рядом шашка противника доступная для удара нужно активировать только шашку которая может ударить", function() {
        game.play();
        // было на 3e
        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker1.clickHandler();
        // Поставить на 4f
        var cell1 = checker1.getNearCells()[1].cell;
        cell1.clickHandler();

        // было 6f
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 2);
        checker2.clickHandler();
        // поставить на 5e
        var cell2 = checker2.getNearCells()[0].cell;
        cell2.clickHandler();

        // было на 3g
        var checker3 = game.checkBoard.getCheckerByPlayerAndId(1, 11);
        checker3.clickHandler();
        // Поставить на 4h
        var cell3 = checker3.getNearCells()[1].cell;
        cell3.clickHandler();

       // checker2.clickHandler();
        var enableCheckers = game.getEnableCheckers();
        expect(enableCheckers.length).toEqual(1);
        expect(enableCheckers[0].id).toEqual(2);
        expect(enableCheckers[0].player).toEqual(2);

    });

    it("Убить шашку", function() {
        game.play();
        // было на 3e
        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker1.clickHandler();
        // Поставить на 4f
        var cell1 = checker1.getNearCells()[1].cell;
        cell1.clickHandler();

        // было 6f
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 2);
        checker2.clickHandler();
        // поставить на 5e
        var cell2 = checker2.getNearCells()[0].cell;
        cell2.clickHandler();

        // было на 3g
        var checker3 = game.checkBoard.getCheckerByPlayerAndId(1, 11);
        checker3.clickHandler();
        // Поставить на 4h
        var cell3 = checker3.getNearCells()[1].cell;
        cell3.clickHandler();

        checker2.clickHandler();
        var enableCells = game.checkBoard.getEnableCells();
        enableCells[0].clickHandler();

        // Шашка должна быть убита
        expect(checker1.isKilled()).toBe(true);

        // На поле не должно быть шашки
        expect(cell1.hasChecker()).toBe(false);

        // У шашки не дожно быть поля
        expect(checker1.cell).toEqual(null);

        // Поле должно быть киллиером
        expect(enableCells[0].isKiller()).toBe(false);
    });

    it("Убить шашку назад", function() {
        game.play();
        // было на 3c
        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.clickHandler();
        // Поставить на 4d
        var cell1 = checker1.getNearCells()[1].cell;
        cell1.clickHandler();

        // было 6d
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 1);
        checker2.clickHandler();
        // поставить на 5c
        var cell2 = checker2.getNearCells()[0].cell;
        cell2.clickHandler();

        // было на 3a
        var checker3 = game.checkBoard.getCheckerByPlayerAndId(1, 8);
        checker3.clickHandler();
        // Поставить на 4b
        var cell3 = checker3.getNearCells()[0].cell;
        cell3.clickHandler();

        // было на 5c
        checker2.clickHandler();
        // Поставить на 3a и убить шашку на 4b
        var cell4 = game.checkBoard.getCellById('3a');
        cell4.clickHandler();

        // было на 2d
        var checker5 = game.checkBoard.getCheckerByPlayerAndId(1, 5);
        checker5.clickHandler();
        // Поставить на 3c
        var cell5 = checker5.getNearCells()[0].cell;
        cell5.clickHandler();

        // было на 6b
        var checker6 = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker6.clickHandler();
        // Поставить на 5a
        var cell6 = checker6.getNearCells()[0].cell;
        cell6.clickHandler();

        // было на 3c
        checker5.clickHandler();
        // Поставить на 4b
        var cell7 = checker5.getNearCells()[0].cell;
        cell7.clickHandler();

        // Должны быть две шашки и вторая должна мочь ударить назад
        var enableCheckers = game.getEnableCheckers();
        expect(enableCheckers.length).toEqual(2);
        expect(enableCheckers[0].id).toEqual(0);
        expect(enableCheckers[1].id).toEqual(1);
    });

    it("Убить можно больше двух шашек за ход", function() {
        game.play();

        // было на 3c
        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.clickHandler();
        // Поставить на 4d
        var cell1 = checker1.getNearCells()[1].cell;
        cell1.clickHandler();

        // было 6d
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 1);
        checker2.clickHandler();
        // поставить на 5c
        var cell2 = checker2.getNearCells()[0].cell;
        cell2.clickHandler();

        // было на 3e
        var checker3 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker3.clickHandler();
        // Поставить на 4f
        var cell3 = checker3.getNearCells()[1].cell;
        cell3.clickHandler();

        // было на 5c
        checker2.clickHandler();
        var cell_3e = game.checkBoard.getCellById('3e');
        // Поставить на 3e и убить шашку на 4d
        cell_3e.clickHandler();

        expect(game.getCurrentPlayer()).toEqual(2);
        expect(game.checkBoard.getEnableCells().length).toEqual(1);
        var cell_5g = game.checkBoard.getCellById('5g');
        expect(cell_5g.isEnabled()).toBe(true);
    });

    it("У дамки должна быть возможность хода", function(){
        game.checkBoard = new CheckBoard();
        game.checkBoard.game = game;
        game.currentPlayer = 1;
        game.checkBoard.defaultSetPlayer1();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var cell_8f = game.checkBoard.getCellById('8f');
        cell_8f.setChecker(checker);

        var activeCheckers = game.findPossible();
        game.enablePossibleCheckers(activeCheckers);
        expect(activeCheckers.length).toBe(6);
        expect(checker.isEnabled()).toBe(true);
    });
});