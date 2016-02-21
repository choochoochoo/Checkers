// Класс ИГРА
var Game = function(checkBoard, tableBoard){
    // Номер раунда
    this.round = 0;

    // Текущий игрок
    this.currentPlayer = null;

    // Доска с шашками
    this.checkBoard = checkBoard;
    checkBoard.game = this;

    // Табло
    this.tableBoard = tableBoard;

    // Получить раунд
    this.getRound = function(){
        return this.round;
    };

    // Изменить раунд
    this.changeRound = function(){
        this.round++;
    };

    //Получить текущего игрока
    this.getCurrentPlayer = function(){
        return this.currentPlayer;
    };

    // Изменить игрока
    this.changePlayer = function(){
        if(this.getCurrentPlayer() === 1){
            this.currentPlayer = 2;
        }else{
            this.currentPlayer = 1;
        }
    };

    // Начать игру
    this.play = function () {
        this.checkBoard.defaultSet();
        this.changeRound();
        this.currentPlayer = 1;
        this.tableBoard.writeOnTableBoardPlayer(this.getCurrentPlayer());
        this.tableBoard.writeOnTableBoardRound(this.getRound());
        this.findEnabled();
    };

    // Получить шашки которыми можно сходить и выделить
    this.findEnabled = function(){
        var me = this;
        var playersCheckers = this.checkBoard.checkers.filter( function(item){ return item.player === me.currentPlayer; } );
        var freeCells = [];
        var enabled = [];

        for (var i = 0; i < playersCheckers.length; i++) {
            var nearCells = playersCheckers[i].getNearCells();

            freeCells = nearCells.filter( function(item){ return !item.isChecker; } );
            if(freeCells.length > 0){
                enabled.push(playersCheckers[i]);
            }
        }

        for(i = 0; i < enabled.length; i++){
            enabled[i].enabled();
        }

        return enabled;
    };

    // Убрать шашки которыми можно сходить
    this.disabledCheckers = function(){
        for(var i = 0; i < this.checkBoard.checkers.length; i++){
            this.checkBoard.checkers[i].disabled();
        }
    };

    // Переключить раунд
    this.nextRound = function(){
        this.disableAllCells();
        this.changePlayer();
        this.disabledCheckers();
        this.findEnabled();
        this.checkBoard.deselectSelectedChecker();
        this.changeRound();

        tableBoard.writeOnTableBoardPlayer(this.currentPlayer);
        tableBoard.writeOnTableBoardRound(this.round);
    };

    this.disableAllCells = function(){
        var cells = this.checkBoard.cells.filter( function(item){ return item.isEnable; })
        for(var i = 0; i < cells.length; i++){
            cells[i].disable();
        }
    };
};