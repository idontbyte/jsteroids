var J = extend(true, {}, J);

J.Level = {
    CurrentLevel: 0,
    Asteroids: [],

    BeginLevel: function (number) {
        J.Level.CurrentLevel = number;

        for (var i = 0; i < 10 + J.Level.CurrentLevel; i++) {
            setTimeout(J.Level.AddAsteroid,J.Utilities.RandomInt(0,2000));
        }
    },

    AddAsteroid: function() {
        var x = J.Utilities.RandomInt(0, J.App.Width());
        var y = J.Utilities.RandomInt(0, J.App.Height());
        var rotation = J.Utilities.RandomInt(0,359);
        var speedX = J.Utilities.RandomInt(-10,10) / 1000;
        var speedY = J.Utilities.RandomInt(-10,10) / 1000;
        var variation = J.Utilities.RandomInt(1,3)
        var asteroid = new Asteroid(J.Utilities.DateToTicks(new Date()), x, y, rotation, variation, speedX, speedY);
        J.Level.Asteroids.push(asteroid);
    },

    MoveAsteroids: function () {
        J.Level.Asteroids.forEach(function (b) {
            var asteroidElement = document.getElementById(b.Id);
            b.XVel += Math.cos((b.Rotation - 90) * Math.PI / 180) * b.SpeedX;
            b.YVel += Math.sin((b.Rotation - 90) * Math.PI / 180) * b.SpeedY;
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

            asteroidElement.style.left = b.Left + 'px';
            asteroidElement.style.top = b.Top + 'px';
        });
    }
}