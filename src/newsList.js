import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native';

// api constents
import * as API from '../constents/apiConstents';

// key constnets
import {KEY} from '../constents/apiKeys';

// color const
import * as COLOR from '../constents/colorConstents';

// icons
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

class NewsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsData: '',
      isLoading: false,
      newsHolder: '',
    };
  }

  componentDidMount = async () => {
    // news url
    const news_url = `${API.BASE_URL}/${API.MOST_VIEWED}=${KEY}`;

    // fetch news
    try {
      this.setState({isLoading: true});
      let responce = await fetch(news_url);

      let responseJson = await responce.json();

      if (responce.status == 200) {
        this.setState({
          newsData: responseJson.results,
          isLoading: false,
          newsHolder: responseJson.results,
        });
      } else if (responce.status == 409) {
        console.log('no new found');
        this.setState({newsData: '', isLoading: false});
      } else {
        console.log('Error occured try agin later');
        this.setState({newsData: '', isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  searchData = (text) => {
    const newData = this.state.newsHolder.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      newsData: newData,
      text: text,
    });
  };

  render() {
    const {newsData, isLoading} = this.state;

    if (isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={COLOR.HEADER_BG} />
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>News List</Text>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
            <Text style={{fontWeight: 'bold'}}>
              Loading news please be tolerant...
            </Text>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLOR.HEADER_BG} />
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>News List</Text>
          <TouchableOpacity onPress={() => this.componentDidMount()}>
            <View style={styles.refreshContiner}>
              <Ionicons name="md-refresh" size={20} color={COLOR.WHITE} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.newsListContiner}>
          {/* serachbar continer */}
          <View style={styles.searchbarContiner}>
            <TextInput
              style={{width: '90%', height: '100%'}}
              onChangeText={(text) => this.searchData(text)}
            />
            <TouchableOpacity>
              <View>
                <AntIcon name="search1" size={20} color={COLOR.BALCK} />
              </View>
            </TouchableOpacity>
          </View>
          {newsData.length === 0 ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>No news found</Text>
            </View>
          ) : (
            // news list
            <FlatList
              data={newsData}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.props.navigation.navigate('newsDetails', {
                      newsImage: item.media[0]['media-metadata'][2].url,
                      newsDetails: item,
                      newsUrl: item.url,
                    })
                  }>
                  <View style={styles.newsList}>
                    <View>
                      <Image
                        style={styles.imageContiner}
                        source={{uri: item.media[0]['media-metadata'][2].url}}
                      />
                      <View style={{padding: 5, backgroundColor: COLOR.WHITE}}>
                        <Text style={styles.newTitle}>{item.title}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={({id}, index) => id}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
export default NewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsListContiner: {
    flex: 1,
    padding: 20,
    paddingBottom: 2,
  },
  newsList: {
    width: '100%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    marginBottom: 15,
    elevation: 3,
  },
  imageContiner: {
    width: '100%',
    height: 200,
    backgroundColor: COLOR.IMAGE_BG,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: COLOR.HEADER_BG,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerTitle: {
    color: COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  newTitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  searchbarContiner: {
    width: '100%',
    height: 45,
    backgroundColor: COLOR.WHITE,
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 0.1,
    elevation: 3,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshContiner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 50,
  },
});
