import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Linking,
  TouchableOpacity,
  Share,
} from 'react-native';

// color const
import * as COLOR from '../constents/colorConstents';

// icons
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

class NewsDetails extends Component {
  state = {
    newsImage: '',
    newsDetails: '',
  };

  componentDidMount = () => {
    const {navigation} = this.props;
    let newsImage = navigation.getParam('newsImage');
    let newsDetails = navigation.getParam('newsDetails');

    this.setState({newsImage: newsImage, newsDetails: newsDetails});
  };

  onOpenLinkPress = () => {
    const {navigation} = this.props;
    let newsUrl = navigation.getParam('newsUrl');
    Linking.openURL(newsUrl);
  };

  onSharePress = () => {
    const {navigation} = this.props;
    let newsUrl = navigation.getParam('newsUrl');

    Share.share({
      message: newsUrl,
    });
  };

  render() {
    const {newsImage, newsDetails} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLOR.HEADER_BG} />
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <View style={styles.iconContiner}>
              <AntIcon name="close" size={16} color={COLOR.WHITE} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>News Details</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.onSharePress()}>
              <View style={{marginRight: 20}}>
                <AntIcon name="sharealt" size={20} color={COLOR.WHITE} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onOpenLinkPress()}>
              <View>
                <MaterialIcons
                  name="open-in-browser"
                  size={20}
                  color={COLOR.WHITE}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.newsContiner}>
          <View>
            <Image
              source={{uri: newsImage}}
              style={{width: '100%', height: 220}}
            />
          </View>
          <View style={styles.newsDetails}>
            <Text style={styles.newsTitle}>{newsDetails.title}</Text>
            <View style={{marginTop: 10}}>
              <Text style={styles.newsBody}>{newsDetails.abstract}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsContiner: {
    flex: 1,
    padding: 5,
    elevation: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    backgroundColor: COLOR.HEADER_BG,
    alignItems: 'center',
  },
  headerTitle: {
    color: COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  newsDetails: {
    flex: 1,
    padding: 10,
    paddingBottom: 2,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  newsBody: {
    fontSize: 17,
  },
  iconContiner: {
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
});
