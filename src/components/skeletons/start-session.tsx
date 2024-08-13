import React from "react";
import { View} from "react-native";

const StartSessionSkeleton: React.FC = () => {
	return (
		<View>
			<View className="items-center mt-10">
				<View className="h-14 bg-gray-100 rounded-full dark:bg-gray-200 w-14 mb-2" />
				<View className="flex-row items-center">
					<View className="ml-2 items-center">
						<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-48 mb-2" />
						<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-96 mb-2" />
					</View>
				</View>
			</View>
			<View className="h-3 py-6 px-3 rounded-lg border border-gray-200 mb-2 mt-5">
				<View className="items-center">
					<View className="flex-row items-center">
						<View>
							<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-12 mb-2" />
							<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-48 mb-2" />
						</View>
					</View>
				</View>
			</View>
			<View className="h-3 py-6 px-3 rounded-lg border border-gray-200 mb-2">
				<View className="items-center">
					<View className="flex-row items-center">
						<View>
							<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-12 mb-2" />
							<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-48 mb-2" />
						</View>
					</View>
				</View>
			</View>
			<View className="h-3 py-6 px-3 rounded-lg border border-gray-200 mb-2">
				<View className="items-center">
					<View className="flex-row items-center">
						<View>
							<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-12 mb-2" />
							<View className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-48 mb-2" />
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default StartSessionSkeleton;