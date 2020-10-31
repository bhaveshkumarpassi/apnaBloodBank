import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import {connect} from 'react-redux';
import {Icon, Button, Card} from 'react-native-elements';


const mapStateToProps = (state) => {

    return{
      users: state.users,
      auth: state.auth
    }
};

class NeedDonor extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tableHeader: [' Patient VS Valid Donors'],
          tableHead: ['', 'O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+'],
          tableTitle: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
          tableData: [
            ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'],
            ['yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no'],
            ['yes', 'yes', 'no', 'no', 'yes', 'yes', 'no', 'no'],
            ['yes', 'no', 'no', 'no', 'yes', 'no', 'no', 'no'],
            ['yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no'],
            ['yes', 'no', 'yes', 'no', 'no', 'no', 'no', 'no'],
            ['yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no'],
            ['yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no']
          ],
         tableFooter: ['Valid Donors    >>>>>>>>>>>>>>'],
         isAuthenticated: false
        }
      }
    
      componentDidMount() {
        this.unsubscribe =  auth.onAuthStateChanged(user => {
    
            if(user) {
              this.setState({
                isAuthenticated: true
              })
            }
            else {
              this.setState({
                isAuthenticated: false,
              })
            }
        })
    }
    
    componentWillUnmount() {
    
        this.unsubscribe();
    }

    render() {

        if(this.state.isAuthenticated) {
        const state = this.state;
        return (
            <ScrollView style={{backgroundColor: '#f0fff3'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, alignSelf: 'center', marginTop: 15, marginBottom: 15}}>Select the needed Blood Group !!</Text>
                <View style={{flex: 1, flexDirection: 'column'}}>
                <Card>
                <View style={styles.container}>
                <Table borderStyle={{borderWidth: 1}}>
                    <Row data={state.tableHeader} style={{backgroundColor: 'orange'}} textStyle={{textAlign: 'center', fontWeight: 'bold'}}/>
                    <Row data={state.tableHead} flexArr={[2.75, 1, 1]} style={styles.head} textStyle={styles.text}/>
                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} textStyle={styles.text}/>
                        <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                    </TableWrapper>
                    <Row data={state.tableFooter} style={{backgroundColor: 'orange'}} textStyle={{textAlign: 'center', fontWeight: 'bold'}}/>
                </Table>
                </View>
                </Card>
                <View style={{marginVertical: 20}}>
                <View style={{flex:1, flexDirection: 'row', alignSelf: 'center'}}>
                <Button
                    title="A+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: '#8b008b'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('A+ Donors')}
                />
                <Button
                    title="A-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'green'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('A- Donors')}
                />
                <Button
                    title="B+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'maroon'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('B+ Donors')}
                />
                <Button
                    title="B-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'orange'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('B- Donors')}
                />
                </View>
                <View style={{flex:1, flexDirection: 'row', alignSelf: 'center'}}>
                <Button
                    title="O+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'orchid'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('O+ Donors')}
                />
                <Button
                    title="O-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: '#1e90ff'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('O- Donors')}
                />
                <Button
                    title="AB+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: '#c71585'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('AB+ Donors')}
                />
                <Button
                    title="AB-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'navy'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('AB- Donors')}
                />
                </View>
                </View>
                </View>
            </ScrollView>
        );
        }
        else {
            return (

                <ScrollView style={{backgroundColor: '#f0fff3'}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={{color: "#440047",
                        fontSize: 25,
                        fontWeight: "bold",
                        textAlign: 'center',
                        marginTop: 40,
                        flex: 1
                        }}>Sorry !! You need to Login first.</Text>
                    <ImageBackground source={require('./images/bloodLogo.png')} style={{height: 600, marginTop: 60, width: 550, flex: 3}}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Login')}
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderRadius: 30,
                            height: 50
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{marginRight: 250, marginLeft: 70, marginTop: 40}}
                        />
                    <Button
                        onPress={() => this.props.navigation.navigate('Home')}
                        title="Go Back To Home"
                        icon={
                            <Icon
                                name='arrow-circle-left'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderRadius: 30,
                            height: 50
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{marginRight: 250, marginLeft: 70, marginTop: 40}}
                        />
                    </ImageBackground>
                    
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
});

export default connect(mapStateToProps)(NeedDonor);