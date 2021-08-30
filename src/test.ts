import sharp from "sharp";



sharp('public//thumbnails//standart.png')
  .resize({
    fit: sharp.fit.fill,
    width: 150,
    height: 150
  })
  .toFile('public//thumbnails//standar.png')
  .then((e ) =>console.log(e))
  .catch(console.log)


