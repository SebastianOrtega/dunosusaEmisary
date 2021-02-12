Instalar node

Instalar git

Instalar nodemon

Instalar programa que emula al Emisario

git clone https://github.com/SebastianOrtega/dunosusaEmisary.git

git checkout emulacion

npm i

nodemon

Instalar Programa que emula a tu programa en java

git clone https://github.com/SebastianOrtega/capturaJSONDuno.git

npm i

node server.js

Habilitar puertos en el firewall

firewall-cmd --zone=public --add-port=8000/tcp --permanent
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload

Prueba Emulador Emisario

curl --location --request POST 'http://192.168.0.188:8080' \
--header 'Content-Type: application/json' \
--data-raw '{ "Equipo": "Equipo1",
"Entrada": 2,
"numerotags": 3,
"datos":
[ [ "E200421A0150601500955235",
" 13:17:03.229",
"5",
"-40.4",
"Equipo1",
"0" ],
[ "E200421A0A606015009552C6",
" 13:17:03.234",
"5",
"-57.7",
"Equipo1",
"0" ],
[ "313030303030303030303030",
" 13:17:03.258",
"4",
"-41.0",
"Equipo1",
"1" ] ] }'
