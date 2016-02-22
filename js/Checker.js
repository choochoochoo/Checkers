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

        var cells = this.getNearCells();
        for(var i = 0; i < cells.length; i++){
            if(!cells[i].cell.isChecker){
                cells[i].cell.enable();
            }
        }
    }
};

// Получть объект из dom
Checker.prototype.getRealObj = function(){
    return this.realObj;
};

// Получить клетки куда можно сходить
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

// Получить врагов рядом
Checker.prototype.getEnemiesNear = function(){
    return this.getNearCells().filter(function(item){
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
}

// Эта шашка под ударом
Checker.prototype.isUnderAttack = function(pos){

    switch(pos) {
        case 'TopLeft':
            return !this.checkBoard.getCellById(this.cell.getCellIdByDiagonalTopLeft()).isChecker;
            break;
        case 'TopRight':
            return !this.checkBoard.getCellById(this.cell.getCellIdByDiagonalTopRight()).isChecker;
            break;
        case 'BottomLeft':
            return !this.checkBoard.getCellById(this.cell.getCellIdByDiagonalBottomLeft()).isChecker;
            break;
        case 'BottomRight':
            return !this.checkBoard.getCellById(this.cell.getCellIdByDiagonalBottomRight()).isChecker;
            break;
        default:
            return false;
            break;
    }


    return false;
}