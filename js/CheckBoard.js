// Класс шахматкая доска
var CheckBoard = function() {
    // Игра
    this.game = null;

    // Массив клеток
    this.cells = [];

    // Шашки на достке
    this.checkers = [];

    // Создать массив клеток
    var cellsObj = $('.cell');
    for (var i = 0; i < cellsObj.length; i++){
        // Установит цвет ячеек по умолчанию
        if($(cellsObj[i]).hasClass('black')){
            $(cellsObj[i]).css({backgroundColor: 'silver'});
        }
        this.cells.push(new CheckCell(cellsObj[i].id, this));
    }
};

// Получить выбранную шашку
CheckBoard.prototype.getSelectedChecker = function(){
    return this.checkers.filter(function(item){ return item.isSelected(); })[0];
};

// Получить активные шашки
CheckBoard.prototype.getEnableCheckers = function(){
    return this.checkers.filter(function(item){ return item.isEnabled(); });
};

// Активировать шашки
CheckBoard.prototype.enableCheckers = function(checkers){
    checkers.forEach(function(item){ item.enable(); });
};

// Деактивировать все шашки
CheckBoard.prototype.disabledAllCheckers = function(){
    this.checkers.forEach(function(item){ item.disable(); });
};

// Получить шашку по участнику и id
CheckBoard.prototype.getCheckerByPlayerAndId = function(player, id){
    return this.checkers.filter(function(item){
        return item.player === player &&  item.id === id;
    })[0];
};

// Получить клетку по id
CheckBoard.prototype.getCellById = function(id){
    return this.cells.filter(function(item){ return item.id === id; })[0];
};

// Получить все активные клетки
CheckBoard.prototype.getEnableCells = function(){
    return this.cells.filter( function(item){ return item.isEnabled(); });
};

// Деактивировать все активные клетки
CheckBoard.prototype.disableAllCells = function(){
    this.cells.forEach(function(item){ item.disable(); });
};

// Получить все клетки которые являются убийцами
CheckBoard.prototype.getAllKillCells = function(){
    return this.cells.filter(function(item){ return item.isKiller(); });
};

// Дефолтное состояние доски
CheckBoard.prototype.default = function(){
    // Обнулить состояния всеш клеток
    this.cells.forEach(function(item){ item.default(); });

    // Обнулить состояние всех шашек
    this.checkers = [];

    // стереть старые картинки шашек
    $('.cell img').remove();

    // Поставим шашки на места
    var player1 = this.game.getPlayer1();
    this.game.setCurrentPlayer(player1);
    player1.defaultSet();

    var player2 = this.game.getPlayer2();
    this.game.setCurrentPlayer(player2);
    player2.defaultSet();
};