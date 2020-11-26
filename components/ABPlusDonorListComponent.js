import React, {Component} from 'react';
import { View, Text, FlatList, SafeAreaView} from 'react-native';
import {ListItem, Card, Avatar, SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';
import { auth } from '../firebase/firebase';

const mapStateToProps = (state) => {

    return{
      users: state.users
    }
};

class ABPlusDonorList extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            searchString: '',
            data : [],
        }

        this.arrayHolder = [];
    }

    componentDidMount() {

        this.setState({
            data: this.props.users.users.filter((user) => user.bloodgroup === 'AB+' && user.uid !== auth.currentUser.uid)
        })

        this.arrayHolder = this.props.users.users.filter((user) => user.bloodgroup === 'AB+' && user.uid !== auth.currentUser.uid) ;
    }

    searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayHolder.filter(item => {
          const itemData = `${item.locality.toUpperCase()} ${item.city.toUpperCase()} ${item.state.toUpperCase()}  ${item.country.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });

        this.setState({
          data: newData,
        });
      };

    renderHeader = () => {
        return (
          <SearchBar
            placeholder="Filter donor's locality, city, state, country ...  "
            multiline
            clear
            round
            onChangeText={searchString => this.searchFilterFunction(searchString)}
            autoCorrect={false}
            value={this.state.value}
            clearIcon={{size: 20}}
            searchIcon={{size: 25}}
          />
        );
      };

    render() {

        const renderListItem = ({ item , index}) => (
                <ListItem
                    bottomDivider
                    topDivider
                    key={index}
                    containerStyle={{backgroundColor: '#200019'}}
                    pad = {30}
                    onPress= {() => (item.willing) ? this.props.navigation.navigate('User Details', {userId: item.uid}) : console.log('not available')}
                >   
                    <Avatar rounded size={'medium'} source={{uri: item.imageUrl}} icon={{name: 'user', type: 'font-awesome'}}/>
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: 'bold', color: 'white'}}>{item.firstname + ' ' + item.lastname}</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'white'}}>{(item.willing)?'Available': 'Not-Available'}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            );
        
        if(this.props.users.isLoading) {

            return(
                <Loading />
            );
        }
        else if(this.props.users.errMess) {

            return(
                <View>            
                    <Text>{props.dishes.errMess}</Text>
                </View>            
            );
        }  
        return (
            <SafeAreaView>
                    <FlatList
                        data={this.state.data}
                        renderItem={renderListItem}
                        keyExtractor={item => item.uid.toString()}
                        ListHeaderComponent={this.renderHeader}
                        />  
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps)(ABPlusDonorList);