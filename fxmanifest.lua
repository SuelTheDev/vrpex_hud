fx_version 'cerulean'
game {'gta5'}

ui_page 'nui/index.html'

files {
    'nui/**'
}

client_scripts {
    "@vrp/lib/utils.lua",
    'cliente.lua'
}
server_scripts {
    "@vrp/lib/utils.lua",
    'servidor.lua'
}
