const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const closer = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

closer.addEventListener("click", () => {
    modal.classList.add("hide")
})