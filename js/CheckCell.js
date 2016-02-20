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

    // Привязать событие клика к клетке
    $(this.realObj).click(this.clickHandler.bind(this));
};

// Обработчик события клика на клетку
CheckCell.prototype.clickHandler = function(){
    if(this.isEnable){
        this.setChecker(this.checkBoard.selectedChecker);

        this.checkBoard.game.nextRound();
    }
};

// Поставить шашку на клетку
CheckCell.prototype.setChecker = function(ch){
    $('#' + this.id).html(ch.getRealObj());
    this.isChecker = true;
    this.checker = ch;
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
