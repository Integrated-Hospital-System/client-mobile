import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'


export default function DocCard(props) {
  const navigation = useNavigation()
  const {image_url, practice, name} = props
  console.log('<<<<< props dari doctor card')
  const LeftContent = props => <Avatar.Image size={50} source={{uri: image_url}}/>
  const RightContent = props => (<Button color="#3075b5" onPress={() => {navigation.navigate('Home')}}>Info</Button>)
  const day = () => {
      let praktek = ''
      practice.forEach((practiceDay, index) => {
          let temp = practiceDay.day.split('')
          if (index === practice.length - 1) {
              praktek += ` ${temp[0].toUpperCase()}${temp[1]}${temp[2]}`
            } else {
                praktek += `${temp[0].toUpperCase()}${temp[1]}${temp[2]} - `
            }
      });
        if (practice.length === 7) praktek = 'Everyday'
        return praktek
  }
  return (
    <>
        <Card style={styles.card}>
            <Card.Title title={name} subtitle={day()} left={LeftContent} right={RightContent} />
        </Card>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: "100%",
    shadowOpacity: 0.7,
    shadowRadius: 2.5
  }
});
