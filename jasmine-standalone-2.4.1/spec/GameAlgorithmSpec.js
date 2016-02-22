describe("Game algorithm for attack", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it("Если рядом шашка противника доступная для удара нужно активировать клетку через одну", function() {
        game.play();
        // было на 3e
        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker1.clickHandler();
        // Поставить на 4f
        var cell1 = checker1.getNearCells()[1];
        cell1.clickHandler();

        // было 6f
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 2);
        checker2.clickHandler();
        // поставить на 5e
        var cell2 = checker2.getNearCells()[0];
        cell2.clickHandler();

        // было на 3g
        var checker3 = game.checkBoard.getCheckerByPlayerAndId(1, 11);
        checker3.clickHandler();
        // Поставить на 4h
        var cell3 = checker3.getNearCells()[1];
        cell3.clickHandler();

        checker2.clickHandler();
        var enableCells = game.checkBoard.getEnableCells();
        expect(enableCells.length).toEqual(1);
        expect(enableCells[0].id).toEqual('3g');

    });

    //it("Если рядом шашка противника и за ней пустая клетка нужно деактивировать все остальные шашки", function() {
    //    game.play();
    //
    //
    //});
    //
    //it("Если рядом шашка противника и за ней пустая клетка нужно активировать клетку для удара через одну, " +
    //    "шашек доступных для удара может две и больше", function() {
    //    game.play();
    //
    //
    //});
    //
    //it("Если рядом шашка противника и за ней пустая клетка нужно деактивировать все остальные шашки," +
    //    "может быть две и больше шашки которыми можно ударить", function() {
    //    game.play();
    //
    //
    //});
});