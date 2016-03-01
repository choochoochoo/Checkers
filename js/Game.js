// Класс ИГРА
var Game = function(){
    // Номер раунда
    this._round = 0;

    // Текущий игрок
    this._currentPlayer = null;

    // Табло
    this.tableBoard = new TableBoard();
    this.checkBoard = new CheckBoard();
    this.checkBoard.game = this;

    // Игроки
    this.players = [];

    // Места становления дамок игрока 1
    var queenPlaces1 = [ '8b', '8d', '8f', '8h' ];

    // Позиции шашек игрока 1 по умолчанию
    var defaultPlaces1 = [
        '1a', '1c', '1e', '1g',
        '2b', '2d', '2f', '2h',
        '3a', '3c', '3e', '3g'
    ];

    // Места становления дамок игрока 2
    var queenPlaces2 = [ '1a', '1c', '1e', '1g' ];

    // Позиции шашек игрока 2 по умолчанию
    var defaultPlaces2 = [
        '6b', '6d', '6f', '6h',
        '7a', '7c', '7e', '7g',
        '8b', '8d', '8f', '8h'
    ];

    this.players.push(new Player(1, 'Белый', this, defaultPlaces1, queenPlaces1));
    this.players.push(new Player(2, 'Черный', this, defaultPlaces2, queenPlaces2));

    // Привязка к событию
    this.tableBoard.getStartButton().click(function(){ this.play(); }.bind(this));
};

// Получить раунд
Game.prototype.getRound = function(){
    return this._round;
};

// Получить текущего игрока
Game.prototype.getCurrentPlayer = function(){
    return this._currentPlayer;
};

// Установить текущего игрока
Game.prototype.setCurrentPlayer = function(player){
    this._currentPlayer = player;
};

// Получить игрока 1
Game.prototype.getPlayer1 = function(){
    return this.players[0];
};

// Получить игрока 2
Game.prototype.getPlayer2 = function(){
    return this.players[1];
};

// Изменить игрока
Game.prototype.changePlayer = function(){
    if(this.getCurrentPlayer().getId() === this.getPlayer1().getId()){
        this.setCurrentPlayer(this.getPlayer2());
    }else{
        this.setCurrentPlayer(this.getPlayer1());
    }
};

// Начать игру
Game.prototype.play = function () {

    // Обнулить все шашки игроков
    this.getPlayer1().clearCheckers();
    this.getPlayer2().clearCheckers();

    // Дефолтное состояние доски
    this.checkBoard.default();

    // Сначала раунд 1
    this._round = 1;

    // Поставить игрока 1 по умолчанию
    this.setCurrentPlayer(this.getPlayer1());

    // Активировать шашки
    this.checkBoard.enableCheckers(this.getCurrentPlayer().findActiveCheckers());

    // Написать на табло
    this.tableBoard.writeOnTableBoardPlayer(this.getCurrentPlayer().getName());
    this.tableBoard.writeOnTableBoardRound(this.getRound());
};

// Переключить раунд
Game.prototype.nextRound = function(){
    // Изменить текущего игрока
    this.changePlayer();

    // Деактивировать все клетки
    this.checkBoard.disableAllCells();

    // Деактивировать все шашки
    this.checkBoard.disabledAllCheckers();

    // Снять выбор с шашки
    this.checkBoard.getSelectedChecker().deselect();

    // Посмотреть есть ли у игрока 1 еще шашки
    if(this.getPlayer1().hasAliveCheckers()){
        this.tableBoard.writeOnTableBoardWinner(this.getPlayer2().getName());
        alert('Победил игрок: ' + this.getPlayer2().getName());
        return;
    }

    // Посмотреть есть ли у игрока 2 еще шашки
    if(this.getPlayer2().hasAliveCheckers()){
        this.tableBoard.writeOnTableBoardWinner(this.getPlayer1().getName());
        alert('Победил игрок: ' + this.getPlayer1().getName());
        return;
    }

    // Активировать шашки
    this.checkBoard.enableCheckers(this.getCurrentPlayer().findActiveCheckers());

    // Изменить номер раунда
    this._round++;

    // Написать на табло
    this.tableBoard.writeOnTableBoardPlayer(this.getCurrentPlayer().getName());
    this.tableBoard.writeOnTableBoardRound(this.getRound());
};