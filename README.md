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

You can pass options by the following way: `<tag-editor option="value"></tag-editor>`.

#### Available options

* output
  * name: will add to the hidden input tag names (default).
  * id: If you use suggestions, it will replace tag names by tag Ids in the hidden input.

## Exemple

See `test.html`