function Asteroid(id, left, top, rotation, variation, speedX, speedY, cls) {
    this.Id = id;
    this.Left = left;
    this.Top = top;
    this.XVel = 0;
    this.YVel = 0;
    this.SpeedX = speedX;
    this.SpeedY = speedY;
    this.Explode = false;
    this.Remove = false;
    this.Rotation = rotation;
    this.Left += Math.cos((this.Rotation - 90) * Math.PI / 180) * 10;
    this.Top += Math.sin((this.Rotation - 90) * Math.PI / 180) * 10;
    var template = document.getElementById('asteroid-' + variation + '-template');
    var asteroidElement = document.importNode(template.content, true);
    asteroidElement.querySelector('asteroid').setAttribute('id', this.Id);
    asteroidElement.querySelector('asteroid').style.left = this.Left + 'px';
    asteroidElement.querySelector('asteroid').style.top = this.Top + 'px';
    asteroidElement.querySelector('asteroid').classList.add(cls);
    J.App.Element_GameBoard.appendChild(asteroidElement);
  }