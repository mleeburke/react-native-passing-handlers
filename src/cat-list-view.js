'use strict';
import React, {
  AppRegistry,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CatView from './cat-view';
const styles= require('./styles');

class CatListView extends Component {

  // We pass the click handler to the "grandchild component with its first argument bound to the cat
  // The "null" to bind means don't override - this handler will fire with "this" set to the
  // GrandparentFlow component
  render() {
    var rows = this.props.cats.map((cat) =>{
      return(
        <CatView cat={cat} key={cat.id} clickHandler={this.props.clickHandler.bind(null, cat)} />
        )
    });

    return (
      <View  style={styles.container}>
      {rows}
      </View>
    );
  }
}
export default CatListView
