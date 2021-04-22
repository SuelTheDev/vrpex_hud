let speed = 0;
let tacho = 0;
let gas = 0;
let mileage = 0;

let turnSignalsStates = {
  left: true,
  right: true,
};

let iconsStates = {
  // main circle
  dippedBeam: 1,
  brake: 1,
  drift: 1,
  highBeam: 1,
  lock: 1,
  seatBelt: 1,
  engineTemp: 2,
  stab: 1,
  abs: 1,
  // right circle
  gas: 2,
  trunk: 1,
  bonnet: 1,
  doors: 1,
  // left circle
  battery: 2,
  oil: 2,
  engineFail: 2,
};

$(() => {
  window.addEventListener("message", (ev) => {
    let data = ev.data;
    if (data) {
      if (data.HUD && data.HUD.show === true) {
        const hud = data.HUD;
        atualizarVida(hud.vida);
        atualizarColete(hud.colete);
        atualizarEstamina(hud.estamina);
        atualizarFome(hud.fome);
        atualizarSede(hud.sede);
        atualizarHorario(hud.horario);
        atualizarMic(hud.mic_status);
        atualizarRadio(hud.radio_status);
      }

      if (data.VEH && data.VEH.show === true) {
        const speedometer = data.VEH;
        mostraVelocimetro(true);
        atualizarVelocidade(speedometer.velocidade)
        atualizarCombustivel(speedometer.gasolina)
        atualizatMachas(speedometer.macha_atual, speedometer.macha_maxima)
      } else if (data.VEH && data.VEH.show === false) {
        mostraVelocimetro(false);
      }
    }
  });
});

const atualizarVida = (vida) => {
  const n = (vida / 100) * 64;
  $(".display-vida").css("width", `${n}px`);
  $(".display-vida").css("height", `${n}px`);
};

const atualizarColete = (colete) => {
  const n = (colete / 100) * 64;
  $(".display-colete").css("width", `${n}px`);
  $(".display-colete").css("height", `${n}px`);
};

const atualizarEstamina = (estamina) => {
  const n = 64 - (estamina / 100) * 64;
  $(".display-estamina").css("width", `${n}px`);
  $(".display-estamina").css("height", `${n}px`);
};

const atualizarFome = (fome) => {
  const n = (fome / 100) * 64;
  $(".display-fome").css("width", `${n}px`);
  $(".display-fome").css("height", `${n}px`);
};

const atualizarSede = (sede) => {
  const n = (sede / 100) * 64;
  $(".display-sede").css("width", `${n}px`);
  $(".display-sede").css("height", `${n}px`);
};

const atualizarHorario = (horario) => {
  let horas = horario.horas < 10 ? `0${horario.horas}` : horario.horas;
  let minutos = horario.minutos < 10 ? `0${horario.minutos}` : horario.minutos;
  $(".clock-container span").text(`${horas}:${minutos}`);
};
const atualizarMic = (mic_status) => {
  switch (mic_status) {
    case 0:
      $(".fa-microphone").addClass("mic-normal");
      $(".fa-microphone").removeClass("mic-gritando");
      $(".fa-microphone").removeClass("mic-gritando");
      break;
    case 1:
      $(".fa-microphone").removeClass("mic-normal");
      $(".fa-microphone").addClass("mic-gritando");
      $(".fa-microphone").removeClass("mic-gritando");
      break;
    case 2:
      $(".fa-microphone").removeClass("mic-normal");
      $(".fa-microphone").removeClass("mic-gritando");
      $(".fa-microphone").addClass("mic-gritando");
      break;
  }
};
const atualizarRadio = (radio_status) => {};

function redraw() {
  draw(speed, tacho, gas, mileage, turnSignalsStates, iconsStates);
}


//VELOCIMETRO

const mostraVelocimetro = (v) => {
    v ? (() => {$('#speedometer').css('display', 'block'); redraw()})() : (() => {$('#speedometer').css('display', 'none')})();
}

const atualizarVelocidade = (velocidade) => {
  speed = velocidade / 350
  if (speed > 1.0){
    speed = 1.1
  }
}

const atualizarCombustivel = (combustivel) => {
  gas = combustivel / 100
}

const atualizatMachas = ( machaAtual ) => {
  tacho = machaAtual  
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
