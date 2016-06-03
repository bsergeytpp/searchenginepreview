# For our translators

Thank you very much for helping me to improve the extension and your contribution to this OpenSource software.
Now, what can you do? 

Each language needs to be added separately in a subfolder of the corresponding locale folder of the extension.  
For the CRX (Chromium like browsers) extension that is the folder _locales, for the OEX (old Opera 12.x browser) extenion that is the folder locale.
For example the french (FR) translation of the CRX extension resides in _locales/fr/, the russian (RU) translation in _locales/ru/ and so on.

## Translation of CRX enxtension

You need to translate strings in these files

* _locales/.../message.json

If you like to be mentioned as translator of the extension dont forget to add a line with your name or nick and a link to your website in messages.json.

## Translation of OEX enxtension

You need to translate strings in these files:

* locale/.../options.html
* locale/.../popup.html
* config.xml

Please, dont forget to add a line with your name or nick and a link to your website in messages.json and popup.html.

And you need to add a line to file config.xml:

1. change the "en" value to your language 
2. translate the string in description element to your language
```
<description xml:lang="en">
	SearchenginePreview - a extension for Opera and Chromium-like browsers, showing thumbnails of websites in search results of many search engines.
</description>
```

## Testing the extension

For testing tne translation you need to open in the extension manager of your browser.  
The extension manager must be set to Developer mode.

### Testing in Opera 12

In Opera 12 you drag the config.xml into the extension manager and the extension can be tested.  
If you channge something in the translated files dont forget to Reload the extension.

### Testing in Chromium-like browsers

In Extension manager "Load unpacked extension..." and select the folder where the manifest.json is stored.   
If you change something in the translated files dont forget to "Reload" the extension in Extension manager to see the changes.

### Contributing the translation

Please set a Pull request at Github for your changes.

I will check it and integrate your patches and translations.

## Thanks

Thanks a lot for testing and helping. 

You will be mentioned and added as a translator in changelog and extension popup.
