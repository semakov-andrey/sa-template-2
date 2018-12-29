# Front-End template. #
###### Шаблон для вёрстки сайта на nodeJS 11 и webpack 4. ######

### Установка ###
- `npm init --yes`  
- `npm install sa-template-2 --save-dev`

### Особенности установки/обновления ###
- readme.md копируется, если не существует 
- Конфигурация, start.js и build.js заменяются
- .gitignore дополняется необходимыми записями
- package.json:
  - Дополняется зависимостями
  - Дополняется директориями
  - Дополняется настройками

### Основные команды ###
`npm run start` - development - разработка  
`npm run build` - production - сборка   
`npm run module название` - создание модуля с .pug, .scss и .js файлами    
`npm update sa-template-2` - обновление шаблона   
`npm install sa-template-2@version` - обновление шаблона 

### Функции сборки ###
- `html` - компиляция pug в html
- `css` - компиляция sass в css
- `js` - сборка bundle js
- `fonts` - копирование шрифтов
- `compress` - сжатие изображений jpg, png, gif, webp
- `sprite` - генерация svg спрайта

### Используемые технологии ###
- [nodejs](https://nodejs.org/)
- [webpack](https://webpack.js.org/)
- [pug](https://pugjs.org/) + [pug-html-loader](https://github.com/willyelm/pug-html-loader) + [html-loader](https://github.com/webpack-contrib/html-loader) + [html-minifier](https://github.com/kangax/html-minifier)
- [sass](https://sass-lang.com/) + [node-sass](https://github.com/sass/node-sass) + [sass-loader](https://github.com/webpack-contrib/sass-loader)
- [postcss](https://github.com/postcss/postcss) + [postcss-loader](https://github.com/postcss/postcss-loader) + [autoprefixer](https://autoprefixer.github.io/ru/) + [cssnano](https://cssnano.co/)
- [uglifyJS](https://github.com/mishoo/UglifyJS)
- [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) + [svgo](https://github.com/svg/svgo) + [svgo-loader](https://github.com/rpominov/svgo-loader)
- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) + [mozjpeg](https://github.com/mozilla/mozjpeg) + [gifsicle](https://www.lcdf.org/gifsicle/) + [optipng](http://optipng.sourceforge.net/) + [imagemin-webp](https://github.com/imagemin/imagemin-webp)