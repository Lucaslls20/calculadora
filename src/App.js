import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleTap = (type, value) => {
    if (type === 'number') {
      setCurrentValue(
        currentValue === '0' ? `${value}` : `${currentValue}${value}`
      );
    }

    if (type === 'operator') {
      setOperator(value);
      setPreviousValue(currentValue);
      setCurrentValue('0');
    }

    if (type === 'equal') {
      const current = parseFloat(currentValue);
      const previous = parseFloat(previousValue);

      if (operator === '+') {
        setCurrentValue(`${previous + current}`);
      } else if (operator === '-') {
        setCurrentValue(`${previous - current}`);
      } else if (operator === '*') {
        setCurrentValue(`${previous * current}`);
      } else if (operator === '/') {
        setCurrentValue(`${previous / current}`);
      }

      setOperator(null);
      setPreviousValue(null);
    }

    if (type === 'clear') {
      setCurrentValue('0');
      setOperator(null);
      setPreviousValue(null);
    }

    if (type === 'posneg') {
      setCurrentValue(`${parseFloat(currentValue) * -1}`);
    }

    if (type === 'percentage') {
      setCurrentValue(`${parseFloat(currentValue) * 0.01}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{currentValue}</Text>
      <View style={styles.row}>
        <Button text="AC" onPress={() => handleTap('clear')} />
        <Button text="+/-" onPress={() => handleTap('posneg')} />
        <Button text="%" onPress={() => handleTap('percentage')} />
        <Button text="/" onPress={() => handleTap('operator', '/')} operator />
      </View>
      <View style={styles.row}>
        <Button text="7" onPress={() => handleTap('number', 7)} />
        <Button text="8" onPress={() => handleTap('number', 8)} />
        <Button text="9" onPress={() => handleTap('number', 9)} />
        <Button text="*" onPress={() => handleTap('operator', '*')} operator />
      </View>
      <View style={styles.row}>
        <Button text="4" onPress={() => handleTap('number', 4)} />
        <Button text="5" onPress={() => handleTap('number', 5)} />
        <Button text="6" onPress={() => handleTap('number', 6)} />
        <Button text="-" onPress={() => handleTap('operator', '-')} operator />
      </View>
      <View style={styles.row}>
        <Button text="1" onPress={() => handleTap('number', 1)} />
        <Button text="2" onPress={() => handleTap('number', 2)} />
        <Button text="3" onPress={() => handleTap('number', 3)} />
        <Button text="+" onPress={() => handleTap('operator', '+')} operator />
      </View>
      <View style={styles.row}>
        <Button text="0" onPress={() => handleTap('number', 0)} />
        <Button text="." onPress={() => handleTap('number', '.')} />
        <Button text="=" onPress={() => handleTap('equal')} operator />
      </View>
    </View>
  );
};

const Button = ({ text, onPress, operator }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, operator && styles.operatorButton]}>
    <Text style={[styles.buttonText, operator && styles.operatorText]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 64,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#333',
    flex: 1,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    margin: 5,
  },
  operatorButton: {
    backgroundColor: '#f09a36',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
  },
  operatorText: {
    color: '#fff',
  },
});

export default App;
