var CheckCell = function(id, checkBoard){
    // Идентификатор
    this.id = id;

    // Доска
    this.checkBoard = checkBoard;

    // Объект dom
    this.realObj = $('#' + this.id);

    // Шашка расположенная на клетке
    this.checker = null;

    // Убиваемая данным полем шашка
    this.killedChecker = null;

    // Привязать событие клика к клетке
    $(this.realObj).click(this.clickHandler.bind(this));
};

// Обработчик события клика на клетку
CheckCell.prototype.clickHandler = function(){
    if(this.isEnabled()){

        console.log('checker: ' + this.checkBoard.selectedChecker.id
            + ', player: ' + this.checkBoard.selectedChecker.player
            + ', old cell: ' + this.checkBoard.selectedChecker.cell.id
            + ', new cell: ' + this.id);

        this.setChecker(this.checkBoard.selectedChecker);

        // Убить шашку
        if(this.isKiller()){

            console.log('killed checker: ' + this.killedChecker.id
                + ', player: ' + this.killedChecker.player);

            this.killedChecker.kill();

            // после убийства клетки нужно стереть все упоминания в полях
            var killCells = this.checkBoard.getAllKillCells()
            for(var i = 0; i < killCells.length; i++){
                killCells[i].killedChecker = null;
            }

            // Здесь нужно узнать можно ли еще кого то убить этой шашкой
            var enemiesNear = this.checkBoard.selectedChecker.getEnemiesNear();
            // Если есть нужно не переключать игрока
            if(enemiesNear.length > 0){
                this.checkBoard.disableAllCells();
                this.checkBoard.selectedChecker.clickHandler();
                return;
            }
        }

        this.checkBoard.game.nextRound();
    }
};

// Поставить шашку на клетку
CheckCell.prototype.setChecker = function(ch){
    $('#' + this.id).html(ch.getRealObj());

    // у старой клетки сотрем присутствие шашки
    ch.cell.checker = null;

    // Добавим шашку в новую
    this.checker = ch;
    ch.cell = this;

    if(this.checkBoard.isIntoQueenPlaces(this.id)){
        ch.makeQueen();
    }
};

// Поставить шашку на клетку
CheckCell.prototype.getRealObj = function(){
    return $(this.realObj);
};

// Поле является убийцей
CheckCell.prototype.isKiller = function(){
    return !!this.killedChecker;
};

// На поле есть шашка
CheckCell.prototype.hasChecker = function(){
    return !!this.checker;
};

// Доступность для хода
CheckCell.prototype.isEnabled = function(){
    return this.getRealObj().css('background-color') === "rgb(189, 34, 34)";
};

// Сделать область доступной для хода
CheckCell.prototype.enable = function(){
    this.getRealObj().css({backgroundColor: "rgb(189, 34, 34)"});
};

// Сделать область недоступной для хода
CheckCell.prototype.disable = function(){
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