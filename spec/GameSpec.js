describe("Game", function() {
    var game;

    beforeEach(function() {
        game = new Game();
    });

    it("В начале игры ходит игрок - 1", function() {
        game.play();
        expect(game.getCurrentPlayer().getId()).toEqual(1);
    });

    it("В начале игры раунд - 1", function() {
        game.play();
        expect(game.getRound()).toEqual(1);
    });

    it("В начале игры выставили шашки игрока 1", function() {
        game.play();
        var el = game.checkBoard.cells.filter( function(item){ return item.id === '1a'; } )[0];
        expect(el.hasChecker()).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '2b'; } )[0];
        expect(el.hasChecker()).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '3e'; } )[0];
        expect(el.hasChecker()).toBe(true);
    });

    it("В начале игры выставили шашки игрока 2", function() {
        game.play();
        var el = game.checkBoard.cells.filter( function(item){ return item.id === '6b'; } )[0];
        expect(el.hasChecker()).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '7c'; } )[0];
        expect(el.hasChecker()).toBe(true);
        el = game.checkBoard.cells.filter( function(item){ return item.id === '8f'; } )[0];
        expect(el.hasChecker()).toBe(true);
    });

    it("В начале игры все шашки не дамки", function() {
        game.play();
        var checkers = game.checkBoard.checkers.filter( function(item){ return item.isQueen(); } );
        expect(checkers.length).toEqual(0);
    });

    it("Смена игрока", function() {
        game.play();
        expect(game.getCurrentPlayer().getId()).toEqual(1);
        game.changePlayer();
        expect(game.getCurrentPlayer().getId()).toEqual(2);
        game.changePlayer();
        expect(game.getCurrentPlayer().getId()).toEqual(1);
    });

    it("В начале игры имеют ход верхние шашки белого игрока", function() {
        game.play();

        var enabled = game.checkBoard.getEnableCheckers();

        expect(enabled.length).toEqual(4);
        expect(enabled[0].isEnabled()).toBe(true);
        expect(enabled[1].isEnabled()).toBe(true);
        expect(enabled[2].isEnabled()).toBe(true);
        expect(enabled[3].isEnabled()).toBe(true);
    });

    it("Сделать все шашки не активными", function() {
        game.play();

        var enabled = game.checkBoard.getEnableCheckers();

        expect(enabled.length).toEqual(4);
        expect(enabled[0].isEnabled()).toBe(true);
        expect(enabled[1].isEnabled()).toBe(true);
        expect(enabled[2].isEnabled()).toBe(true);
        expect(enabled[3].isEnabled()).toBe(true);

        game.checkBoard.disabledAllCheckers();

        expect(enabled[0].isEnabled()).toBe(false);
        expect(enabled[1].isEnabled()).toBe(false);
        expect(enabled[2].isEnabled()).toBe(false);
        expect(enabled[3].isEnabled()).toBe(false);
    });

    it("Получить ближайшие клетки", function() {
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
    });

    it("Активированная шашка", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.clickHandler();
        expect(checker1.isSelected()).toBe(true);
        expect(checker1).toEqual(game.checkBoard.getSelectedChecker());

        var checker2 = game.checkBoard.getCheckerByPlayerAndId(1, 10);
        checker2.clickHandler();
        expect(checker1.isSelected()).toBe(false);
        expect(checker2.isSelected()).toBe(true);
        expect(checker2).toEqual(game.checkBoard.getSelectedChecker());
    });

    it("Переключить раунд на 2", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.clickHandler();

        // Сначала игрок 1
        expect(game.getCurrentPlayer().getId()).toEqual(1);

        // Перешли на второй раунд
        var cell1 = checker1.getNearCells()[0].cell;
        cell1.clickHandler();

        // После переключения игрок 2
        expect(game.getCurrentPlayer().getId()).toEqual(2);

        // Не должно быть активных ячеек
        var activeCells = game.checkBoard.cells.filter( function(item){ return item.isEnabled(); });
        expect(activeCells.length).toEqual(0);

        // Должны быть активированы 4 шашки 2 игрока
        var enableCheckers = game.checkBoard.checkers.filter( function(item){ return item.isEnabled(); });
        expect(enableCheckers.length).toEqual(4);
        expect(enableCheckers[0].player.getId()).toEqual(2);

        // Не должно быть выбранной шашки
        expect(game.checkBoard.getSelectedChecker()).toEqual(undefined);
    });

    it("Если на клетке присутствует шашка, то поле не должно активироваться", function() {
        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.clickHandler();
        var cell1 = checker1.getNearCells()[1].cell;
        cell1.clickHandler();

        var checker2 = game.checkBoard.getCheckerByPlayerAndId(2, 1);
        checker2.clickHandler();
        var cell2 = checker2.getNearCells()[0].cell;
        cell2.clickHandler();

        checker1.clickHandler();

        var enableCells = game.checkBoard.cells.filter( function(item){ return item.isEnabled(); });

        expect(enableCells.length).toEqual(1);
        expect(enableCells[0].id).toEqual('5e');
    });

    it("Получить все дамки которыми можно сходить", function(){
        var player1 = game.getPlayer1();
        game.setCurrentPlayer(player1);
        player1.defaultSet();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var cell_8f = game.checkBoard.getCellById('8f');
        checker.makeQueen();
        cell_8f.setChecker(checker);

        var queens = game.getCurrentPlayer().getCheckersQueenWithFreeCellsNear();
        expect(queens.length).toEqual(1);
        expect(queens[0].player.getId()).toEqual(1);
        expect(queens[0].id).toEqual(9);
    });

    it("Конец игры когда к у игрока кончились шашки или нет ходов", function(){
        game.play();
        var checker = null;

        for(var i = 0; i < game.checkBoard.checkers.length; i++){
            checker = game.checkBoard.checkers[i];
            if(checker.player.getId() === 1){
                checker.kill();
            }

        }

        expect(game.getPlayer1().hasAliveCheckers()).toBe(true);
    });

    it("В начале игры ходит игрок должно быть 24 картинки шашек", function() {
        game.play();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var cell_4b = game.checkBoard.getCellById('4b');
        cell_4b.setChecker(checker);

        game.play();

        var checkers = $('.cell img');

        expect(checkers.length).toEqual(24);
    });

    it("После начала второй игры у игрока должно быть 12 шашек", function(){
        game.play();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var cell_4b = game.checkBoard.getCellById('4b');
        cell_4b.setChecker(checker);

        game.play();

        expect(game.getPlayer1().getCheckers().length).toEqual(12);
        expect(game.getPlayer2().getCheckers().length).toEqual(12);
    });

    it("После начала второй игры не должно быть клеток с шашками кроме дефолтных", function(){
        game.play();

        var checker = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        var cell_4b = game.checkBoard.getCellById('4b');
        cell_4b.setChecker(checker);

        game.play();

        var cellsWithCheckers = game.checkBoard.cells.filter(function(item){
            return item.hasChecker();
        });

        expect(cellsWithCheckers.length).toEqual(24);
    });

    it("После начала второй игры не должно быть клеток убийц", function(){
        game.setCurrentPlayer(game.getPlayer1());
        var checker = new Checker(game.getPlayer1(), 0, game.checkBoard.getCellById('7e'), game.checkBoard);
        game.checkBoard.checkers.push(checker);
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);
        checker.makeQueen();
        checker.enable();

        var checker2 = new Checker(game.getPlayer2(), 0, game.checkBoard.getCellById('5c'), game.checkBoard);
        game.checkBoard.checkers.push(checker2);
        var cell_5c = game.checkBoard.getCellById('5c');
        cell_5c.setChecker(checker2);

        var checker3 = new Checker(game.getPlayer2(), 1, game.checkBoard.getCellById('8b'), game.checkBoard);
        game.checkBoard.checkers.push(checker3);

        checker.clickHandler();

        var killCells = game.checkBoard.getAllKillCells();
        expect(killCells.length).toEqual(2);

        game.play();

        killCells = game.checkBoard.getAllKillCells();

        expect(killCells.length).toEqual(0);
    });

    it("После начала второй игры не должно быть активных клеток", function(){
        game.setCurrentPlayer(game.getPlayer1());
        var checker = new Checker(game.getPlayer1(), 0, game.checkBoard.getCellById('7e'), game.checkBoard);
        game.checkBoard.checkers.push(checker);
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);
        checker.makeQueen();
        checker.enable();

        var checker2 = new Checker(game.getPlayer2(), 0, game.checkBoard.getCellById('5c'), game.checkBoard);
        game.checkBoard.checkers.push(checker2);
        var cell_5c = game.checkBoard.getCellById('5c');
        cell_5c.setChecker(checker2);

        var checker3 = new Checker(game.getPlayer2(), 1, game.checkBoard.getCellById('8b'), game.checkBoard);
        game.checkBoard.checkers.push(checker3);

        checker.clickHandler();

        game.play();

        var enableCells = game.checkBoard.getEnableCells();

        expect(enableCells.length).toEqual(0);
    });

    it("После начала второй игры не должно быть выбранны шашек", function(){
        game.setCurrentPlayer(game.getPlayer1());
        var checker = new Checker(game.getPlayer1(), 0, game.checkBoard.getCellById('7e'), game.checkBoard);
        game.checkBoard.checkers.push(checker);
        var cell_7e = game.checkBoard.getCellById('7e');
        cell_7e.setChecker(checker);
        checker.makeQueen();
        checker.enable();

        var checker2 = new Checker(game.getPlayer2(), 0, game.checkBoard.getCellById('5c'), game.checkBoard);
        game.checkBoard.checkers.push(checker2);
        var cell_5c = game.checkBoard.getCellById('5c');
        cell_5c.setChecker(checker2);

        var checker3 = new Checker(game.getPlayer2(), 1, game.checkBoard.getCellById('8b'), game.checkBoard);
        game.checkBoard.checkers.push(checker3);

        checker.clickHandler();

        game.play();

        var selectedCheckers = game.checkBoard.checkers.filter(function(item){
            return item.isSelected();
        });

        expect(selectedCheckers.length).toEqual(0);
    });
});