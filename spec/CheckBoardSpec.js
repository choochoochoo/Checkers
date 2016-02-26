describe("Check board", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it("Получить шашку по игроку и id", function() {
        var checker1 = new Checker(1, 12);
        var checker2 = new Checker(2, 10);
        game.checkBoard.checkers.push(checker1);
        game.checkBoard.checkers.push(checker2);
        expect(game.checkBoard.getCheckerByPlayerAndId(1, 8)).not.toEqual(checker1);
        expect(game.checkBoard.getCheckerByPlayerAndId(1, 12)).toEqual(checker1);
        expect(game.checkBoard.getCheckerByPlayerAndId(2, 10)).toEqual(checker2);
    });

    it("Получить клетку по id", function() {
        game.play();
        var cell = game.checkBoard.getCellById('3a');
        expect(cell.id).toBe('3a');
    })
});