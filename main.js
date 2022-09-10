document.addEventListener("DOMContentLoaded", () => {

  state.values = getCardValues()
  state.values = shuffleArray(state.values)

  document.querySelectorAll(".mem-card").forEach((e, index) => {
    e.addEventListener("click", () => {
      const cardValue = state.values[index]

      // verificar si es la tercera carta
      // quitar el timeout si existe, voltear las cartas hacia arriba
      // limpiar el estado y agregar la nueva carta
      if (state.pair.length >= 2) {
        if (state.timeOutId !== 0) {
          clearTimeout(state.timeOutId)
          state.timeOutId = 0
        }
        turnDownAllCard()
        state.pair = [cardValue]
        turnUpCard(e, index)
      } else {
        // si solo hay menos de 2 cartas hacia arriba, voltear la carta y
        // agregar a la pareja
        turnUpCard(e, index)
        state.pair.push(cardValue)
      }
      // si hay dos cartas comparar y realizar un timeout si son diferentes
      if (state.pair.length == 2) {
        if (state.pair[0] == state.pair[1]) {
          state.scoredValues.add(cardValue)
        } else {
          state.timeOutId = setTimeout(() => turnDownAllCard(), 2000)
        }
      }

      if (hasUserWin()) {
        console.log("win")
      }
    }) 
  })

})

const state = {
  timeOutId: 0,
  scoredValues: new Set(),
  pair: [],
  values: [],
}

const hasUserWin = () => {
  if (state.scoredValues === state.values / 2) return true
  else return false
}

const getCardValues = () => {
  const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  return values.concat(values)
}

/**
 * @param {Array<string>} arr
 */
const shuffleArray = (arr) => {
  const randomIdx = Math.floor(Math.random() * arr.length)
  for (let i = 0; i < arr.length; i++) {
    let tmp = arr[i];
    arr[i] = arr[randomIdx]
    arr[randomIdx] = tmp
  }
  return arr
}

const turnDownAllCard = () => {
  document.querySelectorAll(".mem-card").forEach((e) => {
    const cardValue = e.innerHTML
    if (!state.scoredValues.has(cardValue)) {
      turnDownCard(e)
    }
  })
}

/**
 * @param {HTMLDivElement} el
 */
const turnDownCard = (el) => {
  el.innerHTML = "🦆"
}

/**
 * @param {HTMLDivElement} el
 * @param {number} idx
 */
const turnUpCard = (el, idx) => {
  el.innerHTML = state.values[idx]
}


