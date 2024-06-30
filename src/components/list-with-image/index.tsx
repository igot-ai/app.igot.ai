import { useChatBot } from "@/hooks";
import { Builder } from "@/types";
import { Link } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";

interface ListWithImagesProps {
  items: Builder[];
}

interface ImageListItemProps {
  item: Builder;
  createNewSession: (ctx?: string) => void;
}

const ImageListItem: React.FC<ImageListItemProps> = ({
  item,
  createNewSession,
}) => {
  return (
    <Link
      href={{
        pathname: "(chat)/assistant/[context_id]",
        params: {
          context_id: item.context_id,
        },
      }}
      onPress={() => createNewSession(item.context_id)}
      asChild
    >
      <TouchableOpacity className="flex-row items-start	mb-5">
        <Image src={item.snapshot.logo} style={styles.image} />
        <View className="flex-1 pr-2.5">
          <Text
            className="text-base font-semibold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text
            className=" text-gray-600 text-sm font-normal"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.query}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const ListWithImages: React.FC<ListWithImagesProps> = ({ items }) => {
  const { createNewSession } = useChatBot();
  return (
    <VirtualizedList
      data={items}
      getItem={(data: Builder[], index: number) => data[index]}
      keyExtractor={(item) => item.context_id}
      getItemCount={(data: Builder[]) => data.length}
      renderItem={({ item, index }) => (
        <ImageListItem key={index} {...{ createNewSession, item }} />
      )}
    />
    // <View>
    //   {items &&
    //     items?.map((item, index) => (
    //
    //     ))}
    // </View>
  );
};

export default ListWithImages;

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 3,
  },
});
