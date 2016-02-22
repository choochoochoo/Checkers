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
        this.enablePossibleCheckers(this.findPossible());
    };

    // Получить шашки которыми можно сходить
    this.findPossible = function(){

        var enabled = [];
        var checkersWithEnemies = this.getCheckersWithEnemiesNear();

        // Есть ли есть рядом враги со свободным полем для удара
        if(checkersWithEnemies.length > 0){
            enabled = checkersWithEnemies;
        }else{
            enabled = this.getCheckersWithFreeCellsNear();
        }




        return enabled;
    };

    // Получить все шашки у которых есть рядом свободная клетка
    this.getCheckersWithFreeCellsNear = function(){
        return this.getCheckersCurrentPlayer().filter(function(item){
            return item.getFreeCellNear().length > 0;
        });
    };

    // Получит все шашки у которых рядом враг
    this.getCheckersWithEnemiesNear = function(){
        return this.getCheckersCurrentPlayer().filter(function(item){
            return item.getEnemiesNear().length > 0;
        });
    };

    // Активировать шашки для хода
    this.enablePossibleCheckers = function(checkers){
        for(var i = 0; i < checkers.length; i++){
            checkers[i].enabled();
        }
    };

    // Получить шашки текущего игрока
    this.getCheckersCurrentPlayer = function(){
        return this.checkBoard.checkers.filter( function(item){ return item.player === this.currentPlayer; }.bind(this) );
    };

    // Получить активные шашки
    this.getEnableCheckers = function(){
        return this.checkBoard.checkers.filter( function(item){ return item.isEnabled; } );
    };

    // Убрать шашки которыми можно сходить
    this.disabledCheckers = function(){
        for(var i = 0; i < this.checkBoard.checkers.length; i++){
            this.checkBoard.checkers[i].disabled();
        }
    };

    // Переключить раунд
    this.nextRound = function(){
        this.checkBoard.disableAllCells();
        this.changePlayer();
        this.disabledCheckers();
        this.enablePossibleCheckers(this.findPossible());
        this.checkBoard.deselectSelectedChecker();
        this.changeRound();

        tableBoard.writeOnTableBoardPlayer(this.currentPlayer);
        tableBoard.writeOnTableBoardRound(this.round);
    };
};