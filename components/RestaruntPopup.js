import React from "react";
import { Modal, Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";

const RestaurantPopup = ({ restaurant, onClose }) => (
  <Modal visible={!!restaurant} transparent animationType="fade">
    <TouchableOpacity style={styles.popupBackground} activeOpacity={1} onPress={onClose}>
      <View style={styles.popupContainer}>
        <Image style={styles.restaurantImage} source={{ uri: restaurant?.image_url }} />
        <Text style={styles.restaurantName}>{restaurant?.name}</Text>
        <Text style={styles.restaurantAddress}>{restaurant?.location?.address1}</Text>
        <Text style={styles.restaurantPhone}>{restaurant?.phone}</Text>

        {/* Add self-generated items for customers to pick */}
        <Text style={styles.sectionTitle}>Items for Customers to Pick:</Text>
        <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.itemButton} onPress={() => handleItemSelection("Item 1")}>
            <Text style={styles.itemText}>Item 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButton} onPress={() => handleItemSelection("Item 2")}>
            <Text style={styles.itemText}>Item 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButton} onPress={() => handleItemSelection("Item 3")}>
            <Text style={styles.itemText}>Item 3</Text>
          </TouchableOpacity>
        </View>

        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  popupBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  restaurantImage: {
    width: 300, // Increased the width to make it bigger
    height: 300, // Increased the height to make it bigger
    borderRadius: 10,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  restaurantAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
  restaurantPhone: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemButton: {
    backgroundColor: "lightgray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default RestaurantPopup;
