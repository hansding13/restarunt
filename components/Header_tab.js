import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";

const YELP_API_KEY = "your yelp api"
const GOOGLE_PLACES_API_KEY = "your google apiI";
const initialRestaurantData = [];
const totalValue = 10;


export default function HeaderTab() {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [restaurants, setRestaurants] = useState(initialRestaurantData);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  const handlePlaceSelected = (data, details = null) => {
    console.log("Place Selected Data:", data);
    console.log("Place Selected Details:", details);
  
    if (details && details.matched_substrings && details.matched_substrings.length > 0) {
      setSelectedAddress(details);
      console.log("Selected Address:", details);
    } else {
      console.log("No selected address");
    }
  };
  
  const fetchRestaurants = async (selectedAddress) => {
    if (selectedAddress !== null) {
      const description = selectedAddress.description;

      const radius = 20000; // 20 km
      const url = `https://api.yelp.com/v3/businesses/search?location=${description}&radius=${radius}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        });

        if (response && response.data && response.data.businesses) {
          const data = response.data;
          console.log("Fetched Restaurants: ", data.businesses);
          setRestaurants(
            data.businesses.filter((business) =>
              business.transactions.includes(selectedButton.toLowerCase())
            )
          );
        } else {
          console.error("No restaurant data found");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    } else {
      console.error("No selected address");
    }
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleItemSelection = (itemName, itemPrice) => {
    const item = {
      name: itemName,
      price: itemPrice,
    };
    const totalValue=totalValue+itemPrice
    setCartItems((prevItems) => [...prevItems, item]);
    console.log("Selected item added to cart:", item);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoImage} source={require("./image.png")} />
      </View>
      <View style={styles.buttonsContainer}>
        <HeaderButton
          text="Delivery"
          isSelected={selectedButton === "Delivery"}
          onPress={handleButtonClick}
        />
        <HeaderButton
          text="Pickup"
          isSelected={selectedButton === "Pickup"}
          onPress={handleButtonClick}
        />
      </View>
      <GooglePlacesAutocomplete
        placeholder="Search..."
        onPress={(data, details = null) => handlePlaceSelected(data, details)}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        styles={{
          textInput: styles.searchInput,
        }}
        autoFillOnNotFound={true}
      />

      <TouchableOpacity
        style={[
          styles.searchButton,
          !selectedAddress ? styles.disabledButton : null
        ]}
        onPress={() => fetchRestaurants(selectedAddress)}
      >
        <Text style={styles.searchButtonText}>Search Restaurants</Text>
      </TouchableOpacity>

      <View style={styles.restaurantIconsContainer}>
  {restaurants.map((restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      onPress={() => handleRestaurantClick(restaurant)}
    >
      <Image
        style={styles.restaurantIcon}
        source={{ uri: restaurant.image_url }}
        onError={() => console.log("Failed to load image:", restaurant.image_url)}
        defaultSource={require("./image.png")} // Replace with your placeholder image
      />
    </TouchableOpacity>
  ))}
</View>


      <Modal
        visible={selectedRestaurant !== null}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          {selectedRestaurant && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedRestaurant.location.address1}</Text>
              <Text style={styles.modalSubtitle}>{selectedRestaurant.location.city}, {selectedRestaurant.location.state} {selectedRestaurant.location.zip_code}</Text>
              <Text style={styles.modalSubtitle}>Rating: {selectedRestaurant.rating}</Text>
              <Text style={styles.modalSubtitle}>Price: {selectedRestaurant.price}</Text>
              <Text style={styles.sectionTitle}>Items for Customers to Pick:</Text>
              <TouchableOpacity style={styles.itemButton} onPress={() => handleItemSelection("Item 1",10)}>
              <Text style={styles.itemText}>Item 1 $10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButton} onPress={() => handleItemSelection("Item 2",15)}>
              <Text style={styles.itemText}>Item 2 $15</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButton} onPress={() => handleItemSelection("Item 3",20)}>
              <Text style={styles.itemText}>Item 3 $20</Text>
              </TouchableOpacity>
              <Text style={styles.itemText}>Total: ${totalValue}</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setSelectedRestaurant(null)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const HeaderButton = ({ text, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.buttonContainer,
      isSelected && styles.buttonSelected,
      isSelected && { backgroundColor: "black" },
    ]}
    onPress={() => onPress(text)}
  >
    <Text style={[styles.button, isSelected && { color: "white" }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: "black",
  },
  button: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "black",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  restaurantIconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  restaurantIcon: {
    width: 50,
    height: 50,
    margin: 5,
    resizeMode: "contain",
  },
  itemButton: {
    backgroundColor: "lightgray",
    paddingHorizontal: 20, // Increased the horizontal padding to add more space
    paddingVertical: 15, // Increased the vertical padding to add more space
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  }
,  
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width:"80%",
    height:"80%",
    borderRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalCloseButton: {
    backgroundColor: "black",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
