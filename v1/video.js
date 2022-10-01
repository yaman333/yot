// ================================================================================================================ //
// création des const
// ================================================================================================================ //
const lecteur = document.querySelector('#lecteur') // stock lecteur
const btnPlay = document.querySelector('#btnPlay') // stock bouton play
const btnStop = document.querySelector('#btnStop') // stock bouton stop
const dureeVideo = lecteur.duration // stock la durée de la vidéo, la propiété lecteur.duration est fourni
const barreRecherche = document.querySelector('#barreRecherche') // stock la barre de recherche
const btnPleinEcran = document.querySelector('#btnPleinEcran') // stock le plein écran

// ================================================================================================================ //
// création des events
// ================================================================================================================ //
btnPlay.addEventListener('click', playVideo) // l' event click sur le bouton play appel la fonction playVideo
btnStop.addEventListener('click', stopVideo)
btnPleinEcran.addEventListener('click', pleinEcran)

lecteur.addEventListener('durationchange', reglageBarreRecherche)
lecteur.addEventListener('canplay', reglageLecteur)
lecteur.addEventListener('ended', clean)

barreRecherche.addEventListener('change', chercherVideo)
barreRecherche.addEventListener('timeupdate', majUI)

// ================================================================================================================ //
// création des fonctions
// ================================================================================================================ //
// s' assure que le lecteur est près à jouer
function reglageLecteur () {
  reglageBarreRecherche() // appel la méthode qui permet de définir la valeur max de la durée de la vidéo
  lecteur.volume = 0.5 // baisse le volume
}

// affiche play si la vidéo est terminé
function clean () {
  if (lecteur.paused) {
    btnPlay.innerText = 'play'
  }
}

// défini la durée maximum de la barre de recherche
function reglageBarreRecherche () {
  console.log('durationchange')
  barreRecherche.max = lecteur.duration
}

// permet d' avancer la vidéo à partir de la barre de recherche
function chercherVideo () {
  lecteur.currentTime = barreRecherche.value
}

// met à jour la barre de recherche
function majUI () {
  barreRecherche.value = dureeVideo.currentTime
}

// réagit au click sur le bouton play
function playVideo (evt) {
  if (lecteur.paused) {
    lecteur.play() // lecteur.play() fourni
    btnPlay.innerText = 'pause'
    barreRecherche.value = lecteur.currentTime
  } else {
    lecteur.pause() // lecteur.pause() fourni
    btnPlay.innerText = 'play'
  }
}

// réagit au click sur le bouton stop
function stopVideo (evt) {
  lecteur.currentTime = 0 // remet le lecteur à 0
  barreRecherche.value = lecteur.currentTime // remet la barre de recherche à 0
}

// // fonction plein écran
function pleinEcran (evt) {
  if (lecteur.requestFullscreen) {
    lecteur.requestFullscreen()
  } else if (lecteur.mozRequestFullScreen) {
    lecteur.mozRequestFullScreen()
  } else if (lecteur.webkitRequestFullscreen) {
    lecteur.webkitRequestFullscreen()
  }
}
