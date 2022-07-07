function compressImage(image, width) {
    return new Promise((resolve, reject)=> {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const reader = new FileReader();
        const img = new Image();
    
        reader.addEventListener('load', () => {
            img.src = reader.result;
        });
    
        img.addEventListener('load',() => {            
            if(width>image.width) {
                resolve(reader.result);
            } else {
                const asRatio = parseFloat((img.width / img.height).toFixed(2));
                const height = width/asRatio;

                canvas.width = width;
                canvas.height = height;
    
                // console.log(img.width, img.height)
                // console.log(width, height)
    
                ctx.drawImage(img, 0, 0, width, height);
                
                resolve(canvas.toDataURL('image'));
            }
        });
    
        reader.readAsDataURL(image);
    });
}


export default compressImage;
