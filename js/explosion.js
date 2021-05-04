function Explosion(id, left, top, rotation, speedX, speedY) {
    this.Id = id;
    this.Left = left;
    this.Top = top;
    this.XVel = 0;
    this.YVel = 0;
    this.SpeedX = speedX;
    this.SpeedY = speedY;
    this.Rotation = rotation;
    var template = document.getElementById('particle-template');
    for (var i = 0; i < 25; i++) {
        var particleElement = document.importNode(template.content, true);
        particleElement.querySelector('particle').classList.add(this.Id);
        particleElement.querySelector('particle').style.left = this.Left + 'px';
        particleElement.querySelector('particle').style.top = this.Top + 'px';
        particleElement.querySelector('particle').setAttribute('data-rotation', i * 3.6);
        particleElement.querySelector('particle').setAttribute('data-speed', J.Utilities.RandomInt(100,500));
        J.App.Element_GameBoard.appendChild(particleElement);
    }
}