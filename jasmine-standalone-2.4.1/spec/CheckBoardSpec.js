describe("Check board", function() {
    var checkBoard;

    beforeEach(function() {
        checkBoard = new CheckBoard();
    });

    it("Получить шашку по игроку и id", function() {
        var checker1 = new Checker(1, 12);
        var checker2 = new Checker(2, 10);
        checkBoard.checkers.push(checker1);
        checkBoard.checkers.push(checker2);
        expect(checkBoard.getCheckerByPlayerAndId(1, 8)).not.toEqual(checker1);
        expect(checkBoard.getCheckerByPlayerAndId(1, 12)).toEqual(checker1);
        expect(checkBoard.getCheckerByPlayerAndId(2, 10)).toEqual(checker2);
    });
});