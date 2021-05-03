var J = extend(true, {}, J);

J.Player = {
    Left: 380,
    Top: 200,
    Rotation: 0,
    XVel: 0,
    YVel: 0,
    Thrust: 0,
    Element: document.getElementById('player'),

    UpdatePosition: function () {
        if (J.App.PressedKeys[38] === true) {
            // UP
            J.Player.Thrust = .1;
            J.Player.Element.classList.add("thrust");
        } else {
            J.Player.Thrust = 0;
            J.Player.Element.classList.remove("thrust");
        }
        if (J.App.PressedKeys[40] === true) {
            // DOWN
        }
        if (J.App.PressedKeys[37] === true) {
            // LEFT
            J.Player.Rotation += -2;
        }
        if (J.App.PressedKeys[39] === true) {
            // RIGHT
            J.Player.Rotation += 2;
        }

        // calculate velocity
        J.Player.XVel += Math.cos((J.Player.Rotation - 90) * Math.PI / 180) * J.Player.Thrust;
        J.Player.YVel += Math.sin((J.Player.Rotation - 90) * Math.PI / 180) * J.Player.Thrust;

        // apply velocity
        J.Player.Left += J.Player.XVel;
        J.Player.Top += J.Player.YVel;

        // screen wrap
        if (J.Player.Left < 0)
            J.Player.Left += 800;
        if (J.Player.Left > 800)
            J.Player.Left -= 800;

        if (J.Player.Top < 0)
            J.Player.Top += 450;
        if (J.Player.Top > 450)
            J.Player.Top = 0;

        J.Player.Element.style.left = J.Player.Left + 'px';
        J.Player.Element.style.top = J.Player.Top + 'px';
        J.Player.Element.style.transform = 'rotate(' + J.Player.Rotation + 'deg)';

    }
}