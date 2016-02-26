var CheckBoard = function() {
    // Игра
    this.game = null;

    // Массив клеток
    this.cells = [];

    // Создать массив клеток
    var cellsObj = $('.cell');
    for (var i = 0; i < cellsObj.length; i++){
        // Установит цвет ячеек по умолчанию
        if($(cellsObj[i]).hasClass('black')){
            $(cellsObj[i]).css({backgroundColor: 'silver'});
        }
        this.cells.push(new CheckCell(cellsObj[i].id, this));
    }

    // Шашки на достке
    this.checkers = [];

    // Активная шашка
    this.selectedChecker = null;

    // Позиции шашек игрока 1 по умолчанию
    this.defaultPlaceForPlayer1 = [
        '1a', '1c', '1e', '1g',
        '2b', '2d', '2f', '2h',
        '3a', '3c', '3e', '3g'
    ];

    // Позиции шашек игрока 2 по умолчанию
    this.defaultPlaceForPlayer2 = [
        '6b', '6d', '6f', '6h',
        '7a', '7c', '7e', '7g',
        '8b', '8d', '8f', '8h'
    ];

    // Позиции в которых шашки игрока 1 становятся дамками
    this.queenPlaceForPlayer1 = [
        '8b', '8d', '8f', '8h'
    ];

    // Позиции в которых шашки игрока 2 становятся дамками
    this.queenPlaceForPlayer2 = [
        '1a', '1c', '1e', '1g',
    ];

    // Установить начальное положение шашек
    this.defaultSet = function(){
        this.game.currentPlayer = 1;
        this.defaultSetPlayer1();
        this.game.currentPlayer = 2;
        this.defaultSetPlayer2();
    };

    // Установить начальное положение шашек для игрока 1
    this.defaultSetPlayer1 = function(){
        var me = this;
        for(var i = 0; i < this.defaultPlaceForPlayer1.length; i++){
            var cell = this.cells.filter( function(item){ return item.id === me.defaultPlaceForPlayer1[i]; } )[0];
            var checker = new Checker(1, i, cell, this);
            cell.setChecker(checker);
            this.checkers.push(checker);
        }
    };

    // Установить начальное положение шашек для игрока 2
    this.defaultSetPlayer2 = function(){
        var me = this;
        for(var i = 0; i < this.defaultPlaceForPlayer2.length; i++){
            var cell = this.cells.filter( function(item){ return item.id === me.defaultPlaceForPlayer2[i]; } )[0];
            var checker = new Checker(2, i, cell, this);
            cell.setChecker(checker);
            this.checkers.push(checker);
        }
    };

    // Получить шашку по участнику и id
    this.getCheckerByPlayerAndId = function(player, id){
        return this.checkers.filter( function(item){ return item.player === player &&  item.id === id; } )[0];
    };

    // Получить клетку по id
    this.getCellById = function(id){
        return this.cells.filter( function(item){ return item.id === id; })[0];
    };

    // Получить все активные клетки
    this.getEnableCells = function(){
        return this.cells.filter( function(item){ return item.isEnabled(); });
    };

    // Деактивировать все активные клетки
    this.disableAllCells = function(){
        var cells = this.getEnableCells();
        for(var i = 0; i < cells.length; i++){
            cells[i].disable();
        }
    };

    // Поле есть среди полей для становления дамкой
    this.isIntoQueenPlaces = function(id){
        if(this.game.getCurrentPlayer() === 1){
            if(this.queenPlaceForPlayer1.filter(function(item){ return item === id; }).length > 0){
                return true;
            }
        }else{
            if(this.queenPlaceForPlayer2.filter(function(item){ return item === id; }).length > 0){
                return true;
            }
        }

        return false;
    }

    // Получить все клетки которые являются убийцами
    this.getAllKillCells = function(){
        return this.cells.filter(function(item){
            return !!item.killedChecker;
        });
    };
};