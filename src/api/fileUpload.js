const formidable = require('formidable')
const config = require('../../config')
const path = require('path')
const fs = require('fs')
function imgUpload(req,res){
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8';                                //设置编码
    form.uploadDir = path.join('./', config.filePath)   //设置上传目录
    form.keepExtensions = true;                             //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;                   //文件大小
    form.parse(req, function(err, fields, files) {
        
        if (err) {
            res.locals.error = err;
            res.json({
                result: false,
                msg: '上传文件失败'
            })
            return;        
        }  
        
        var extName = '';  //后缀名
        switch (files.imgUpload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;         
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;         
        }

        if(extName === ''){
            res.locals.error = '只支持png和jpg格式图片';
            return;                   
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);
        fs.renameSync(files.imgUpload.path, newPath);  //重命名
    });

    res.locals.success = '上传成功';
    res.json({
        result: true,
        msg:'成功',
        url: newPath
    }); 
    console.log(req.files.imgUpload)
}

module.exports = {
    imgUpload
}