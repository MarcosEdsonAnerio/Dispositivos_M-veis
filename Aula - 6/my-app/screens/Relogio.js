import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const Relogio = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const radius = 120; // Radius of the clock face
  const center = radius; // Center of the clock

  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourAngle = (hour + minute / 60) * 30; // 360 / 12 hours
  const minuteAngle = minute * 6; // 360 / 60 minutes
  const secondAngle = second * 6; // 360 / 60 seconds

  const hourX = center + radius * 0.5 * Math.cos((hourAngle - 90) * (Math.PI / 180));
  const hourY = center + radius * 0.5 * Math.sin((hourAngle - 90) * (Math.PI / 180));

  const minuteX = center + radius * 0.8 * Math.cos((minuteAngle - 90) * (Math.PI / 180));
  const minuteY = center + radius * 0.8 * Math.sin((minuteAngle - 90) * (Math.PI / 180));

  const secondX = center + radius * 0.9 * Math.cos((secondAngle - 90) * (Math.PI / 180));
  const secondY = center + radius * 0.9 * Math.sin((secondAngle - 90) * (Math.PI / 180));

  return (
    <View style={styles.container}>
      <Svg width={2 * radius} height={2 * radius} viewBox="0 0 240 240">
        {/* Clock Face */}
        <Circle cx={center} cy={center} r={radius} stroke="#444" strokeWidth="8" fill="#222" />
        
        {/* Hour Hand */}
        <Line x1={center} y1={center} x2={hourX} y2={hourY} stroke="#FFDC00" strokeWidth="8" strokeLinecap="round" />
        
        {/* Minute Hand */}
        <Line x1={center} y1={center} x2={minuteX} y2={minuteY} stroke="#00BFFF" strokeWidth="6" strokeLinecap="round" />
        
        {/* Second Hand */}
        <Line x1={center} y1={center} x2={secondX} y2={secondY} stroke="#FF4500" strokeWidth="4" strokeLinecap="round" />
        
        {/* Clock Tick Marks */}
        {[...Array(12)].map((_, index) => {
          const angle = index * 30; // Angle for each tick
          const x1 = center + radius * 0.85 * Math.cos((angle - 90) * (Math.PI / 180));
          const y1 = center + radius * 0.85 * Math.sin((angle - 90) * (Math.PI / 180));
          const x2 = center + radius * 0.95 * Math.cos((angle - 90) * (Math.PI / 180));
          const y2 = center + radius * 0.95 * Math.sin((angle - 90) * (Math.PI / 180));
          return <Line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="2" />
        })}
      </Svg>

      <Text style={styles.timeText}>
        {time.toLocaleTimeString()}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Appzinho</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  timeText: {
    fontSize: 28,
    color: 'white',
    marginTop: 20,
    fontFamily: 'Roboto',
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
});

export default Relogio;
