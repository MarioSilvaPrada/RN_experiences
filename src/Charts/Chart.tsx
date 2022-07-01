// https://betterprogramming.pub/d3-and-react-native-an-essential-guide-to-line-graphs-dc1ce392b440
import {curveBasis, line, scaleLinear, scaleTime} from 'd3';
import React from 'react';
import {Dimensions, StyleSheet, SafeAreaView} from 'react-native';

import {parse, Path as RePath} from 'react-native-redash';

import Animated from 'react-native-reanimated';
import {
  animatedData,
  animatedData2,
  animatedData3,
  DataPoint,
  originalData,
} from './Data';
import LineChart from './LineChart';
import {Rect} from 'react-native-svg';

const {width} = Dimensions.get('screen');

const CARD_WIDTH = width - 20;
const GRAPH_WIDTH = CARD_WIDTH - 60;
const CARD_HEIGHT = 325;
const GRAPH_HEIGHT = 200;

const GRAPH_BAR_WIDTH = 8;

export type GraphData = {
  max: number;
  min: number;
  curve: RePath;
  mostRecent: number;
};

export type GraphBarData = {
  date: Date;
  x: number;
  height: number;
};

const makeGraph = (data: DataPoint[]) => {
  const max = Math.max(...data.map(val => val.value));
  const min = Math.min(...data.map(val => val.value));
  const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

  const x = scaleTime()
    .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
    .range([0, GRAPH_WIDTH - 10]);

  const curvedLine = line<DataPoint>()
    .x(d => x(new Date(d.date)))
    .y(d => y(d.value))
    .curve(curveBasis)(data);

  return {
    max,
    min,
    curve: parse(curvedLine!),
    mostRecent: data[data.length - 1].value,
  };
};

const makeBarGraphData = (data: DataPoint[]) => {
  const max = Math.max(...data.map(val => val.value));
  const xDomain = [new Date(2000, 1, 1), new Date(2000, 1, 15)];
  const xRange = [0, GRAPH_WIDTH - 20];
  const x = scaleTime().domain(xDomain).range(xRange);

  const yDomain = [0, max];
  const yRange = [0, GRAPH_HEIGHT];
  const y = scaleLinear().domain(yDomain).range(yRange);

  return data.map(item => ({
    date: item.date,
    x: x(new Date(item.date)),
    height: y(item.value) * -1,
  }));

  // return data.map(item => (
  //   <Rect
  //     key={item.date}
  //     x={x(new Date(item.date))}
  //     y={GRAPH_HEIGHT}
  //     width={GRAPH_BAR_WIDTH}
  //     height={y(item.value) * -1}
  //     fill="purple"
  //   />
  // ));
};

const graphData: GraphData[] = [
  makeGraph(originalData),
  makeGraph(animatedData),
  makeGraph(animatedData2),
  makeGraph(animatedData3),
];

const graphBarData: GraphBarData[][] = [
  makeBarGraphData(originalData),
  makeBarGraphData(animatedData),
  makeBarGraphData(animatedData2),
  makeBarGraphData(animatedData3),
];

export const Chart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.graphCard}>
        <LineChart
          height={GRAPH_HEIGHT}
          width={GRAPH_WIDTH}
          data={graphData}
          data2={graphBarData}
          bottomPadding={20}
          leftPadding={0}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  graphCard: {
    elevation: 5,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
