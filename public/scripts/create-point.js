
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities() {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {

        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}
    document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta
//pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// .dataset.id = vai pegar os numeros que foram colocados no id no html - data-id="1" 
// function handleSelectedItem(event){
//     console.log(event.target.dataset.id)
// }

let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event){
    const itemLi = event.target

    //add ou remover uma classe no js - ele olha o elemento li, exite 'selecte: n , então vou add, se tem, tira. 
    itemLi.classList.toggle("selected")

    const itemId= itemLi.dataset.id 

    //verfificar se tem itens selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( function (item) {
        const itemFound = item == itemId  //resultado sera true ou false
        return itemFound
    })

    //se ja tiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( function(item) {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems= filteredItems

    } else{ 
    //se não tiver selecionado, add a seleção
        selectedItems.push(itemId)   
     }
    // atualizar o 'input hidden' com os dados  selecionados

    collectedItems.value= selectedItems
}