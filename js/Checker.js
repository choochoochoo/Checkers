// Класс ШАШКА
var Checker = function(player, id, cell, checkBoard){
    // Игрок кому принадлежит шашка
    this.player = player;

    // Id шашки
    this.id = id;

    // Объект из dom
    this.realObj = null;

    // Доступность шашки для хода
    this.isEnabled = false;

    // Активная шашка
    this.isSelected = false;

    // Клетка на которой расположена шашка
    this.cell = cell;

    this.checkBoard = checkBoard;

    if(player === 1){
        this.realObj = $('<img />',{'src': 'img/white-checker.png'});
    }
    else{
        this.realObj = $('<img />',{'src': 'img/black-checker.png'});
    }

    $(this.realObj).click(this.clickHandler.bind(this));
};

// События клика
Checker.prototype.clickHandler = function(){
    if(this.isEnabled){
        this.checkBoard.setSelectedChecker(this);
        this.select();

        var cells = this.getNearCells();
        for(var i = 0; i < cells.length; i++){
            cells[i].enable();
        }
    }
};

// Получть объект из dom
Checker.prototype.getRealObj = function(){
    return this.realObj;
};

// Получить id соседних ячеек куда можно будет сходить шашкой
Checker.prototype.getNearCellsId = function(){
    var cells = [];
    var partOne = parseInt(this.cell.id.charAt(0));
    var partTwo = this.cell.id.charAt(1).charCodeAt();
    var cell1Id = null;
    var cell2Id = null;

    if(this.checkBoard.game.getCurrentPlayer() === 1){
        cell1Id = (partOne + 1) + String.fromCharCode(partTwo - 1);
        cell2Id = (partOne + 1) + String.fromCharCode(partTwo + 1);
    }else{
        cell1Id = (partOne - 1) + String.fromCharCode(partTwo - 1);
        cell2Id = (partOne - 1) + String.fromCharCode(partTwo + 1);
    }

    cells.push(cell1Id);
    cells.push(cell2Id);

    return cells;
};

// Получить клетки куда можно сходить
Checker.prototype.getNearCells = function(){
    var cellsId = this.getNearCellsId();
    var cells = [];
    var cell = null;

    for(var i = 0; i < cellsId.length; i++){
        cell = this.checkBoard.cells.filter( function(item){ return item.id === cellsId[i]; } )[0];
        if(cell){
            cells.push(cell);
        }
    }

    return cells;
};

// Сделать шашку доступной для хода
Checker.prototype.enabled = function(){

    this.isEnabled = true;

    if(this.player === 1){
        this.realObj.attr({'src': 'img/white-checker-enabled.png'});
    }
    else{
        this.realObj.attr({'src': 'img/black-checker-enabled.png'});
    }
};

// Сделать шашку доступной для хода
Checker.prototype.disabled = function(){

    this.isEnabled = false;

    if(this.player === 1){
        this.realObj.attr({'src': 'img/white-checker.png'});
    }
    else{
        this.realObj.attr({'src': 'img/black-checker.png'});
    }
};

// Сделать шашку активной
Checker.prototype.select = function(){

    this.isSelected = true;

    if(this.player === 1){
        this.realObj.attr({'src': 'img/white-checker-selected.png'});
    }
    else{
        this.realObj.attr({'src': 'img/black-checker-selected.png'});
    }
};

// Сделать шашку неактивной
Checker.prototype.deselect = function(){

    this.isSelected = false;

    if(this.player === 1){
        this.realObj.attr({'src': 'img/white-checker-enabled.png'});
    }
    else{
        this.realObj.attr({'src': 'img/black-checker-enabled.png'});
    }
};