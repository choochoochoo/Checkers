describe("Game", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it("В начале игры ходит игрок - 1", function() {
        game.play();
        expect(game.getCurrentPlayer()).toEqual(1);
    });

    it("В начале игры раунд - 1", function() {
        game.play();
        expect(game.getRound()).toEqual(1);
    });

    it("В начале игры выставили шашки игрока 1", function() {
        game.play();
        var el = game.checkBoard.cells.filter( function(item){ return item.id === '1a'; } )[0];
        expect(el.isChecker).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '2b'; } )[0];
        expect(el.isChecker).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '3e'; } )[0];
        expect(el.isChecker).toBe(true);
    });

    it("В начале игры выставили шашки игрока 2", function() {
        game.play();
        var el = game.checkBoard.cells.filter( function(item){ return item.id === '6b'; } )[0];
        expect(el.isChecker).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '7c'; } )[0];
        expect(el.isChecker).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '8f'; } )[0];
        expect(el.isChecker).toBe(true);
    });

    it("Смена игрока", function() {
        game.play();
        expect(game.getCurrentPlayer()).toEqual(1);
        game.changePlayer();
        expect(game.getCurrentPlayer()).toEqual(2);
        game.changePlayer();
        expect(game.getCurrentPlayer()).toEqual(1);
    });


    it("В начале игры имеют ход верхние шашки белого игрока", function() {
        game.play();

        var enabled = game.findEnabled();

        expect(enabled.length).toEqual(4);
        expect(enabled[0].isEnabled).toBe(true);
        expect(enabled[1].isEnabled).toBe(true);
        expect(enabled[2].isEnabled).toBe(true);
        expect(enabled[3].isEnabled).toBe(true);
    });

    it("Сделать все шашки не активными", function() {
        game.play();

        var enabled = game.findEnabled();

        expect(enabled.length).toEqual(4);
        expect(enabled[0].isEnabled).toBe(true);
        expect(enabled[1].isEnabled).toBe(true);
        expect(enabled[2].isEnabled).toBe(true);
        expect(enabled[3].isEnabled).toBe(true);

        game.disabledCheckers();

        expect(enabled[0].isEnabled).toBe(false);
        expect(enabled[1].isEnabled).toBe(false);
        expect(enabled[2].isEnabled).toBe(false);
        expect(enabled[3].isEnabled).toBe(false);
    });

    it("Получить ближайшие клетки", function() {
        game.play();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 1);
        var nearCells = checker.getNearCells();

        expect(nearCells[0].id).toEqual('2b');
        expect(nearCells[1].id).toEqual('2d');

        checker = game.checkBoard.getCheckerByPlayerAndId(1, 5);
        nearCells = checker.getNearCells();
        expect(nearCells[0].id).toEqual('3c');
        expect(nearCells[1].id).toEqual('3e');

        checker = game.checkBoard.getCheckerByPlayerAndId(1, 0);
        nearCells = checker.getNearCells();
        expect(nearCells[0].id).toEqual('2b');
        expect(nearCells.length).toEqual(1);
    });

    it("Активированная шашка", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.realObj.click();
        expect(checker1.isSelected).toBe(true);
        expect(checker1).toEqual(game.checkBoard.selectedChecker);

        var checker2 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker2.realObj.click();
        expect(checker1.isSelected).toBe(false);
        expect(checker2.isSelected).toBe(true);
        expect(checker2).toEqual(game.checkBoard.selectedChecker);
    });


    it("Переключить раунд на 2", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.realObj.click();
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker2.realObj.click();
        expect(game.getCurrentPlayer()).toEqual(1);

        var enabled = game.findEnabled();
        var checker = game.checkBoard.selectedChecker;

        game.nextRound();

        expect(game.getCurrentPlayer()).toEqual(2);
        expect(enabled[0].isEnabled).toBe(false);
        expect(enabled[1].isEnabled).toBe(false);
        expect(enabled[2].isEnabled).toBe(false);
        expect(enabled[3].isEnabled).toBe(false);

        var enabled2 = game.findEnabled();
        expect(enabled2.length).toEqual(4);
        expect(enabled2[0].isEnabled).toBe(true)
        expect(enabled2[0].id).toEqual(0);
        expect(enabled2[0].player).toEqual(2);

        expect(checker.isEnabled).toEqual(false);
        expect(checker.isSelected).toEqual(false);
        expect(game.checkBoard.selectedChecker).toEqual(null);

        var activeCells = game.checkBoard.cells.filter( function(item){ return item.isEnable === true; });
        expect(activeCells.length).toEqual(0);
    });
});