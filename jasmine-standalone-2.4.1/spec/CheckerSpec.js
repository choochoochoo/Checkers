describe("Checker spec", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it('Активировать шашку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-enabled.png');
    });

    it('Активировать шашку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-enabled.png');
    });

    it('Активировать дамку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen-enabled.png');
    });

    it('Активировать дамку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen-enabled.png');
    });

    it('Деактивировать шашку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        checker.disabled();
        expect(checker.isEnabled).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker.png');
    });

    it('Деактивировать шашку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        checker.disabled();
        expect(checker.isEnabled).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker.png');
    });

    it('Деактивировать дамку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        checker.disabled();
        expect(checker.isEnabled).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen.png');
    });

    it('Деактивировать дамку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.enabled();
        expect(checker.isEnabled).toBe(true);
        checker.disabled();
        expect(checker.isEnabled).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen.png');
    });

    it('Выбрать шашку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.select();
        expect(checker.isSelected).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-selected.png');
    });

    it('Выбрать шашку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.select();
        expect(checker.isSelected).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-selected.png');
    });

    it('Выбрать дамку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen-selected.png');
    });

    it('Выбрать дамку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen-selected.png');
    });

    it('Снять выбор с шашки для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.select();
        expect(checker.isSelected).toBe(true);
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-enabled.png');
    });

    it('Снять выбор с шашки для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.select();
        expect(checker.isSelected).toBe(true);
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-enabled.png');
    });

    it('Снять выбор с дамки для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected).toBe(true);
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen-enabled.png');
    });

    it('Снять выбор с дамки для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected).toBe(true);
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen-enabled.png');
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

    it("Сделать шашку дамкой игрока 1", function() {
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var cell_8b = game.checkBoard.getCellById('8b');

        expect(checker.isQueen()).toBe(false);
        cell_8b.setChecker(checker);
        expect(checker.isQueen()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen.png');

        var checker2 = game.checkBoard.getCheckerByPlayerAndId(1, 8);
        var cell_8d = game.checkBoard.getCellById('8d');

        expect(checker2.isQueen()).toBe(false);
        cell_8d.setChecker(checker2);
        expect(checker2.isQueen()).toBe(true);
        expect(checker2.realObj.attr('src')).toEqual('img/white-checker-queen.png');
    });

    it("Сделать шашку дамкой игрока 2", function() {
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;

        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        var cell_1a = game.checkBoard.getCellById('1a');

        expect(checker.isQueen()).toBe(false);
        cell_1a.setChecker(checker);
        expect(checker.isQueen()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen.png');

        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 1);
        var cell_1c = game.checkBoard.getCellById('1c');

        expect(checker2.isQueen()).toBe(false);
        cell_1c.setChecker(checker2);
        expect(checker2.isQueen()).toBe(true);
        expect(checker2.realObj.attr('src')).toEqual('img/black-checker-queen.png');
    });
});