// Класс ИГРОК
var Player = function Player(id, name, game, defaultPlaces, queenPlaces){
    // id пользователя
    this._id = id;

    // имя пользователя
    this._name = name;

    // игра
    this._game = game;

    // Массив шашек
    this._checkers = [];

    // Позиции шашек по умолчанию
    this._defaultPlaces = defaultPlaces;

    // Позиции в которых шашки игрока становятся дамками
    this._queenPlaces = queenPlaces;
};

// Получить id игрока
Player.prototype.getId = function(){
    return this._id;
};

// Получить имя игрока
Player.prototype.getName = function(){
    return this._name;
};

// Получить все шашки пользователя
Player.prototype.getCheckers = function(){
    return this._checkers;
};

// Получить все живые шашки пользователя
Player.prototype.getAliveCheckers = function(){
    return this.getCheckers().filter(function(item) {
        return !item.isKilled();
    }.bind(this));
};

// Очистить шашки
Player.prototype.clearCheckers = function(){
    this._checkers = [];
};

// Добавить шашку
Player.prototype.addChecker = function(checker){
    this._checkers.push(checker);
};

// Проверить есть ли у игрока живые шашки
Player.prototype.hasAliveCheckers = function(){

    if(this.getAliveCheckers().length === 0){
        return true;
    }

    return false;
};

// Поле есть среди полей для становления дамкой
Player.prototype.isQueenPlace = function(cellId){

    if(this._queenPlaces.filter(function(item){ return item === cellId; }).length > 0){
        return true;
    }

    return false
};

// Установить начальное положение шашек для игрока
Player.prototype.defaultSet = function(){
    var checkBoard = this._game.checkBoard;

    for(var i = 0; i < this._defaultPlaces.length; i++){
        var cell = checkBoard.getCellById(this._defaultPlaces[i]);
        var checker = new Checker(this.getId(), i, cell, checkBoard);
        checkBoard.checkers.push(checker);
        this.addChecker(checker);
        cell.setChecker(checker);
    }
};

// Получить шашки которыми можно сходить
Player.prototype.findActiveCheckers = function(){
    var checkers = null;

    // Получим обычные шашки
    checkers = this.getCheckersWithEnemiesNear();

    // Добавим дамки
    checkers = checkers.concat(this.getCheckersQueenWithEnemiesNear());

    // Если нет шашек которые могут ударить, ищем которые могут сходить
    if(checkers.length === 0){
        checkers = this.getCheckersWithFreeCellsNear();
        checkers = checkers.concat(this.getCheckersQueenWithFreeCellsNear());
    }

    return checkers;
};

// Получить все шашки у которых есть рядом свободная клетка
Player.prototype.getCheckersWithFreeCellsNear = function(){
    return this.getAliveCheckers().filter(function(item){
        return item.getFreeCellNear().length > 0;
    });
};

// Получит все шашки у которых рядом враг
Player.prototype.getCheckersWithEnemiesNear = function(){
    return this.getAliveCheckers().filter(function(item){
        return item.getEnemiesNear().length > 0;
    });
};

// Получить все дамки у которых есть рядом свободная клетка
Player.prototype.getCheckersQueenWithFreeCellsNear = function(){
    return this.getAliveCheckers().filter(function(item){
        return item.isQueen() && item.getFreeCellNearForQueen().length > 0;
    });
};

// Получить все дамки у которых есть враг
Player.prototype.getCheckersQueenWithEnemiesNear = function(){
    return this.getAliveCheckers().filter(function(item){
        return item.isQueen() && item.getEnemiesNearForQueen().length > 0;
    });
};
