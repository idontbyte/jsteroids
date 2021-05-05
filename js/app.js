var J = extend(true, {}, J);

J.App = {
    PressedKeys: [],
    Element_GameBoard: document.getElementById("gameboard"),
    Width: function () { return J.App.Element_GameBoard.clientWidth },
    Height: function () { return J.App.Element_GameBoard.clientHeight },
    Element_Score: document.getElementById("score"),
    Element_Start: document.getElementById("start"),
    Element_Level: document.getElementById("level"),

    Score: 0,

    ClientLoop: function () {
        J.Player.UpdatePosition();
        J.Player.DrawBullets();
        J.Level.MoveAsteroids();
        J.Level.CheckCollisions();
        J.App.UpdateScore();
        J.Level.CheckStart();
        J.Level.CheckEnd();
    },

    SetupControls: function () {
        window.onkeyup = function (e) { J.App.PressedKeys[e.keyCode] = false; }
        window.onkeydown = function (e) { J.App.PressedKeys[e.keyCode] = true; }
    },

    UpdateScore: function () {
        J.App.Element_Score.innerHTML = J.App.Score;
        J.App.Element_Level.innerHTML = J.Level.CurrentLevel;
    },

    Init: function () {
        J.App.SetupControls();
        setInterval(J.App.ClientLoop, 10);
        J.Level.BeginLevel(1);
    }
};

J.App.Init();