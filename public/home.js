const dropdown = document.getElementById("countryDropdown");
const goButton = document.getElementById("goButton");

goButton.addEventListener("click", () => {
    const selected = dropdown.value;

    if (!selected) {
        alert("Please select a country first!");
        return;
    }

    window.location.href = `explore.html?country=${selected}`;
});
