import React from "react";
import { View } from "react-native";

const skeletons = Array.from({ length: 10 });

const LoadingMessageSkeleton: React.FC = () => {
	return (
		<View className="h-full bg-white">
			<View className="items-center">
				{skeletons.map((_, index) => (
					<View key={index} className="mt-4">
						{index % 2 === 0 ? (
							<View className="flex-row items-center">
								<View className="h-14 bg-gray-100 rounded-full dark:bg-gray-200 w-14 mb-2" />
								<View className="ml-2">
									<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-72 mb-2" />
									<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-56 mb-2" />
									<View className="w-64 h-3 bg-gray-100 rounded-full dark:bg-gray-200" />
								</View>
							</View>
						) : (
							<View className="flex-row items-center">
								<View className="mr-2 items-end">
									<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-72 mb-2" />
									<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-64 mb-2" />
									<View className="w-72 h-3 bg-gray-100 rounded-full dark:bg-gray-200" />
								</View>
								<View className="h-14 bg-gray-100 rounded-full dark:bg-gray-200 w-14 mb-2" />
							</View>
						)}
					</View>
				))}
			</View>
		</View>
	);
};

export default LoadingMessageSkeleton;