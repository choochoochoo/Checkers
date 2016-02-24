// Класс ТАБЛО
var TableBoard = function(){
    // Получить контейнер с текущим игроком
    this.getTableBoardPlayer = function(){
        return $('#player');
    };

    // Записать сообщение в контейнер с игроком
    this.writeOnTableBoardPlayer = function(text){
        this.getTableBoardPlayer().html(text);
    };

    // Получить контейнер с номером раунда
    this.getTableBoardRound = function(){
        return $('#round');
    };

    // Записать сообщение в контейнер с ранудом
    this.writeOnTableBoardRound = function(text){
        this.getTableBoardRound().html(text);
    };
};