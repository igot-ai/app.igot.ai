import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { isEmpty } from "lodash";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";
import { rgbaStringToHex } from "@/utils";

const screenWidth = Dimensions.get("window").width * 0.8;

const chartConfig: ChartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface ChartJson {
  type: "bar" | "line" | "pie";
  data: ChartData;
}

interface Props {
  content: ChartJson;
}

export const Chart = ({ content }: Props) => {
  const { data, type } = content;

  if (!type && isEmpty(data)) return <Text>No data available</Text>;

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, index) => {
      const colors = dataset.backgroundColor.map((color) =>
        rgbaStringToHex(color)
      );
      console.log("🚀 ~ datasets:data.datasets.map ~ colors:", colors);
      return {
        data: dataset.data,
        colors,
        // colors: (opacity = 1) => dataset.backgroundColor.map((color) => color),
      };
    }),
  };

  switch (type) {
    case "bar":
      return (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          withCustomBarColorFromData
          yAxisLabel="" // Add this line
          yAxisSuffix="" // Add this line
        />
      );
    case "line":
      return (
        <LineChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      );
    case "pie":
      return (
        <PieChart
          data={data.datasets.map((dataset, index) => ({
            name: dataset.label,
            population: dataset.data[0], // Assuming the first data point for Pie chart
            color: dataset.backgroundColor,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          }))}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      );
    default:
      return <Text>Unsupported chart type</Text>;
  }
};
