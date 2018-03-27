/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

 CKEDITOR.editorConfig = function( config ) {
 	config.toolbarGroups = [
 		{ name: 'document', groups: [ 'document', 'mode', 'doctools' ] },
 		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
 		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
 		{ name: 'forms', groups: [ 'forms' ] },
 		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
 		{ name: 'links', groups: [ 'links' ] },
 		{ name: 'tools', groups: [ 'tools' ] },
 		'/',
 		{ name: 'styles', groups: [ 'styles' ] },
 		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
 		{ name: 'colors', groups: [ 'colors' ] },
 		{ name: 'insert', groups: [ 'insert' ] },
 		{ name: 'others', groups: [ 'others' ] },
 		{ name: 'about', groups: [ 'about' ] }
 	];

 // 	config.removeButtons = 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,SelectAll,Scayt,About,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,BidiLtr,BidiRtl,Flash,PageBreak,Iframe,Language,Format,Smiley,Replace,Subscript,Anchor';

    config.extraPlugins = 'autogrow';

    config.autoGrow_minHeight = 500;
    // config.autoGrow_maxHeight = 600;

    config.extraPlugins = 'uploadimage';
    config.extraPlugins = 'uploadwidget';
	config.filebrowserUploadUrl = '../../api/File/file_upload__single_form_readAsArrayBuffer';
	config.pasteFromWordRemoveStyles = false;
	config.pasteFromWordRemoveFontStyles = false;
	config.entities_processNumerical = true;
	config.forceSimpleAmpersand = true;
	config.specialChars = [];
	
 };
