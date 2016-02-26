// Класс ИГРА
var Game = function(){
    // Номер раунда
    this.round = 0;

    // Текущий игрок
    this.currentPlayer = null;

    // Табло
    this.tableBoard = new TableBoard();
    this.checkBoard = new CheckBoard();
    this.checkBoard.game = this;

    // Привязка к событию
    this.tableBoard.getStartButton().click(function(){
        this.play();
    }.bind(this));

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
        // Обнулить состояния всеш клеток
        this.checkBoard.cells.forEach(function(item){ item.default(); });

        // Обнулит состояние всех шашек
        this.checkBoard.checkers = [];
        // стереть старые картинки шашек
        $('.cell img').remove();

        this.checkBoard.defaultSet();
        this.round = 1;
        this.currentPlayer = 1;
        this.tableBoard.writeOnTableBoardPlayer(this.getCurrentPlayer());
        this.tableBoard.writeOnTableBoardRound(this.getRound());
        this.enableCheckers(this.findPossible());
    };

    // Получить шашки которыми можно сходить
    this.findPossible = function(){
        var enabled = [];
        var checkersWithEnemies = this.getCheckersWithEnemiesNear();
        // Добавим дамки
        checkersWithEnemies = checkersWithEnemies.concat(this.getCheckersQueenWithEnemiesNear());

        // Есть ли есть рядом враги со свободным полем для удара
        if(checkersWithEnemies.length > 0){
            enabled = checkersWithEnemies;
        }else{
            enabled = this.getCheckersWithFreeCellsNear();
            enabled = enabled.concat(this.getCheckersQueenWithFreeCellsNear());
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

    // Получить все дамки у которых есть рядом свободная клетка
    this.getCheckersQueenWithFreeCellsNear = function(){
        return this.getCheckersCurrentPlayer().filter(function(item){
            return item.isQueen() && item.getFreeCellNearForQueen().length > 0;
        });
    };

    // Получить все дамки у которых есть враг
    this.getCheckersQueenWithEnemiesNear = function(){
        return this.getCheckersCurrentPlayer().filter(function(item){
            return item.isQueen() && item.getEnemiesNearForQueen().length > 0;
        });
    };

    // Активировать шашки для хода
    this.enableCheckers = function(checkers){
        for(var i = 0; i < checkers.length; i++){
            checkers[i].enable();
        }
    };

    // Убрать шашки которыми можно сходить
    this.disabledAllCheckers = function(){
        for(var i = 0; i < this.checkBoard.checkers.length; i++){
            this.checkBoard.checkers[i].disable();
        }
    };

    // Получить шашки текущего игрока
    this.getCheckersCurrentPlayer = function(){
        return this.checkBoard.checkers.filter(function(item){
            return item.player === this.currentPlayer && !item.isKilled();
        }.bind(this) );
    };

    // Получить активные шашки
    this.getEnableCheckers = function(){
        return this.checkBoard.checkers.filter(function(item){
            return item.isEnabled();
        });
    };

    // Переключить раунд
    this.nextRound = function(){
        this.checkBoard.disableAllCells();
        this.changePlayer();
        this.disabledAllCheckers();

        if(this.hasPlayerLiveCheckers(1)){
            this.tableBoard.writeOnTableBoardWinner(2);
            alert('Победил игрок: ' + 2);
            return;
        }

        if(this.hasPlayerLiveCheckers(2)){
            this.tableBoard.writeOnTableBoardWinner(1);
            alert('Победил игрок: ' + 1);
            return;
        }

        this.enableCheckers(this.findPossible());
        this.changeRound();

        this.tableBoard.writeOnTableBoardPlayer(this.currentPlayer);
        this.tableBoard.writeOnTableBoardRound(this.round);

        this.checkBoard.selectedChecker.deselect();
    };

    // Проверить есть ли у игрока живые шашки
    this.hasPlayerLiveCheckers = function(player){
        var aliveCheckers = this.checkBoard.checkers.filter(function(item) {
            return !item.isKilled() && item.player === player;
        });

        if(aliveCheckers.length === 0){
            return true;
        }

        return false;
    };
};