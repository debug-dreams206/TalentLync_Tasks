let properties = localStorage.getItem("PropertiesList")
    ? JSON.parse(localStorage.getItem("PropertiesList"))
    : [];

let selectedPropertyId = null;

function clearPropertyForm() {
    document.getElementById("name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("price").value = "";
    document.getElementById("type").value = "";
    document.getElementById("bedrooms").value = "";
    document.getElementById("bathrooms").value = "";
    document.getElementById("image").value = "";
}
function createProperty() {
    const propertyName = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;
    const type = document.getElementById("type").value;
    const bedrooms = document.getElementById("bedrooms").value;
    const bathrooms = document.getElementById("bathrooms").value;
    const image = document.getElementById("image").value;
    if (!propertyName || !location || !price || !type || !bedrooms || !bathrooms) {
        alert("Please fill all fields");
        return;
    }
    const propertyObject = {
        id: Date.now(),
        name: propertyName,
        location: location,
        price: Number(price),
        type: type,
        bedrooms: bedrooms,
        bathrooms: Number(bathrooms),
        image: image
    };

    properties.push(propertyObject);
    localStorage.setItem("PropertiesList", JSON.stringify(properties));
    alert("Property Added Successfully");
    clearPropertyForm();
    getAllProperties();
}

function loadProperties() {
    return localStorage.getItem("PropertiesList")
        ? JSON.parse(localStorage.getItem("PropertiesList"))
        : [];
}
function getAllProperties() {
    const propertyList = loadProperties();
    const tableBody = document.getElementById("propertyTableBody");
    if (tableBody) {
        tableBody.innerHTML = "";
        propertyList.forEach(property => {
            tableBody.innerHTML += `
                <tr>
                    <td>${property.id}</td>
                    <td>${property.name}</td>
                    <td>${property.location}</td>
                    <td>₹${property.price}</td>
                    <td>${property.type}</td>
                    <td>${property.bedrooms}</td>
                    <td>${property.bathrooms}</td>
                    <td><img src="${property.image}" width="100" height="70"></td>
                    <td>
                        <button class="btn btn-primary" onclick="getPropertyByID(${property.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProperty(${property.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
    displayPropertiesOnPropertyPage();
}
function getPropertyByID(id) {
    const property = loadProperties().find(property => property.id == id);

    if (property) {
        document.getElementById("name").value = property.name;
        document.getElementById("location").value = property.location;
        document.getElementById("price").value = property.price;
        document.getElementById("type").value = property.type;
        document.getElementById("bedrooms").value = property.bedrooms;
        document.getElementById("bathrooms").value = property.bathrooms;
        document.getElementById("image").value = property.image;

        selectedPropertyId = property.id;
        document.getElementById("submitButton").value = "Update Property";
        document.getElementById("submitButton").onclick = updateProperty;
    }
}
function updateProperty() {
    if (selectedPropertyId == null) {
        alert("Please select a property");
        return;
    }
    const propertyList = loadProperties();
    const index = propertyList.findIndex(property => property.id == selectedPropertyId);
    if (index != -1) {
        propertyList[index].name = document.getElementById("name").value;
        propertyList[index].location = document.getElementById("location").value;
        propertyList[index].price = Number(document.getElementById("price").value);
        propertyList[index].type = document.getElementById("type").value;
        propertyList[index].bedrooms = document.getElementById("bedrooms").value;
        propertyList[index].bathrooms = Number(document.getElementById("bathrooms").value);
        propertyList[index].image = document.getElementById("image").value;
        localStorage.setItem("PropertiesList", JSON.stringify(propertyList));
        properties = propertyList;
        alert("Property Updated Successfully");
        clearPropertyForm();
        selectedPropertyId = null;
        document.getElementById("submitButton").value = "Add Property";
        document.getElementById("submitButton").onclick = createProperty;
        getAllProperties();
    }
}
function deleteProperty(id) {
    if (confirm("Are you sure you want to delete this property?")) {
        properties = loadProperties().filter(property => property.id != id);
        localStorage.setItem("PropertiesList", JSON.stringify(properties));
        alert("Property Deleted Successfully");
        getAllProperties();
    }
}
function filterAndSearchProperties() {
    const locationElement = document.getElementById("searchLocation");
    const typeElement = document.getElementById("searchType");
    if (!locationElement || !typeElement) return;
    const location = locationElement.value.toLowerCase();
    const type = typeElement.value;
    const filteredProperties = loadProperties().filter(property =>
        property.location.toLowerCase().includes(location) &&
        (type == "" || property.type == type)
    );
    displayFilteredProperties(filteredProperties);
}
function displayFilteredProperties(propertyList) {
    const container = document.getElementById("propertiesContainer");
    if (!container) return;
    container.innerHTML = "";
    if (propertyList.length == 0) {
        container.innerHTML = "<h2>No Properties Found</h2>";
        return;
    }
    propertyList.forEach(property => {
        container.innerHTML += `
            <div class="property">
                <h2>${property.name}</h2>
                <img src="${property.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}" alt="${property.name}">
                <p><b>Location:</b> ${property.location}</p>
                <p><b>Price:</b> ₹${property.price}</p>
                <p><b>Type:</b> ${property.type}</p>
                <p><b>Bedrooms:</b> ${property.bedrooms}</p>
                <p><b>Bathrooms:</b> ${property.bathrooms}</p>
                <button>View Details</button>
            </div>
        `;
    });
}
function displayPropertiesOnPropertyPage() {
    const container = document.getElementById("crudPropertiesContainer");
    if (!container) return;
    container.innerHTML = "";
    loadProperties().forEach(property => {
        container.innerHTML += `
            <div class="property">
                <h2>${property.name}</h2>
                <img src="${property.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}" alt="${property.name}" width="300">
                <p><b>Location:</b> ${property.location}</p>
                <p><b>Price:</b> ₹${property.price}</p>
                <p><b>Type:</b> ${property.type}</p>
                <p><b>Bedrooms:</b> ${property.bedrooms}</p>
                <p><b>Bathrooms:</b> ${property.bathrooms}</p>
                <button>View Details</button>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", getAllProperties);
