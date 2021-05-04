var J = extend(true, {}, J);

J.Level = {
    CurrentLevel: 0,
    Asteroids: [],
    Explosions: [],

    BeginLevel: function (number) {
        J.Level.CurrentLevel = number;

        for (var i = 0; i < 10 + J.Level.CurrentLevel; i++) {
            setTimeout(J.Level.AddAsteroid, J.Utilities.RandomInt(0, 2000));
        }
    },

    AddAsteroid: function () {
        var x = J.Utilities.RandomInt(0, J.App.Width());
        var y = J.Utilities.RandomInt(0, J.App.Height());
        var rotation = J.Utilities.RandomInt(0, 359);
        var speedX = J.Utilities.RandomInt(-10, 10) / 1000;
        var speedY = J.Utilities.RandomInt(-10, 10) / 1000;
        var variation = J.Utilities.RandomInt(1, 3)
        var asteroid = new Asteroid(J.Utilities.DateToTicks(new Date()), x, y, rotation, variation, speedX, speedY);
        J.Level.Asteroids.push(asteroid);
    },

    AddExplosion: function (x, y, rotation, speedX, speedY) {
        var explosion = new Explosion(J.Utilities.DateToTicks(new Date()), x, y, rotation, speedX, speedY);
        J.Level.Explosions.push(explosion);
    },

    MoveExplosionParticles: function () {
        // remove old particles
        J.Level.Explosions = J.Level.Explosions.filter(function (e) {
            if (e.Id < J.Utilities.DateToTicks(new Date()) - 5000000) {
                var particles = document.getElementsByClassName(e.Id);
                while (particles[0]) {
                    particles[0].parentNode.removeChild(particles[0]);
                }
                return false;
            } else {
                return true;
            }
        });

        J.Level.Explosions.forEach(function (b) {
            var particles = document.getElementsByClassName(b.Id);
            for (var i = 0; i < particles.length; i++) {
                var rotation = particles[i].getAttribute("data-rotation");
                var speed = particles[i].getAttribute("data-speed");
                var xVel = (Math.cos((rotation - 90) * Math.PI / 180) * b.SpeedX) * speed;
                var yVel = (Math.sin((rotation - 90) * Math.PI / 180) * b.SpeedY) * speed;
                var xPos = parseFloat(particles[i].style.left.replace('px', '')) + xVel;
                var yPos = parseFloat(particles[i].style.top.replace('px', '')) + yVel;
                particles[i].style.left = xPos + 'px';
                particles[i].style.top = yPos + 'px';
            }

        });
    },

    MoveAsteroids: function () {
        // explode asteroids
        J.Level.Asteroids = J.Level.Asteroids.filter(function (e) {
            if (e.Explode === true) {
                J.Level.AddExplosion(e.Left, e.Top, e.Rotation, e.SpeedX, e.SpeedY);
                document.getElementById(e.Id).remove();
                return false;
            } else {
                return true;
            }
        });

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

        J.Level.MoveExplosionParticles();
    },

    CheckCollisions: function () {
        // bullets / asteroids
        for (var i = 0; i < J.Player.Bullets.length; i++) {
            var bulletElement = document.getElementById(J.Player.Bullets[i].Id);
            var bullet = {
                width: bulletElement.offsetWidth,
                height: bulletElement.offsetHeight,
                x: J.Player.Bullets[i].Left,
                y: J.Player.Bullets[i].Top
            }
            for (var x = 0; x < J.Level.Asteroids.length; x++) {
                var asteroidElement = document.getElementById(J.Level.Asteroids[x].Id);
                var asteroid = {
                    width: asteroidElement.offsetWidth,
                    height: asteroidElement.offsetHeight,
                    x: J.Level.Asteroids[x].Left,
                    y: J.Level.Asteroids[x].Top
                }
                if (J.Utilities.IsColliding(bullet, asteroid)) {
                    // explode asteroid
                    J.Level.Asteroids[x].Explode = true;
                    // disappear bullet
                    J.Player.Bullets[i].Remove = true;
                }
            }
        }
    }
}