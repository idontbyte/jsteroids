var J = extend(true, {}, J);

J.App = {
    PressedKeys: [],
    Element_GameBoard: document.getElementById("gameboard"),
    Width: function() { return J.App.Element_GameBoard.clientWidth },
    Height: function() { return J.App.Element_GameBoard.clientHeight },

    ClientLoop: function () {
        J.Player.UpdatePosition();
        J.Player.DrawBullets();
        J.Level.MoveAsteroids();
        J.Level.CheckCollisions();
    },

    SetupControls: function () {
        window.onkeyup = function (e) { J.App.PressedKeys[e.keyCode] = false; }
        window.onkeydown = function (e) { J.App.PressedKeys[e.keyCode] = true; }
    },

    Init: function () {
        J.App.SetupControls();
        setInterval(J.App.ClientLoop, 10);
        J.Level.BeginLevel(1);
    }
};

J.App.Init();