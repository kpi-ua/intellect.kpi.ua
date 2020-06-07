FROM boclipsconcourse/nginx-spa

WORKDIR /app
COPY ./build/ /usr/share/nginx/html