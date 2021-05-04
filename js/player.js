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
    LastBulletFired: new Date(),

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
            if (J.Utilities.DateToTicks(J.Player.LastBulletFired) < J.Utilities.DateToTicks(new Date()) - 2000000) {
                J.Player.LastBulletFired = new Date();
                var bullet = new Bullet(J.Utilities.DateToTicks(new Date()), J.Player.Left, J.Player.Top, J.Player.Rotation, J.Player.XVel, J.Player.YVel);
                J.Player.Bullets.push(bullet);
            }
        }

        // calculate velocity
        J.Player.XVel += Math.cos((J.Player.Rotation - 90) * Math.PI / 180) * J.Player.Thrust;
        J.Player.YVel += Math.sin((J.Player.Rotation - 90) * Math.PI / 180) * J.Player.Thrust;

        // apply velocity
        J.Player.Left += J.Player.XVel;
        J.Player.Top += J.Player.YVel;

        // screen wrap
        if (J.Player.Left < 0)
            J.Player.Left += J.App.Width();
        if (J.Player.Left > J.App.Width())
            J.Player.Left -= J.App.Width();

        if (J.Player.Top < 0)
            J.Player.Top += J.App.Height();
        if (J.Player.Top > J.App.Height())
            J.Player.Top = 0;

        J.Player.Element.style.left = J.Player.Left + 'px';
        J.Player.Element.style.top = J.Player.Top + 'px';
        J.Player.Element.style.transform = 'rotate(' + J.Player.Rotation + 'deg)';
        J.Utilities.ToggleClass(J.Player.Element, "above");
    },

    Logged: false,

    DrawBullets: function () {
        // remove old bullets
        J.Player.Bullets = J.Player.Bullets.filter(function (e) { 
            if (e.Id < J.Utilities.DateToTicks(new Date()) - 5000000 || e.Remove === true) {
                document.getElementById(e.Id).remove();
                return false;
            } else {
                return true;
            }
        });

        // move bullets
        J.Player.Bullets.forEach(function (b) {
            var bulletElement = document.getElementById(b.Id);
            b.XVel += Math.cos((b.Rotation - 90) * Math.PI / 180) * .55;
            b.YVel += Math.sin((b.Rotation - 90) * Math.PI / 180) * .55;
            b.Left += b.XVel;
            b.Top += b.YVel;

            if (b.Left < 0)
                b.Left += J.App.Width();
            if (b.Left > J.App.Width())
                b.Left -= J.App.Width();

            if (b.Top < 0)
                b.Top += J.App.Height();
            if (b.Top > J.App.Height())
                b.Top = 0;

            bulletElement.style.left = b.Left + 'px';
            bulletElement.style.top = b.Top + 'px';
        });
    }
}