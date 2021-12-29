const promoCardElement = document.querySelector(".promo-card");
const promoBoxElement = document.querySelector(".promo-box");
const allPromoButtonElemenent = document.querySelector("#allPromotions");
const newCustomersPromoButtonElement = document.querySelector("#newPromotions")
const isOnlyNewCostumers = false;
const allPromo = [];
const newPromoNames = [];

const filterNewPromos = () => {
    const promoCardsArr = Array.from(document.getElementsByClassName("promo-card"));
    promoCardsArr.map((card) => {
        if(!newPromoNames.includes(card.id)){
            card.classList.add("invisible");
        } else {
            // DO NOTHING!
        }
    })
}

const filterAllPromos = () => {
    const cardsArr = Array.from(document.getElementsByClassName("promo-card"));
    cardsArr.forEach((current) => {
        current.classList.remove("invisible");
    })
}

const organizePromos = (data) => {
    // For every promo in the data check to see if it's only
    data.map((promo) => {
        allPromo.push(promo); // add every promo here
        if(promo.onlyNewCustomers === true) {
            newPromoNames.push(promo.name);
        }
    })    
}

const addDataToPage = (data) => {
    data.map((promo) => {
        // Clone the example node
        const newPromoElement = promoCardElement.cloneNode(true);
        newPromoElement.setAttribute("id", promo.name);
        // Delete the example node
        promoCardElement.remove();
        const imgElement = newPromoElement.children[0].children[0];
        const titleElement = newPromoElement.children[1].children[0];
        const descElement = newPromoElement.children[1].children[1];

        imgElement.setAttribute("src", promo.heroImageUrl);
        titleElement.innerText = promo.name;
        descElement.innerText = promo.description;

        promoBoxElement.append(newPromoElement);
    });
}

/* Fetch the data: */
fetch("http://www.mocky.io/v2/5bc3b9cc30000012007586b7")
    .then((res) => res.json())
    .then((data) => {
        organizePromos(data);
        addDataToPage(data);
        console.log(data);
    })
    .catch((err) => console.log(err))

    allPromoButtonElemenent.addEventListener("click", filterAllPromos);
    newCustomersPromoButtonElement.addEventListener("click", filterNewPromos);