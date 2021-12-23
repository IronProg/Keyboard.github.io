// Variáveis
let nAleatorio = 0
let tempAtual = 45
let pontos = 0
let btCimAtiva = 0
let btEsqAtiva = 0
let btBaiAtiva = 0
let btDirAtiva = 0
let recorde = localStorage.getItem("Recorde")

//Rastrear elementos HTML
const btCim = document.getElementById("btCim")
const btEsq = document.getElementById("btEsq")
const btBai = document.getElementById("btBai")
const btDir = document.getElementById("btDir")
const btReset = document.getElementById("btReset")

let btJogar = document.getElementById("btJogar")
let btTuto = document.getElementById("btTuto")
let expTitulo = document.getElementById("expTitulo")
let expCorpo = document.getElementById("expCorpo")
let displayTemporizador = document.getElementById("pTempo")
let displayPonto = document.getElementById("pPonto")
let cardRecorde = document.getElementById("cardRecorde")
let valRecorde = document.getElementById("valRecorde")

let mensagem = document.getElementById("mensagem")

//Manipular elementos HTML em JS
//Botões
//Botão Jogar
btJogar.addEventListener("click", () => {
    expTitulo.style.display = "none"
    expCorpo.style.display = "none"
    btJogar.disabled = true
    btTuto.disabled = true
    mensagem.innerText = ""
    tempAtual = 45
    pontos = 0
    displayPonto.innerText = 0
    displayTemporizador.innerText = tempAtual
    cardRecorde.style.display = "none"
    recorde = localStorage.getItem("Recorde")
    setTimeout(() => {
        escolherTecla()
        funcTempo()
    }, 3000);
})

btTuto.addEventListener("click", () => {
    expTitulo.style.display = "block"
    expCorpo.style.display = "block"
    mensagem.innerText = ""
})

btCim.addEventListener("click", () => {
    cliqueCim()
})
btEsq.addEventListener("click", () => {
    cliqueEsq()
})
btBai.addEventListener("click", () => {
    cliqueBai()
})
btDir.addEventListener("click", () => {
    cliqueDir()
})

//Botão para reiniciar o recorde
btReset.addEventListener("click", () => {
    recorde = 0
    valRecorde.innerText = 0
    localStorage.setItem("Recorde", 0)
})

//Funções
//Função que recebe um número, acecnde uma tecla e a ativa
function ativarTecla(lado, id) {
    lado.style.filter = "brightness(5000%)"
    if (id == 1) {
        btCimAtiva = 1
    } else if (id == 2) {
        btEsqAtiva = 1
    } else if (id == 3) {
        btBaiAtiva = 1
    } else if (id == 4) {
        btDirAtiva = 1
    }
}

//Função para desativar teclas clicadas
function desativarTecla(lado, id) {
    lado.style.filter = "brightness(0%)"
    if (id == 1) {
        btCimAtiva = false
    } else if (id == 2) {
        btEsqAtiva = false
    } else if (id == 3) {
        btBaiAtiva = false
    } else if (id == 4) {
        btDirAtiva = false
    }
}

//Função que gera um número aleatório entre 1 e 4 e encaminha para função ativarTecla
function escolherTecla() {
    nAleatorio = Math.ceil(Math.random()*4)
    if (nAleatorio == 1) {
        ativarTecla(btCim, 1)
    } else if (nAleatorio == 2) {
        ativarTecla(btEsq, 2)
    } else if (nAleatorio == 3) {
        ativarTecla(btBai, 3)
    } else if (nAleatorio == 4) {
        ativarTecla(btDir, 4)
    }
}

//Função chamada ao final da contagem para encerrar o jogo e desativar todos botões
function perderJogo() {
    mensagem.innerText = "Jogo finalizado!"
    btJogar.disabled = false
    btTuto.disabled = false
    btCimAtiva = 0
    btEsqAtiva = 0
    btBaiAtiva = 0
    btDirAtiva = 0
    btCim.style.filter = "brightness(0%)"
    btEsq.style.filter = "brightness(0%)"
    btBai.style.filter = "brightness(0%)"
    btDir.style.filter = "brightness(0%)"
    cardRecorde.style.display = "block"
    if (recorde < pontos) {
        recorde = pontos
        valRecorde.innerText = pontos
        localStorage.setItem("Recorde", pontos)
    }
}

//Função de tick para temporizador ser atualizado, no mínimo, uma vez por segundo
function funcTempo() {
    const temporizador = setInterval(() => {
        tempAtual--
        displayTemporizador.innerText = tempAtual
        if (tempAtual <= 0) {
            tempAtual = 0
            clearInterval(temporizador)
            perderJogo()
        }
    }, 1000)
}

//Funções que liga os cliques e as teclas aos botões HTML
function cliqueCim() {
    if (btCimAtiva == 1) {
        btCimAtiva = 0
        pontos++
        displayPonto.innerText = pontos
        desativarTecla(btCim)
        escolherTecla()
    } else {
        tempAtual--
        displayTemporizador.innerText = tempAtual
        if (tempAtual <= 0) {
            tempAtual = 0
            perderJogo()
            
        }
    }
}

function cliqueEsq() {
    if (btEsqAtiva == 1) {
        btEsqAtiva = 0
        pontos++
        displayPonto.innerText = pontos
        desativarTecla(btEsq)
        escolherTecla()
    } else {
        tempAtual--
        displayTemporizador.innerText = tempAtual
        if (tempAtual <= 0) {
            tempAtual = 0
            perderJogo()
        }
    }
}

function cliqueBai() {
    if (btBaiAtiva == 1) {
        btBaiAtiva = 0
        pontos++
        displayPonto.innerText = pontos
        desativarTecla(btBai)
        escolherTecla()
    } else {
        tempAtual--
        displayTemporizador.innerText = tempAtual
        if (tempAtual <= 0) {
            tempAtual = 0
            perderJogo()
        }
    }
}

function cliqueDir() {
    if (btDirAtiva == 1) {
        btDirAtiva = 0
        pontos++
        displayPonto.innerText = pontos
        desativarTecla(btDir)
        escolherTecla()
    } else {
        tempAtual--
        displayTemporizador.innerText = tempAtual
        if (tempAtual <= 0) {
            tempAtual = 0
            perderJogo()
        }
    }
}


//Evento que é chamado ao pressionar uma das setas do teclado, ligando-as aos botões HTML
document.addEventListener("keydown", function(Event) {
    if (Event.key == 'ArrowUp') {
        cliqueCim()
    } else if (Event.key == 'ArrowLeft') {
        cliqueEsq()
    } else if (Event.key == 'ArrowDown') {
        cliqueBai()
    } else if (Event.key == 'ArrowRight') {
        cliqueDir()
    }
})

if (localStorage.getItem("Recorde") == null) {
    localStorage.setItem("Recorde", 0)
}

valRecorde.innerText = recorde