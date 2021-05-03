var J = extend(true, {}, J);

J.Player = {
    Left: 380,
    Top: 200,
    Rotation: 0,
    XVel: 0,
    YVel: 0,
    Thrust: 0,
    Element: document.getElementById('player'),
    Bullets: [],

    UpdatePosition: function () {
        if (J.App.PressedKeys[38] === true) {
            // UP
            J.Player.Thrust = .1;
            J.Player.Element.classList.add("thrust");
            J.Utilities.ToggleClass(J.Player.Element, "thrust-fire");
        } else {
            J.Player.Thrust = 0;
            J.Player.Element.classList.remove("thrust");
            J.Player.Element.classList.remove("thrust-fire");
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
        if (J.App.PressedKeys[32] === true) {
            // SPAWN BULLET
            var bullet = new Bullet(J.Utilities.DateToTicks(new Date()), J.Player.Left, J.Player.Top, J.Player.Rotation, J.Player.XVel, J.Player.YVel);
            J.Player.Bullets.push(bullet);
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
    },

    Logged: false,

    DrawBullets: function () {
        J.Player.Bullets.forEach(function (b) {
            var bulletElement = document.getElementById(b.Id);
            b.XVel += Math.cos((b.Rotation - 90) * Math.PI / 180) * .5;
            b.YVel += Math.sin((b.Rotation - 90) * Math.PI / 180) * .5;
            b.Left += b.XVel;
            b.Top += b.YVel ;
            bulletElement.style.left = b.Left + 'px';
            bulletElement.style.top = b.Top + 'px';
        });
    }
}