import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './game.html';

Template.game.onRendered(function() {
    /**
     * Fichier "core.js"
     */
    var gameview = document.getElementById('gameView');
    stage = new createjs.Stage(gameview);
    createjs.Ticker.setFPS(60);

    stage.addChild(sol2);
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
        stage.update();
    }
});