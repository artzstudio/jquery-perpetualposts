# jQuery.perpetualPosts

This plugin makes it easy to load in content as users scroll to the end of the page.

## Usage
### HTML
Create an anchor link linking to the content you want to inject on click or user scroll.
```
<a class="perpetual-posts" href="/post/post-to-load">Title of Post to Load</a>
```
### JavaScript
Load this code after the DOM has loaded.
```
jQuery('.perpetual-posts').perpetualPosts({
	sonar: true,
	callback: function (data) {
		// Manipulate data
		return data;
	}
});
```
