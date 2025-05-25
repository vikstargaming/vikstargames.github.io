const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 100, y: 200, w: 30, h: 30, speed: 4 };
const ai = { x: 700, y: 200, w: 30, h: 30, speed: 2 };
const ball = { x: 400, y: 200, radius: 12, dx: 2, dy: 2 };

const keys = {};
let scorePlayer = 0;
let scoreAI = 0;

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function drawPlayer(obj, color) {
  ctx.fillStyle = color;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function resetBall() {
  ball.x = 400;
  ball.y = 200;
  ball.dx = 2 * (Math.random() < 0.5 ? 1 : -1);
  ball.dy = 2 * (Math.random() < 0.5 ? 1 : -1);
}

function update() {
  // Player Movement
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;

  // Keep player in bounds
  player.x = Math.max(0, Math.min(player.x, canvas.width - player.w));
  player.y = Math.max(0, Math.min(player.y, canvas.height - player.h));

  // AI follows ball
  if (ball.y < ai.y) ai.y -= ai.speed;
  if (ball.y > ai.y + ai.h) ai.y += ai.speed;

  // Ball movement
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off top/bottom
  if (ball.y < 0 || ball.y > canvas.height) ball.dy *= -1;

  // Collide with players
  [player, ai].forEach(p => {
    if (
      ball.x > p.x && ball.x < p.x + p.w &&
      ball.y > p.y && ball.y < p.y + p.h
    ) {
      ball.dx *= -1.2;
    }
  });

  // Score
  if (ball.x < 0) {
    scoreAI++;
    resetBall();
  }
  if (ball.x > canvas.width) {
    scorePlayer++;
    resetBall();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillText(`Player: ${scorePlayer} | AI: ${scoreAI}`, 350, 20);

  drawPlayer(player, "blue");
  drawPlayer(ai, "red");
  drawBall();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
