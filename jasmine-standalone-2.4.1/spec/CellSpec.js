describe("Cell", function() {
    var game;

    beforeEach(function() {
        game = new Game(new CheckBoard(), new TableBoard());
    });

    it("Переместить шашку кликом по клетке", function() {

        game.play();

        var checker1 = game.checkBoard.getCheckerByPlayerAndId(1, 9);
        checker1.realObj.click();
        var cell1 = checker1.getNearCells()[0];
        var cell2 = checker1.getNearCells()[1];

        expect(cell1.isChecker).toBe(false);

        cell1.getRealObj().click();

        expect(cell1.isChecker).toBe(true);
    });
});