var J = extend(true, {}, J);

J.App = {
    AsteroidPosition: 0,
    AsteroidDirection: 1,
    PressedKeys: [],
    Element_GameBoard: document.getElementById("gameboard"),
    Width: function() { return J.App.Element_GameBoard.clientWidth },
    Height: function() { return J.App.Element_GameBoard.clientHeight },

    ClientLoop: function () {
        J.App.AsteroidPosition += J.App.AsteroidDirection;
        if (J.App.AsteroidPosition > J.App.Width() - 1)
            J.App.AsteroidDirection = -1;
        if (J.App.AsteroidPosition < 1)
            J.App.AsteroidDirection = 1;

        document.getElementsByClassName('asteroid')[0].style.left = J.App.AsteroidPosition + 'px';

        J.Player.UpdatePosition();
        J.Player.DrawBullets();
    },

    SetupControls: function () {
        window.onkeyup = function (e) { J.App.PressedKeys[e.keyCode] = false; }
        window.onkeydown = function (e) { J.App.PressedKeys[e.keyCode] = true; }
    },

    Init: function () {
        J.App.SetupControls();
        setInterval(J.App.ClientLoop, 10);
    }
};

J.App.Init();