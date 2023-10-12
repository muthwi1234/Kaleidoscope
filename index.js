const canvas = document.getElementById('kaleidoscope');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const slices = 12;
const angle = (2 * Math.PI) / slices;
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

let isDrawing = false;

canvas.addEventListener('mousedown', () => {
  isDrawing = true;
  ctx.beginPath();
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.closePath();
  ctx.globalAlpha = 0.5;
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!isDrawing) return;

  for (let i = 0; i < slices; i++) {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;
    const newX = canvas.width - x;
    const newY = canvas.height - y;

    ctx.fillStyle = colors[i % colors.length];
    ctx.strokeStyle = colors[i % colors.length];

    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    ctx.stroke();

    ctx.moveTo(y, x);
    ctx.lineTo(newY, newX);
    ctx.stroke();

    ctx.rotate(angle);
  }
}
