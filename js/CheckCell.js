var CheckCell = function(id, checkBoard){
    // Идентификатор
    this.id = id;

    // Доска
    this.checkBoard = checkBoard;

    // Объект dom
    this.realObj = $('#' + this.id);

    // Шашка расположенная на клетке
    this.checker = null;

    // Есть шашка или нет
    this.isChecker = false;

    // Доступность для хода
    this.isEnable = false;

    // Убиваемая данным полем шашка
    this.killedChecker = null;

    // Привязать событие клика к клетке
    $(this.realObj).click(this.clickHandler.bind(this));
};

// Обработчик события клика на клетку
CheckCell.prototype.clickHandler = function(){
    if(this.isEnable){
        this.setChecker(this.checkBoard.selectedChecker);

        // Убить шашку
        if(this.isKiller()){
            this.killedChecker.kill();
            this.killedChecker = null;
        }

        this.checkBoard.game.nextRound();
    }
};

// Поставить шашку на клетку
CheckCell.prototype.setChecker = function(ch){
    $('#' + this.id).html(ch.getRealObj());

    // у старой клетки сотрем присутствие шашки
    ch.cell.isChecker = false;
    ch.cell.checker = null;

    // Добавим шашку в новую
    this.isChecker = true;
    this.checker = ch;
    ch.cell = this;
};

// Поставить шашку на клетку
CheckCell.prototype.getRealObj = function(){
    return $(this.realObj);
};

// Сделать область доступной для хода
CheckCell.prototype.enable = function(){
    this.isEnable = true;
    this.getRealObj().css({backgroundColor: '#BD2222'});
};

// Сделать область недоступной для хода
CheckCell.prototype.disable = function(){
    this.isEnable = false;
    this.getRealObj().css({backgroundColor: 'silver'});
};

// Получить первую часть id
CheckCell.prototype.getFirstPartOfId = function(){
    return parseInt(this.id.charAt(0), 10);
};

// Получить вторую часть id
CheckCell.prototype.getSecondPartOfId = function(){
    return this.id.charCodeAt(1);
};

// Получить клетку по диагонали вверх и влево
CheckCell.prototype.getCellIdByDiagonalTopLeft = function(){
    return (this.getFirstPartOfId() + 1) + String.fromCharCode(this.getSecondPartOfId() - 1);
};

// Получить клетку по диагонали вверх и вправо
CheckCell.prototype.getCellIdByDiagonalTopRight = function(){
    return (this.getFirstPartOfId() + 1) + String.fromCharCode(this.getSecondPartOfId() + 1);
};

// Получить клетку по диагонали вниз и влево
CheckCell.prototype.getCellIdByDiagonalBottomLeft = function(){
    return (this.getFirstPartOfId() - 1) + String.fromCharCode(this.getSecondPartOfId() - 1);
};

// Получить клетку по диагонали вниз и вправо
CheckCell.prototype.getCellIdByDiagonalBottomRight = function(){
    return (this.getFirstPartOfId() - 1) + String.fromCharCode(this.getSecondPartOfId() + 1);
};

// Поле является убийцей
CheckCell.prototype.isKiller = function(){
    return !!this.killedChecker;
};