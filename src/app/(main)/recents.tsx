import ListWithImages from "@/components/list-with-image";
import { PAGE_SIZE } from "@/constants";
import { useBot } from "@/hooks";
import { Builder } from "@/types";
import { Image, Text, View } from "react-native";

const Recents = () => {
  const { bots } = useBot();

  return (
    <View className="h-full pt-12 bg-white pb-12">
      {/* BACKGROUND IMAGE */}
      <Image
        source={require("../../../assets/recent-page-background.png")}
        resizeMode="cover"
        style={{ width: "100%", position: "absolute", height: 300 }}
      />
      {/* HEADING */}
      <View className="px-5 mb-7">
        <Text className="font-medium text-grey-900 text-base text-center">
          Recents
        </Text>
      </View>

      {/* CONTENT */}
      <View className="px-5">
        <ListWithImages
          items={(bots.data?.pages?.flat() || []) as Builder[]}
          lastPage={bots?.data?.pages[bots.data?.pages?.length - 1] || []}
          onEndReached={() =>
            bots?.data?.pages[bots.data?.pages?.length - 1]?.length ===
            PAGE_SIZE
              ? bots.fetchNextPage()
              : null
          }
        />
      </View>
    </View>
  );
};
export default Recents;
