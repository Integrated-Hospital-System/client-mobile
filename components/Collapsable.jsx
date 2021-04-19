import React, { Component, useState } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper'
import { Avatar } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Ionicons } from '@expo/vector-icons';
import SpecialityCard from '../components/SpecialityCard'
import {useNavigation} from "@react-navigation/native"

export default function AccordionView(props) {
  const navigation  = useNavigation()
  const randomImageNumber = (Math.floor(Math.random() * 2)).toString()
  const [collapsed, setCollaped] = useState(true)
  const { dummyDoctor } = props
  const toggleExpanded = () => {
    setCollaped(!collapsed);
  };
  const arrayOfDays = dummyDoctor.practice.map(eachDay => {
    return eachDay.day
  })
  const arrayOfTime = dummyDoctor.practice.map(eachDay => {
    return [eachDay.start, eachDay.end]
  })
  const [tableHead, setTableHead] = useState(["days", "start", "end"])
  const [tableTitle, setTableTitle] = useState(arrayOfDays)
  const [tableData, setTableData] = useState(arrayOfTime)

  return (
    <View style={styles.container}>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "column",
            width: 300,
            marginTop: 10,
            marginHorizontal: 10,
            // backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          <View>
            <Avatar.Image size={150} source={require(`../src/images/doctor0.jpeg`)} />
          </View>
          <Text style={{ fontFamily: 'coolvetica-rg', fontSize: 20, textAlign: 'center', margin: 10 }}>Dr. {dummyDoctor.name}</Text>

          <View>
            <Text style={{
              textAlign: 'center',
              // fontWeight: 100
            }}>
              Speciality:
              </Text>
            {
              dummyDoctor.speciality.map(eachSpeciality => {
                return <SpecialityCard eachSpeciality={eachSpeciality} key={eachSpeciality}></SpecialityCard>
              })
            }
          </View>

          <Button
            mode="contained"
            icon="check-circle"
            onPress={()=> navigation.navigate('AppointmentForm', dummyDoctor)}
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              color: "white"
            }}
            width={300}
            color='#0ec7a8'
          >
            Choose Dr. {dummyDoctor.name}
          </Button>

          <View style={{
            marginTop: 10,
            backgroundColor: "white",
            borderRadius: 15,
            borderWidth: 2,
            borderColor: "#0ec7a8",
            backgroundColor: '#f0fffb',
          }}>
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleTitle}>Dr. {dummyDoctor.name}'s Schedule</Text>
              <Switch
                value={!collapsed}
                onValueChange={toggleExpanded}
              />
            </View>

          </View>
          <Collapsible collapsed={collapsed} align="center">
            <View style={styles.content}>
              {/* <Text style={{textAlign:'center'}}>
                Speciality
              </Text> */}
              <View style={{ width: 250 }}>
                <Table borderStyle={{ borderWidth: 0 }}>
                  <Row data={tableHead} flexArr={[1, 0.5, 0.5]} style={styles.head} textStyle={styles.text} />
                  <TableWrapper style={styles.wrapper}>
                    <Col data={tableTitle} style={styles.title} heightArr={[28]} textStyle={styles.text} />
                    <Rows data={tableData} flexArr={[0.5, 0.5]} style={styles.row} textStyle={styles.text} />
                  </TableWrapper>
                </Table>
              </View>
            </View>
          </Collapsible>
        </View>



        {/* kayanya ga bisa kepake soalnya terpisah ga nempel2 antar card 
          
            <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30
  },
  content: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },

  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 300,
  },
  toggleTitle: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' }
});
