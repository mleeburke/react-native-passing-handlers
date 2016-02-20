## Passing event handlers down a component hierarchy

We want our outermost component to be the one with state.

Here we have a top-level component called "GrandparentFlow" (in index.ios.js)

In its constructor it connects to our kitten API and loads an array of cats into its state. It also has a "removeKitty" function that we want to get called when someone clicks on a cat picture. It should mutate the state - i.e. remove the cat.

That function looks like this:
```
  removeKitty(targetCat) {
    // In the real app we would send a delete request to the API here
    // For now we'll just remove the kitty locally
    console.log('remove kitty called for ', targetCat);
    var remainingCats = this.state.cats.filter((cat) => cat.id !== targetCat.id);
    this.setState({cats: remainingCats});
  }
```

For it to work, it will need to be called with "this" set to the component that maintains state (ie GrandparentFlow) and the argument set to the right cat.


GrandparentFlow instantiates a CatListView component like this:

```
  <CatListView
    cats={this.state.cats}
    clickHandler={this.removeKitty.bind(this)}
  />
```

The bind(this) gives us a copy of removeKitty with "this" bound to GrandparentFlow. We pass this copy to the CatListView. It will be accessible there as this.props.clickHandler.

Then CatListView instantiates individual CatView components:
```
render() {
  var rows = this.props.cats.map((cat) =>{
    return(
        <CatView cat={cat} key={cat.id} clickHandler={this.props.clickHandler.bind(null, cat)} />
      )
  });
```

Here the `clickHandler={this.props.clickHandler.bind(null, cat)}` makes another copy of our original function, with its first argument bound to the current cat and "this" unchanged.

Finally inside the CatView component itself we have `<TouchableHighlight onPress={this.props.clickHandler}>`
```
<TouchableHighlight onPress={this.props.clickHandler}>
  <Image
  source={{uri: cat.image_url}}
  style={styles.thumbnail}
/>
</TouchableHighlight>
```

onPress is the built-in equivalent of the HTML onclick and TouchableHighlight is a button in the phone's UI.

When the user presses the button (which looks like a cat picture,) the onPress event fires this.props.clickHandler, to which we assigned a copy of our removeKitty function. The function is called with "this" set to the GrandparentFlow component, and the first argument set to the current cat. So the function is called and has the right this and the right cat, so can mutate the state.


Incidentally, the "null" in  `clickHandler={this.props.clickHandler.bind(null, cat)}` means "don't override this" - so the copy we get here will still have the this set to GrandparentFlow. For a reminder how bind works, see (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)


