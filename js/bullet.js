function Bullet(id, left, top, rotation, xVel, yVel) {
  this.Id = id;
  this.Left = left + 12;
  this.Top = top + 20;
  this.XVel = xVel;
  this.YVel = yVel;
  this.Rotation = rotation;
  this.Left += Math.cos((this.Rotation - 90) * Math.PI / 180) * 10;
  this.Top += Math.sin((this.Rotation - 90) * Math.PI / 180) * 10;
  var template = document.getElementById('bullet-template');
  var bulletElement = document.importNode(template.content, true);
  bulletElement.querySelector('bullet').setAttribute('id', this.Id);
  bulletElement.querySelector('bullet').style.left = this.Left + 'px';
  bulletElement.querySelector('bullet').style.top = this.Top + 'px';
  J.App.Element_GameBoard.appendChild(bulletElement);
}