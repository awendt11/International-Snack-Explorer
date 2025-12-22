const params = new URLSearchParams(window.location.search); 
const country = params.get("country");

const countryTitle = document.getElementById("country-title");
const resultsContainer = document.getElementById("results-container");

if (!country) {
    countryTitle.textContent = "No country selected.";
    resultsContainer.innerHTML = "<p>Please return to the Home page and select a country.</p>";
    throw new Error("No country provided in URL.");
}

countryTitle.textContent = `Top Snacks in ${country.replace("_", " ").toUpperCase()}`;

async function loadSnacks() {
    const url = `https://world.openfoodfacts.org/api/v2/search?countries_tags=${country}&categories_tags=foods&sort_by=unique_scans_n&fields=product_name,brands,unique_scans_n,image_front_small_url,allergens_tags,ingredients_analysis_tags&page_size=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (!data.products || data.products.length === 0) {
            resultsContainer.innerHTML = "<p>No results found for this country.</p>";
            return;
        }

        displaySnacks(data.products);
        buildChart(data.products);        
        buildSlider(data.products);       

    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = "<p>Error loading data. Please try again later.</p>";
    }
}

function displaySnacks(snacks) {
    resultsContainer.innerHTML = "";

    snacks.forEach((snack, index) => {
        const name = snack.product_name || "Unknown product name";
        const brand = snack.brands || "Unknown brand";
        const image = snack.image_front_small_url || "https://via.placeholder.com/150";
        const scans = snack.unique_scans_n || 0;

        const allergens = snack.allergens_tags?.length
            ? snack.allergens_tags.join(", ").replaceAll("en:", "")
            : "None listed";

        const dietary = snack.ingredients_analysis_tags?.length
            ? snack.ingredients_analysis_tags.join(", ").replaceAll("en:", "")
            : "No data";

        const card = document.createElement("div");
        card.classList.add("snack-card");

        card.innerHTML = `
            <h3>${index + 1}. ${name}</h3>
            <img src="${image}" alt="${name}">
            <p><strong>Brand:</strong> ${brand}</p>
            <p><strong>Popularity (scans):</strong> ${scans}</p>
            <p><strong>Allergens:</strong> ${allergens}</p>
            <p><strong>Dietary Info:</strong> ${dietary}</p>
        `;

        resultsContainer.appendChild(card);
    });
}

function buildChart(snacks) {
    const labels = snacks.map(s => s.product_name || "Unknown");
    const scanCounts = snacks.map(s => s.unique_scans_n || 0);

    const ctx = document.getElementById("popularityChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Popularity (barcode scans)",
                data: scanCounts,
                backgroundColor: "rgba(153, 102, 255, 0.6)"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function buildSlider(snacks) {
    const sliderTrack = document.querySelector(".glider-track");
    sliderTrack.innerHTML = "";

    snacks.forEach(snack => {
        const img = snack.image_front_small_url || "https://via.placeholder.com/150";
        const slide = document.createElement("div");
        slide.innerHTML = `<img src="${img}" class="slider-img">`;
        sliderTrack.appendChild(slide);
    });

    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        dots: '#dots',
        draggable: true,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    });
}

loadSnacks();


