'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
const styles= require('./styles');

class CatView extends Component {
  render() {
    var cat = this.props.cat
    return (
      <View style={styles.catContainer}>

        <TouchableHighlight onPress={this.props.clickHandler}>
          <Image
          source={{uri: cat.image_url}}
          style={styles.thumbnail}
        />
        </TouchableHighlight>

        <View style={styles.rightContainer}>
          <Text style={styles.instructions}>
          {cat.name}  ({cat.id}) Click picture to delete
          </Text>
        </View>

      </View>
    );
  }
}

export default CatView