// Класс ТАБЛО
var TableBoard = function(){ };

// Получить контейнер с текущим игроком
TableBoard.prototype.getTableBoardPlayer = function(){
    return $('#player');
};

// Записать сообщение в контейнер с игроком
TableBoard.prototype.writeOnTableBoardPlayer = function(text){
    this.getTableBoardPlayer().html(text);
};

// Получить контейнер с номером раунда
TableBoard.prototype.getTableBoardRound = function(){
    return $('#round');
};

// Записать сообщение в контейнер с ранудом
TableBoard.prototype.writeOnTableBoardRound = function(text){
    this.getTableBoardRound().html(text);
};

// Получить контейнер с победителем
TableBoard.prototype.getTableBoardWinner = function(){
    return $('#winner');
};

// Записать сообщение в контейнер с победителем
TableBoard.prototype.writeOnTableBoardWinner = function(text){
    this.getTableBoardWinner().html(text).show();
};

// Получить контейнер с кнопкой
TableBoard.prototype.getStartButton = function(){
    return $('#start-button');
};