/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CatListView from './src/cat-list-view.js';
const styles= require('./src/styles');

class GrandparentFlow extends Component {

  // This is the component that keeps state
  constructor() {
    super()
    this.state = {cats: []}
    fetch('https://stark-harbor-5038.herokuapp.com/cats')
    .then((response) => response.json())
    .then((jsonArray) => this.setState({cats: jsonArray}))
  }

  removeKitty(targetCat) {
    // In the real app we would send a delete request to the API here
    // For now we'll just remove the kitty locally
    console.log('remove kitty called for ', targetCat);
    var remainingCats = this.state.cats.filter((cat) => cat.id !== targetCat.id);
    this.setState({cats: remainingCats});
  }

  // We pass the click handler to the child component with "this" bound to this component
  render() {
    return (
      <View style={styles.container}>
        <CatListView
          cats={this.state.cats}
          clickHandler={this.removeKitty.bind(this)}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('GrandparentFlow', () => GrandparentFlow);
