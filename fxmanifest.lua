fx_version 'cerulean'
author 'Marttins | MT Scripts'
description 'Simple FiveM Police radar script'
lua54 'yes'
game 'gta5'

shared_scripts {
    '@ox_lib/init.lua',
    'config.lua'
}

client_scripts {
    'client.lua'
}

ui_page 'web/build/index.html'

files {
    'locales/*',
	'web/build/index.html',
	'web/build/**/*',
    'web/assets/**/*',
}