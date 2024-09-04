import React from "react";
import { View } from "react-native";

const skeletons = Array.from({ length: 10 });

const LoadingBotsSkeleton: React.FC = () => {
	return (
		<View>
			{skeletons.map((_, index) => (
				<View className="p-2 rounded" key={index}>
					<View>
						<View className="flex-row items-center">
							<View className="h-12 bg-gray-100 dark:bg-gray-200 w-12 rounded" />
							<View className="ml-2">
								<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-24 mb-2" />
								<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-72 mb-2" />
							</View>
						</View>
					</View>
				</View>
			))}
		</View>
	);
};

export default LoadingBotsSkeleton;
