ngTagEditor: AngularJS tag input, editor
===========

A new tag input, built for AngularJS

## Installation

Add the following files to your application:

```html
<link rel="stylesheet" href="ngTagEditor.css" type="text/css"/>
<script type="text/javascript" src="http://cdn.jsdelivr.net/angularjs/1.2.17/angular.min.js"></script>
<script type="text/javascript" src="ngTagEditor.js"></script>
```

## Usage

### Basic usage

`<tag-editor></tag-editor>` In your html in any form.

It will add a hidden input `<input type="hidden" name="tags">` containing added tags name, separated by a comma.

### Advanced usage

#### Initializing tags

Add something like that to your javascript code:
```javascript
var app = angular.module('app', ['ngTagEditor']);
app.controller('RandomController', function($scope, $http) {
	$scope.tags = [
		{name: 'See'},
		{name: 'how'},
		{name: 'amazing'},
		{name: 'is'},
		{name: 'AngularJS'}
	];
});
```
That goes with the following html:

```html
<form ng-controller="RandomController">
	<tag-editor ng-model="tags" output="name"></tag-editor>
</form>
```

#### Available options

You can pass options by the following way: `<tag-editor option="value"></tag-editor>`.

* `output` which accepts
  * `name`: will add to the hidden input tag names (default).
  * `id`: If you use suggestions, it will replace tag names by tag Ids in the hidden input.
* `fetch`
  * `url/to/my/api.php?query=` required to suggest tags while the user is typing, this way, you can save ids instead of names (see `output`).
  
##### Suggestions

First, give the URL of your API through the `fetch` option.
The data must be formated as follow, as stated [this article](http://labs.omniti.com/labs/jsend).

```json
{
    "status": "success",
    "data": [{
        "id": "45",
        "name": "Say"
    }, {
        "id": "23",
        "name": "Hello"
    }, {
        "id": "68",
        "name": "to"
    }, {
        "id": "77",
        "name": "JSON"
    }]
}
```

## Exemple

See `test.html`