var sol = new createjs.Graphics();
var offsetX = 512;
var offsetY = 200;
sol.setStrokeStyle(5);
sol.beginStroke("#0FFFF0");
sol.beginFill("red");
sol.drawCircle(offsetX,offsetY,30);
sol2 = new createjs.Shape(sol);
sol2.shadow = new createjs.Shadow("#FFFFFF", 10, 10, 100);