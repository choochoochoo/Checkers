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

    // Убита ли шашка
    this.isKilled = false;

    // Клетка на которой расположена шашка
    this.cell = cell;

    // Доска с шашками
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

        var enemies = this.getEnemiesNear();
        var freeCells = null;
        var killerCell = null;

        if(enemies.length > 0){
            for(var i = 0; i < enemies.length; i++){
                killerCell = this.getCellByPos(enemies[i].cell, enemies[i].pos);
                // Это поле убивает эту шашку
                killerCell.killedChecker = enemies[i].cell.checker;
                killerCell.enable();
            }
        }else{
            freeCells = this.getFreeCellNear();
            for(var i = 0; i < freeCells.length; i++){
                freeCells[i].cell.enable();
            }
        }
    }
};

// Получть объект из dom
Checker.prototype.getRealObj = function(){
    return this.realObj;
};

// Получить клетки куда можно сходить
// возвращает массив объектов {cell, pos}
// cell - клетка
// pos - отношение между двумя клетками
Checker.prototype.getNearCells = function(){

    var cells = [];
    var cell = null;

    if(this.checkBoard.game.getCurrentPlayer() === 1){

        cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalTopLeft());
        if(cell){
            cells.push({cell: cell, pos: 'TopLeft'});
        }

        cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalTopRight());
        if(cell){
            cells.push({cell: cell, pos: 'TopRight'});
        }
    }else{

        cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalBottomLeft());
        if(cell){
            cells.push({cell: cell, pos: 'BottomLeft'});
        }

        cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalBottomRight());
        if(cell){
            cells.push({cell: cell, pos: 'BottomRight'});
        }
    }

    return cells;
};

// Получить все ближайшие клетки без учета игрока
Checker.prototype.getNearCellsWithoutPlayer = function(){

    var cells = [];
    var cell = null;

    cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalTopLeft());
    if(cell){
        cells.push({cell: cell, pos: 'TopLeft'});
    }

    cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalTopRight());
    if(cell){
        cells.push({cell: cell, pos: 'TopRight'});
    }

    cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalBottomLeft());
    if(cell){
        cells.push({cell: cell, pos: 'BottomLeft'});
    }

    cell = this.checkBoard.getCellById(this.cell.getCellIdByDiagonalBottomRight());
    if(cell){
        cells.push({cell: cell, pos: 'BottomRight'});
    }

    return cells;
};

// Получить врагов рядом
Checker.prototype.getEnemiesNear = function(){
    return this.getNearCellsWithoutPlayer().filter(function(item){
        return item.cell.isChecker && item.cell.checker.isEnemy() && item.cell.checker.isUnderAttack(item.pos) ;
    });
};

// Получить свободные клетки рядом
Checker.prototype.getFreeCellNear = function(){
    return this.getNearCells().filter( function(item){ return !item.cell.isChecker; } );
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

// Эта шашка не принадлежит текущему игроку
Checker.prototype.isEnemy = function(){
    return this.player !== this.checkBoard.game.getCurrentPlayer();
};

// Эта шашка под ударом
Checker.prototype.isUnderAttack = function(pos){

    var cell = this.getCellByPos(this.cell, pos);

    if(cell && cell.isChecker === false) {
        return true;
    }

    return false;
};

// Получить клетку в зависимости от позиции
Checker.prototype.getCellByPos = function(cell, pos){
    switch(pos) {
        case 'TopLeft':
            return this.checkBoard.getCellById(cell.getCellIdByDiagonalTopLeft());
            break;
        case 'TopRight':
            return this.checkBoard.getCellById(cell.getCellIdByDiagonalTopRight());
            break;
        case 'BottomLeft':
            return this.checkBoard.getCellById(cell.getCellIdByDiagonalBottomLeft());
            break;
        case 'BottomRight':
            return this.checkBoard.getCellById(cell.getCellIdByDiagonalBottomRight());
            break;
        default:
            return null;
            break;
    }
};

// Убить шашку
Checker.prototype.kill = function(){
    this.isKilled = true;
    this.cell.checker = null;
    this.cell.isChecker = false;
    this.cell = null;
    this.realObj.hide();
};