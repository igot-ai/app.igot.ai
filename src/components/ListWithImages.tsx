import React from "react";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";

interface Item {
  title: string;
  imageSource: any;
  description: string;
}

interface ListWithImagesProps {
  items: Item[];
}

interface ImageListItemProps {
  item: Item;
}

const ImageListItem: React.FC<ImageListItemProps> = ({ item }) => {
  return (
    <View className="flex-row items-start	mb-5">
      <Image source={item.imageSource} style={styles.image} />
      <View className="flex-1 pr-2.5">
        <Text
          className="text-lg font-bold mb-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text className="text-gray-600" numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const ListWithImages: React.FC<ListWithImagesProps> = ({ items }) => {
  return (
    <View>
      {items.map((item, index) => (
        <ImageListItem key={index} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 3,
  }
});

export default ListWithImages;
