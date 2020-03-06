class User {
  constructor() {
    this.img = document.createElement("img");
    this.img.src = "assets/images/dinosaur.svg";
    this.img.style.position = "absolute";
    this.img.style.width = "300px";
    this.img.style.height = "200px";
    this.x = 0;
    this.y = 0;
  }

  getImg() {
    // this.img.setAttribute('style', `position: absolute; top: ${this.y}px; left: ${this.x}px;`);
    this.img.style.top = `${this.y}px`;
    this.img.style.left = `${this.x}px`;
    console.log(`this.x = ${this.x}`);
    return this.img;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  move(x, y) {
    const nextX = this.x + x * 30 + parseInt(this.img.style.width);
    const nextY = this.y + y * 30 + parseInt(this.img.style.height);
    cs(nextX);

    if (nextX < window.innerWidth && nextX >= parseInt(this.img.style.width)) {
      this.x += x * 30;
    }
    if (
      nextY < window.innerHeight &&
      nextY >= parseInt(this.img.style.height)
    ) {
      this.y += y * 30;
    }
    cs(nextY);
    cs(document.body.clientHeight);
  }
}
function cs(test) {
  const debug = document.getElementById("debug");
  debug.textContent = JSON.stringify(`this.test= ${test}`);
  console.log(test);
}

class Game {
  constructor() {
    this.character = new User();

    this.renderUser(this.character, 0, 0);
  }

  register() {
    const that = this;
    window.addEventListener("keydown", function(e) {
      that.moveEvent(e);
    });

    window.addEventListener(
      "touchstart",
      function(e) {
        that.handleStart(e);
      },
      false
    );
    // window.addEventListener("touchend", that.handleEnd, false);
    // window.addEventListener("touchcancel", that.handleCancel, false);
    // window.addEventListener("touchmove", that.handleMove, false);
  }

  renderUser(user, x, y) {
    const canvas = document.querySelector("body");
    user.move(x, y);
    const userImg = user.getImg();

    if (canvas.contains(userImg)) {
      console.log(`re render`);
      canvas.removeChild(userImg);
      canvas.appendChild(userImg);
    } else {
      console.log(`init render`);
      canvas.appendChild(userImg);
    }
  }

  handleStart(evt) {
    // evt.preventDefault();
    const touches = evt.changedTouches;
    const user = this.character;
    cs(touches);
    if (touches[0].pageX > user.getX()) {
      this.renderUser(user, 1, 0);
    }

    if (touches[0].pageX < user.getX()) {
      this.renderUser(user, -1, 0);
    }

    if (touches[0].pageY > user.getY()) {
      this.renderUser(user, 0, 1);
    }

    if (touches[0].pageY < user.getY()) {
      this.renderUser(user, 0, -1);
    }
  }

  moveEvent(e) {
    console.log(this.name);

    switch (e.keyCode) {
      case 37:
        this.renderUser(this.character, -1, 0);
        // some code here...
        break;
      case 38:
        this.renderUser(this.character, 0, -1);
        // some code here...
        break;
      case 39:
        this.renderUser(this.character, 1, 0);
        // some code here...
        break;
      case 40:
        this.renderUser(this.character, 0, 1);
        // some code here...
        break;
    }
  }
}

const game = new Game();
game.register();
