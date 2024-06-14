import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

interface Item {
  name: string;
  snapshot: {
    greeting: string
    name: string
    logo: string
    model: string
  };
  query: string;
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
      <Image src={item.snapshot.logo} style={styles.image} />
      <View className="flex-1 pr-2.5">
        <Text
          className="text-base font-semibold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text className=" text-gray-600 text-sm font-normal" numberOfLines={3} ellipsizeMode="tail">
          {item.query}
        </Text>
      </View>
    </View>
  );
};

const ListWithImages: React.FC<ListWithImagesProps> = ({ items }) => {
  return (
    <View>
      {items && items?.map((item, index) => (
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
