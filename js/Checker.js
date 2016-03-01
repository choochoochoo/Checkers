// Класс ШАШКА
var Checker = function(player, id, cell, checkBoard){
    // Игрок кому принадлежит шашка
    this.player = player;

    // Id шашки
    this.id = id;

    // Объект из dom
    this.realObj = null;

    // Клетка на которой расположена шашка
    this.cell = cell;

    // Поле показывает что шашка убита
    this._isKilled = false;

    // Поле показывает что шашка может ходить
    this._isEnabled = false;

    // Активная шашка
    this._isSelected = false;

    // Дамка
    this._isQueen = false;

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
    if(this.isEnabled()){
        this.select();

        var enemies = this.getEnemiesNear();

        if(this.isQueen()){
            enemies = enemies.concat(this.getEnemiesNearForQueen());
        }

        var freeCells = null;
        var killerCell = null;
        var killerCells = null;

        if(enemies.length > 0){

            if(this.isQueen()){
                for(var i = 0; i < enemies.length; i++){
                    // нужно получить всю диагональ
                    killerCells = this.getDiagonalCellByPos(enemies[i].cell, enemies[i].pos);
                    // И активировать все поля которые без шашек
                    for(var j = 0; j < killerCells.length; j++){
                        if(!killerCells[j].hasChecker()){
                            // Это поле убивает эту шашку
                            killerCells[j].setKilledChecker(enemies[i].cell.getChecker());
                            killerCells[j].enable();
                        }
                    }
                }
            }else{
                for(var i = 0; i < enemies.length; i++){
                    killerCell = this.getCellByPos(enemies[i].cell, enemies[i].pos);
                    // Это поле убивает эту шашку
                    killerCell.setKilledChecker(enemies[i].cell.getChecker());
                    killerCell.enable();
                }
            }
        }else{

            if(this.isQueen()){
                freeCells = this.getFreeCellNearForQueen();
            }else{
                freeCells = this.getFreeCellNear();
            }

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

    if(this.checkBoard.game.getCurrentPlayer().getId() === this.checkBoard.game.getPlayer1().getId()){

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

// Получить клетки куда можно сходить без учетка игрока
// возвращает массив объектов {cell, pos}
// cell - клетка
// pos - отношение между двумя клетками
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
        return item.cell.hasChecker() && item.cell.getChecker().isEnemy() && item.cell.getChecker().isUnderAttack(item.pos);
    });
};

// Получить свободные клетки рядом
Checker.prototype.getFreeCellNear = function(){
    return this.getNearCells().filter( function(item){ return !item.cell.hasChecker(); } );
};

// Получить клетки куда можно сходить для дамки
// возвращает массив объектов {cell, pos}
// если на пути встречается своя шашка то нужно дальше путь не прокладывать
// cell - клетка
// pos - отношение между двумя клетками
Checker.prototype.getNearCellsForQueen = function(){
    var cells = [];
    var cell = null;
    var cellsIds = [];

    cellsIds = this.cell.getAllCellIdsByDiagonalTopLeft();
    for(var i = 0; i < cellsIds.length; i++){

        cell = this.checkBoard.getCellById(cellsIds[i]);

        if(cell.hasChecker() && !cell.getChecker().isEnemy()){
            break;
        }

        cells.push({cell: cell, pos: 'TopLeft'});
    }

    cellsIds = this.cell.getAllCellIdsByDiagonalTopRight();
    for(var i = 0; i < cellsIds.length; i++){

        cell = this.checkBoard.getCellById(cellsIds[i]);

        if(cell.hasChecker() && !cell.getChecker().isEnemy()){
            break;
        }

        cells.push({cell: cell, pos: 'TopRight'});
    }

    cellsIds = this.cell.getAllCellIdsByDiagonalBottomLeft();
    for(var i = 0; i < cellsIds.length; i++){

        cell = this.checkBoard.getCellById(cellsIds[i]);

        if(cell.hasChecker() && !cell.getChecker().isEnemy()){
            break;
        }

        cells.push({cell: cell, pos: 'BottomLeft'});
    }

    cellsIds = this.cell.getAllCellIdsByDiagonalBottomRight();
    for(var i = 0; i < cellsIds.length; i++){
        cell = this.checkBoard.getCellById(cellsIds[i]);

        if(cell.hasChecker() && !cell.getChecker().isEnemy()){
            break;
        }

        cells.push({cell: cell, pos: 'BottomRight'});
    }

    return cells;
};

// Получить свободные клетки для дамки
Checker.prototype.getFreeCellNearForQueen = function(){
    return this.getNearCellsForQueen().filter( function(item){ return !item.cell.hasChecker(); } );
};

// Получить врагов рядом для дамки (это по всем диагоналям)
Checker.prototype.getEnemiesNearForQueen = function(){
    return this.getNearCellsForQueen().filter(function(item){
        return item.cell.hasChecker() && item.cell.getChecker().isEnemy() && item.cell.getChecker().isUnderAttack(item.pos);
    });
};

// Сделать шашку доступной для хода
Checker.prototype.enable = function(){

    this._isEnabled = true;

    if(this.player === 1){
        if(this.isQueen()){
            this.realObj.attr({'src': 'img/white-checker-queen-enabled.png'});
        }else{
            this.realObj.attr({'src': 'img/white-checker-enabled.png'});
        }
    }
    else{
        if(this.isQueen()){
            this.realObj.attr({'src': 'img/black-checker-queen-enabled.png'});
        }else{
            this.realObj.attr({'src': 'img/black-checker-enabled.png'});
        }
    }
};

// Сделать шашку доступной для хода
Checker.prototype.disable = function(){

    this._isEnabled = false;

    if(this.player === 1){
        if(this.isQueen()){
            this.realObj.attr({'src': 'img/white-checker-queen.png'});
        }else{
            this.realObj.attr({'src': 'img/white-checker.png'});
        }
    }
    else{
        if(this.isQueen()){
            this.realObj.attr({'src': 'img/black-checker-queen.png'});
        }else{
            this.realObj.attr({'src': 'img/black-checker.png'});
        }
    }
};

// Сделать шашку активной
Checker.prototype.select = function(){
    if(this.checkBoard.getSelectedChecker()){
        // Если была старая нужно снять с нее выбор
        this.checkBoard.getSelectedChecker().deselect();

        // Сделать старые активные поля неактивными
        this.checkBoard.disableAllCells();
    }


    this._isSelected = true;

    var fileName =
        'img/' + ( this.player === 1 ? 'white' : 'black' )
        + '-checker' + ( this.isQueen() ? '-queen' : '' )
        + '-selected.png';

    this.realObj.attr({'src': fileName});
};

// Сделать шашку неактивной
Checker.prototype.deselect = function(){
    if(this.checkBoard.selectedChecker){
        this.checkBoard.selectedChecker._isSelected = false;
        this.checkBoard.selectedChecker = null;
    }

    this._isSelected = false;

    var fileName =
        'img/' + ( this.player === 1 ? 'white' : 'black' )
            + '-checker' + ( this.isQueen() ? '-queen' : '' )
            + ( this.isEnabled() ? '-enabled' : '' ) + '.png';

    this.realObj.attr({'src': fileName});
};

// Сделать дамкой
Checker.prototype.makeQueen = function(){

    this._isQueen = true;

    if(this.player === 1){
        this.realObj.attr({'src': 'img/white-checker-queen.png'});
    }
    else{
        this.realObj.attr({'src': 'img/black-checker-queen.png'});
    }
};

// Эта шашка не принадлежит текущему игроку
Checker.prototype.isEnabled = function(){
    return this._isEnabled;
};

// Эта шашка является выбранной
Checker.prototype.isSelected = function(){
    return this._isSelected;
};

// Является ли шашка дамкой
Checker.prototype.isQueen = function(){
    return this._isQueen;
};

// Эта шашка не принадлежит текущему игроку
Checker.prototype.isEnemy = function(){
    return this.player !== this.checkBoard.game.getCurrentPlayer().getId();
};

// Эта шашка убита
Checker.prototype.isKilled = function(){
    return this._isKilled;
};

// Эта шашка под ударом
Checker.prototype.isUnderAttack = function(pos){

    var cell = this.getCellByPos(this.cell, pos);

    if(cell && cell.hasChecker() === false) {
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

// Получить диагональ в зависимости от позиции
Checker.prototype.getDiagonalCellByPos = function(cellStart, pos){
    var cells = [];
    var cell = null;
    var cellsIds = [];

    switch(pos) {
        case 'TopLeft':
            cellsIds = cellStart.getAllCellIdsByDiagonalTopLeft();
            for(var i = 0; i < cellsIds.length; i++){
                cell = this.checkBoard.getCellById(cellsIds[i]);
                if(cell.hasChecker() && !cell.getChecker().isEnemy()){
                    break;
                }
                cells.push(cell);
            }
            break;
        case 'TopRight':
            cellsIds = cellStart.getAllCellIdsByDiagonalTopRight();
            for(var i = 0; i < cellsIds.length; i++){
                cell = this.checkBoard.getCellById(cellsIds[i]);
                if(cell.hasChecker() && !cell.getChecker().isEnemy()){
                    break;
                }
                cells.push(cell);
            }
            break;
        case 'BottomLeft':
            cellsIds = cellStart.getAllCellIdsByDiagonalBottomLeft();
            for(var i = 0; i < cellsIds.length; i++){
                cell = this.checkBoard.getCellById(cellsIds[i]);
                if(cell.hasChecker() && !cell.getChecker().isEnemy()){
                    break;
                }
                cells.push(cell);
            }
            break;
        case 'BottomRight':
            cellsIds = cellStart.getAllCellIdsByDiagonalBottomRight();
            for(var i = 0; i < cellsIds.length; i++){
                cell = this.checkBoard.getCellById(cellsIds[i]);
                if(cell.hasChecker() && !cell.getChecker().isEnemy()){
                    break;
                }
                cells.push(cell);
            }
            break;
        default:
            return null;
            break;
    }

    return cells;
};

// Убить шашку
Checker.prototype.kill = function(){
    this._isKilled = true;
    this.cell._checker = null;
    this.cell = null;
    this.realObj.hide();
};