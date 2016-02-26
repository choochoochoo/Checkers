describe("Checker spec", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it('Активировать шашку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-enabled.png');
    });

    it('Активировать шашку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-enabled.png');
    });

    it('Активировать дамку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen-enabled.png');
    });

    it('Активировать дамку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen-enabled.png');
    });

    it('Деактивировать шашку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        checker.disable();
        expect(checker.isEnabled()).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker.png');
    });

    it('Деактивировать шашку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        checker.disable();
        expect(checker.isEnabled()).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker.png');
    });

    it('Деактивировать дамку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        checker.disable();
        expect(checker.isEnabled()).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen.png');
    });

    it('Деактивировать дамку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.enable();
        expect(checker.isEnabled()).toBe(true);
        checker.disable();
        expect(checker.isEnabled()).toBe(false);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen.png');
    });

    it('Выбрать шашку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.select();
        expect(checker.isSelected()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-selected.png');
    });

    it('Выбрать шашку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.select();
        expect(checker.isSelected()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-selected.png');
    });

    it('Выбрать дамку для игрока 1', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen-selected.png');
    });

    it('Выбрать дамку для игрока 2', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected()).toBe(true);
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen-selected.png');
    });

    it('Снять выбор с шашки для игрока 1 при активной шашки', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.enable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-enabled.png');
    });

    it('Снять выбор с шашки для игрока 1 при неактивной шашки', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.disable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/white-checker.png');
    });

    it('Снять выбор с шашки для игрока 2 при активной шашки', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.enable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-enabled.png');
    });

    it('Снять выбор с шашки для игрока 2 при неактивной шашки', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 2;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.disable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/black-checker.png');
    });

    it('Снять выбор с дамки для игрока 1 при активной дамки', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.enable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen-enabled.png');
    });

    it('Снять выбор с дамки для игрока 1 при неактивной дамки', function(){
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.disable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/white-checker-queen.png');
    });

    it('Снять выбор с дамки для игрока 2 при активной дамки', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.enable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen-enabled.png');
    });

    it('Снять выбор с дамки для игрока 2 при не активной дамки', function(){
        game.checkBoard.defaultSetPlayer2();
        game.currentPlayer = 1;
        var checker = game.checkBoard.getCheckerByPlayerAndId(2, 0);
        checker.makeQueen();
        checker.select();
        expect(checker.isSelected()).toBe(true);
        checker.disable();
        checker.deselect();
        expect(checker.realObj.attr('src')).toEqual('img/black-checker-queen.png');
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
        expect(cell1.isEnabled()).toBe(true);
        expect(cell2.isEnabled()).toBe(true);

        var checker2 = game.checkBoard.getCheckerByPlayerAndId(1, 11);
        checker2.realObj.click();

        expect(cell1.isEnabled()).toBe(false);
        expect(cell2.isEnabled()).toBe(false);

        var cell21 = checker2.getNearCells()[0].cell;
        var cell22 = checker2.getNearCells()[1].cell;
        expect(cell21.isEnabled()).toBe(true);
        expect(cell22.isEnabled()).toBe(true);
    });

    it("Переместить шашку", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.realObj.click();
        var cell1 = checker1.getNearCells()[0].cell;
        var cell2 = checker1.getNearCells()[1].cell;

        expect(cell1.hasChecker()).toBe(false);

        cell1.setChecker(checker1);

        expect(cell1.hasChecker()).toBe(true);
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

    it("Получить все ближайшие клетки для дамки", function() {
        game.checkBoard.defaultSetPlayer1();
        game.currentPlayer = 1;

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);

        var nearCells = checker.getNearCellsForQueen();

        expect(nearCells.length).toEqual(8);
        expect(nearCells[0].cell.id).toEqual('8d');
        expect(nearCells[0].pos).toEqual('TopLeft');

        expect(nearCells[1].cell.id).toEqual('8f');
        expect(nearCells[1].pos).toEqual('TopRight');

        expect(nearCells[2].cell.id).toEqual('6d');
        expect(nearCells[2].pos).toEqual('BottomLeft');

        expect(nearCells[3].cell.id).toEqual('5c');
        expect(nearCells[3].pos).toEqual('BottomLeft');

        expect(nearCells[4].cell.id).toEqual('4b');
        expect(nearCells[4].pos).toEqual('BottomLeft');

        expect(nearCells[5].cell.id).toEqual('6f');
        expect(nearCells[5].pos).toEqual('BottomRight');

        expect(nearCells[6].cell.id).toEqual('5g');
        expect(nearCells[6].pos).toEqual('BottomRight');

        expect(nearCells[7].cell.id).toEqual('4h');
        expect(nearCells[7].pos).toEqual('BottomRight');
    });

    it("Получить все свободные клетки для дамки", function() {
        game.currentPlayer = 1;
        game.checkBoard.defaultSetPlayer1();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);

        var nearCells = checker.getFreeCellNearForQueen();

        expect(nearCells.length).toEqual(8);
        expect(nearCells[0].cell.id).toEqual('8d');
        expect(nearCells[0].pos).toEqual('TopLeft');

        expect(nearCells[1].cell.id).toEqual('8f');
        expect(nearCells[1].pos).toEqual('TopRight');

        expect(nearCells[2].cell.id).toEqual('6d');
        expect(nearCells[2].pos).toEqual('BottomLeft');

        expect(nearCells[3].cell.id).toEqual('5c');
        expect(nearCells[3].pos).toEqual('BottomLeft');

        expect(nearCells[4].cell.id).toEqual('4b');
        expect(nearCells[4].pos).toEqual('BottomLeft');

        expect(nearCells[5].cell.id).toEqual('6f');
        expect(nearCells[5].pos).toEqual('BottomRight');

        expect(nearCells[6].cell.id).toEqual('5g');
        expect(nearCells[6].pos).toEqual('BottomRight');

        expect(nearCells[7].cell.id).toEqual('4h');
        expect(nearCells[7].pos).toEqual('BottomRight');
    });

    it("При нажатии на дамку должны активироваться поля", function() {
        game.currentPlayer = 1;
        game.checkBoard.defaultSetPlayer1();

        var enableCells = game.checkBoard.getEnableCells();
        expect(enableCells.length).toEqual(0);

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker.makeQueen();
        checker.enable();
        var cell_7e = game.checkBoard.getCellById('7e');

        cell_7e.setChecker(checker);
        checker.clickHandler();
        enableCells = game.checkBoard.getEnableCells();
        expect(enableCells.length).toEqual(8);

        expect(enableCells.filter(function (item){ return item.id === '8d'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '8f'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '6d'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '5c'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '4b'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '6f'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '5g'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '4h'; }).length).toEqual(1);
    });

    it("Дамка не может прыгать через свою", function() {
        game.currentPlayer = 1;
        game.checkBoard.defaultSetPlayer1();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var checker2 = game.checkBoard.getCheckerByPlayerAndId(1, 10);

        var cell_5c = game.checkBoard.getCellById('5c');
        cell_5c.setChecker(checker2);

        checker.makeQueen();
        checker.enable();
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);
        checker.clickHandler();

        var enableCells = game.checkBoard.getEnableCells();
        expect(enableCells.length).toEqual(6);

        expect(enableCells.filter(function (item){ return item.id === '8d'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '8f'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '6d'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '6f'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '5g'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '4h'; }).length).toEqual(1);
    });

    it("Дамка обязана бить ", function() {
        game.currentPlayer = 1;
        var checker = new Checker(1, 0, game.checkBoard.getCellById('7e'), game.checkBoard);
        game.checkBoard.checkers.push(checker);
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);
        checker.makeQueen();
        checker.enable();

        var checker2 = new Checker(2, 0, game.checkBoard.getCellById('5c'), game.checkBoard);
        game.checkBoard.checkers.push(checker2);
        var cell_5c = game.checkBoard.getCellById('5c');
        cell_5c.setChecker(checker2);

        var checker3 = new Checker(1, 1, game.checkBoard.getCellById('3g'), game.checkBoard);
        game.checkBoard.checkers.push(checker3);
        var cell_3g = game.checkBoard.getCellById('3g');
        cell_3g.setChecker(checker3);

        var enableCheckers = game.findPossible();

        expect(enableCheckers.length).toEqual(1);
        expect(enableCheckers[0].id).toEqual(0);
    });

    it("Дамка обязана бить и может прыгнуть на любое после после удара", function() {
        game.currentPlayer = 1;
        var checker = new Checker(1, 0, game.checkBoard.getCellById('7e'), game.checkBoard);
        game.checkBoard.checkers.push(checker);
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);
        checker.makeQueen();
        checker.enable();

        var checker2 = new Checker(2, 0, game.checkBoard.getCellById('5c'), game.checkBoard);
        game.checkBoard.checkers.push(checker2);
        var cell_5c = game.checkBoard.getCellById('5c');
        cell_5c.setChecker(checker2);

        checker.clickHandler();

        var enableCells = game.checkBoard.getEnableCells();
        expect(enableCells.length).toEqual(2);
        expect(enableCells.filter(function (item){ return item.id === '4b'; }).length).toEqual(1);
        expect(enableCells.filter(function (item){ return item.id === '3a'; }).length).toEqual(1);
    });
});