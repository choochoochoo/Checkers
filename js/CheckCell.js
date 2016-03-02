var CheckCell = function(id, checkBoard){
    // Идентификатор
    this.id = id;

    // Доска
    this.checkBoard = checkBoard;

    // Объект dom
    this._realObj = $('#' + this.id);

    // Шашка расположенная на клетке
    this._checker = null;

    // Убиваемая данным полем шашка
    this._killedChecker = null;

    // Доступность для хода
    this._isEnabled = false;

    // Привязать событие клика к клетке
    this._realObj.click(this.clickHandler.bind(this));
};

// Обработчик события клика на клетку
CheckCell.prototype.clickHandler = function(){
    if(this.isEnabled()){

        var selectedChecker = this.checkBoard.getSelectedChecker();

        // Записать активность
        this.traceActivity();

        // Поставить выбранную шашку на клетку
        this.setChecker(selectedChecker);

        // Попытаться сделать дамкой
        this.tryToMakeQueen();

        // Если поле является убийцей
        if(this.isKiller()){

            // Убить шашку которую поле убивает
            this.getKilledChecker().kill();

            // после убийства клетки нужно стереть все упоминания в полях
            this.checkBoard.clearAllKillCells();

            // Если есть враги нужно не переключать раунд
            if(selectedChecker.isEnemiesNear()){
                // Деактивируем все клетки
                this.checkBoard.disableAllCells();

                // Нажмем на шашку
                selectedChecker.clickHandler();

                return;
            }
        }

        // Переключить раунд
        this.checkBoard.game.nextRound();
    }
};

// Поставить шашку на клетку
CheckCell.prototype.setChecker = function(ch){
    // Здесь вставляему шашку в дом
    $('#' + this.id).html(ch.getRealObj());

    // у старой клетки сотрем присутствие шашки
    ch.cell._checker = null;

    // Добавим шашку в новую
    this._checker = ch;

    // Шашке запишем клетку
    ch.cell = this;
};

// Получить шашку
CheckCell.prototype.getChecker = function(ch){
    return this._checker;
};

// Получить убиваемую шашку данной клеткой
CheckCell.prototype.getKilledChecker = function(){
    return this._killedChecker;
};

// Установить убиваемую шашку данной клеткой
CheckCell.prototype.setKilledChecker = function(checker){
    this._killedChecker = checker;
};

// Поставить шашку на клетку
CheckCell.prototype.getRealObj = function(){
    return this._realObj;
};

// Поле является убийцей
CheckCell.prototype.isKiller = function(){
    return !!this.getKilledChecker();
};

// На поле есть шашка
CheckCell.prototype.hasChecker = function(){
    return !!this._checker;
};

// Установить дефолтное состояние клетки
CheckCell.prototype.default = function(){
    this._checker = null;
    this._killedChecker = null;
    this.disable();
};

// Доступность для хода
CheckCell.prototype.isEnabled = function(){
    return this._isEnabled;
};

// Сделать область доступной для хода
CheckCell.prototype.enable = function(){
    this._isEnabled = true;
    this.getRealObj().css({backgroundColor: "rgb(189, 34, 34)"});
};

// Сделать область недоступной для хода
CheckCell.prototype.disable = function(){
    this._isEnabled = false;

    if(this.getRealObj().hasClass('black')){
        this.getRealObj().css({backgroundColor: 'silver'});
    }else{
        this.getRealObj().css({backgroundColor: 'ivory'});
    }
};

// Попытаться сделать дамкой
CheckCell.prototype.tryToMakeQueen = function(){
    if(this.checkBoard.game.getCurrentPlayer().isQueenPlace(this.id)){
        this.checkBoard.getSelectedChecker().makeQueen();
    }
};

// Записать активность
CheckCell.prototype.traceActivity = function(){
    console.log('checker: ' + this.checkBoard.getSelectedChecker().id
        + ', player: ' + this.checkBoard.getSelectedChecker().player
        + ', old cell: ' + this.checkBoard.getSelectedChecker().cell.id
        + ', new cell: ' + this.id);

    if(this.isKiller()){
        console.log('killed checker: ' + this.getKilledChecker().id
            + ', player: ' + this.getKilledChecker().player);
    }
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

// Получить все клетки по диагонали вверх и влево
// граница по Y - 8, по X - a
CheckCell.prototype.getAllCellIdsByDiagonalTopLeft = function(){
    var cellIds = [];

    // Навеяло интересно решение благодаря js
    // взял из основного объекта часть, которая нужна для решения
    // данной задачи
    var obj = {
        id: this.id,
        getFirstPartOfId: CheckCell.prototype.getFirstPartOfId,
        getSecondPartOfId: CheckCell.prototype.getSecondPartOfId,
        getCellIdByDiagonalTopLeft: CheckCell.prototype.getCellIdByDiagonalTopLeft
    };

    var func = function(obj){
        var id = obj.getCellIdByDiagonalTopLeft();
        obj.id = id;

        if(obj.getFirstPartOfId() > 8){
            return;
        }

        if(obj.getSecondPartOfId() < 'a'.charCodeAt(0)){
            return;
        }

        cellIds.push(id);

        func(obj);
    };

    func(obj);

    return cellIds;
};

// Получить все клетки по диагонали вверх и влево
// граница по Y - 8, по X - h
CheckCell.prototype.getAllCellIdsByDiagonalTopRight = function(){
    var cellIds = [];

    // Навеяло интересно решение благодаря js
    // взял из основного объекта часть, которая нужна для решения
    // данной задачи
    var obj = {
        id: this.id,
        getFirstPartOfId: CheckCell.prototype.getFirstPartOfId,
        getSecondPartOfId: CheckCell.prototype.getSecondPartOfId,
        getCellIdByDiagonalTopRight: CheckCell.prototype.getCellIdByDiagonalTopRight
    };

    var func = function(obj){
        var id = obj.getCellIdByDiagonalTopRight();
        obj.id = id;

        if(obj.getFirstPartOfId() > 8){
            return;
        }

        if(obj.getSecondPartOfId() > 'h'.charCodeAt(0)){
            return;
        }

        cellIds.push(id);

        func(obj);
    };

    func(obj);

    return cellIds;
};

// Получить все клетки по диагонали вниз и влево
// граница по Y - 1, по X - a
CheckCell.prototype.getAllCellIdsByDiagonalBottomLeft = function(){
    var cellIds = [];

    // Навеяло интересно решение благодаря js
    // взял из основного объекта часть, которая нужна для решения
    // данной задачи
    var obj = {
        id: this.id,
        getFirstPartOfId: CheckCell.prototype.getFirstPartOfId,
        getSecondPartOfId: CheckCell.prototype.getSecondPartOfId,
        getCellIdByDiagonalBottomLeft: CheckCell.prototype.getCellIdByDiagonalBottomLeft
    };

    var func = function(obj){
        var id = obj.getCellIdByDiagonalBottomLeft();
        obj.id = id;

        if(obj.getFirstPartOfId() < 1){
            return;
        }

        if(obj.getSecondPartOfId() < 'a'.charCodeAt(0)){
            return;
        }

        cellIds.push(id);

        func(obj);
    };

    func(obj);

    return cellIds;
};

// Получить все клетки по диагонали вниз и влево
// граница по Y - 1, по X - h
CheckCell.prototype.getAllCellIdsByDiagonalBottomRight = function(){
    var cellIds = [];

    // Навеяло интересно решение благодаря js
    // взял из основного объекта часть, которая нужна для решения
    // данной задачи
    var obj = {
        id: this.id,
        getFirstPartOfId: CheckCell.prototype.getFirstPartOfId,
        getSecondPartOfId: CheckCell.prototype.getSecondPartOfId,
        getCellIdByDiagonalBottomRightt: CheckCell.prototype.getCellIdByDiagonalBottomRight
    };

    var func = function(obj){
        var id = obj.getCellIdByDiagonalBottomRightt();
        obj.id = id;

        if(obj.getFirstPartOfId() < 1){
            return;
        }

        if(obj.getSecondPartOfId() > 'h'.charCodeAt(0)){
            return;
        }

        cellIds.push(id);

        func(obj);
    };

    func(obj);

    return cellIds;
};