var J = extend(true, {}, J);

J.Level = {
    CurrentLevel: 0,
    Asteroids: [],
    Explosions: [],
    SmallAsteroids: [],

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
        var speedX = J.Utilities.RandomInt(-10, 10) / 10;
        var speedY = J.Utilities.RandomInt(-10, 10) / 10;
        var variation = J.Utilities.RandomInt(1, 3)
        var asteroid = new Asteroid(J.Utilities.DateToTicks(new Date()), x, y, rotation, variation, speedX, speedY);
        J.Level.Asteroids.push(asteroid);
    },

    AddSmallAsteroids: function (x, y) {
        var rotation = J.Utilities.RandomInt(0, 359);
        var speedX = J.Utilities.RandomInt(-10, 10) / 10;
        var speedY = J.Utilities.RandomInt(-10, 10) / 10;
        var variation = J.Utilities.RandomInt(1, 3);
        var asteroid = new Asteroid(J.Utilities.DateToTicks(new Date()), x, y, rotation, variation, speedX, speedY, "small");
        J.Level.SmallAsteroids.push(asteroid);
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
                for (var i = 0; i < 5; i++) {
                    setTimeout(function () { J.Level.AddSmallAsteroids(e.Left, e.Top) }, J.Utilities.RandomInt(0, 500));
                }
                document.getElementById(e.Id).remove();
                return false;
            } else {
                return true;
            }
        });
        J.Level.SmallAsteroids = J.Level.SmallAsteroids.filter(function (e) {
            if (e.Explode === true) {
                J.Level.AddExplosion(e.Left, e.Top, e.Rotation, e.SpeedX, e.SpeedY);
                document.getElementById(e.Id).remove();
                return false;
            } else {
                return true;
            }
        });

        J.Level.Asteroids.forEach(function (b) {
            J.Level.MoveAsteroid(b);
        });
        J.Level.SmallAsteroids.forEach(function (b) {
            J.Level.MoveAsteroid(b);
        });

        J.Level.MoveExplosionParticles();
    },

    MoveAsteroid: function (b) {
        var asteroidElement = document.getElementById(b.Id);
        b.Left += Math.cos((b.Rotation - 90) * Math.PI / 180) * b.SpeedX;
        b.Top += Math.sin((b.Rotation - 90) * Math.PI / 180) * b.SpeedY;
        //b.Left += b.XVel;
        //b.Top += b.YVel;

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
                J.Level.CheckAsteroidColision(x, bullet, i, J.Level.Asteroids);
            }
            for (var x = 0; x < J.Level.SmallAsteroids.length; x++) {
                //if (J.Level.SmallAsteroids[x].Id < J.Utilities.DateToTicks(new Date()) - 5000000) {
                J.Level.CheckAsteroidColision(x, bullet, i, J.Level.SmallAsteroids);
                //}
            }
        }
    },

    CheckAsteroidColision: function (x, bullet, i, arr) {
        var asteroidElement = document.getElementById(arr[x].Id);
        var asteroid = {
            width: asteroidElement.offsetWidth,
            height: asteroidElement.offsetHeight,
            x: arr[x].Left,
            y: arr[x].Top
        };
        if (J.Utilities.IsColliding(bullet, asteroid)) {
            // explode asteroid
            arr[x].Explode = true;
            // disappear bullet
            arr[i].Remove = true;
        }
    }
}




