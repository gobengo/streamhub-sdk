define([
	'streamhub-sdk/content/views/content-view',
	'hgn!streamhub-sdk/content/templates/Tweet',
	'jquery'],
function (ContentView, TwitterContentTemplate, $) {

var extraContext = {
	"__twitterIconUrl": "data:image/png;base64,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",
	"__favoriteIconUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExQTQxQUNFN0NCOEMyNEMzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRDlEQzM3MjQ5QzkxMUUwQTJGN0YyQzFDMzFCQjZCMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRDlEQzM3MTQ5QzkxMUUwQTJGN0YyQzFDMzFCQjZCMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TRQ6TwAAAWFJREFUeNqkUz9rg1AQv4aKIWYoCMVBaUohydila+kS6KDfIZtfo19A/ArN6tQvoJQOOgThjc3WglPB0iGKYtDeSSw2PJOGHpznu7vfvfv3Tqqqgv/QKX1M09znM0J+6zL2DlxwhjzfyuMD9Pt9oy2PDTDKsuxK13UguS3l7wGGw+H9eDwGwzCAJJ07m4ikIE/R6aIoivM8z6X1el2DiUhalkU+D6IoJoIgfKD9Hc+v7QB3ZVnCbDaDyWQCqqrCYDCojZSBbdsQRRGsVivJ87xLVBN/NSUw5Kc0TWsQARpwQ209+ZE/4do9qIM4jgO+73P7QnqyN2BeExnWuAyCgBuA9GRvwNwpYAOTfbuxa+9xxjfVNA3iOIbFYlGvOUk6k57svDH+roMxcF2X0qXblmEY3mD9kizLnXvwQzhfZbPZfOLvC6bLtmk/o7hOkuQWt1I5lMEjOvFeH0M9213pbwEGANQej73JxPetAAAAAElFTkSuQmCC",
	"__replyIconUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExQTQxQUNFN0NCOEMyNEMzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERjc3MUUwRjQ5QzkxMUUwQTJGN0YyQzFDMzFCQjZCMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERjc3MUUwRTQ5QzkxMUUwQTJGN0YyQzFDMzFCQjZCMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Zo1TdAAAALFJREFUeNpi/P//PwMlgImBQkCxAQwgL8AwOkhLS2vApRaGcboAXTNJXiBWMwgwIjudkZERl+YPQPwAiE/MmjXrBcw7GAakp6cTY/MGoCEXYPpQvACUwGYAyOYfSPwAoCsFcIYBuiFA/gIg7gAyV0C9AgIGeAMRm0uAYjeA1AIoV4FgQsJhyAeSUiK6IUC/GyCFC2lJGaiZA0g5QKPyAEychYRUDzJgAbo3GCnNzgABBgAiV2EnaEmOjwAAAABJRU5ErkJggg==",
	"__retweetIconUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExQTQxQUNFN0NCOEMyNEMzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBN0E4QjY3NTQ5QzkxMUUwQTJGN0YyQzFDMzFCQjZCMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBN0E4QjY3NDQ5QzkxMUUwQTJGN0YyQzFDMzFCQjZCMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+DM4SFwAAAHdJREFUeNrsU0EKwCAMM+Jb9Rt+Qz/bGQ+jBMcGMnZZDmpam5aIMLOwgxg28b1A4gJgkpxz5d57r54rmB85tNbsnMBfVqEBW4jMGPgKpZTLTp6rMGvTamQtfN/EO6iZjtfpgb7CygfNMc7a+LS798Wf8f+FcAgwAG7fSBXaBXw9AAAAAElFTkSuQmCC"
};

// Construct a TwitterContentView
var TwitterContentView = function TwitterContentView (opts) {
	ContentView.call(this, opts);
};

TwitterContentView.prototype = new ContentView();

TwitterContentView.prototype.elClass += ' content-tweet ';
TwitterContentView.prototype.template = TwitterContentTemplate;


TwitterContentView.prototype.getTemplateContext = function () {
	return $.extend({}, this.content, extraContext);
};

return TwitterContentView;
});