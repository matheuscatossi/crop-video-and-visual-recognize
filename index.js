let ffmpeg = require('fluent-ffmpeg');
let VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
let fs = require('fs');

let params = {

};

main(params).then(result => { })

function main(params) {
    return new Promise(function (resolve, reject) {


        ffmpeg('./assets/video_example.mp4')
            .on('end', function () {
                console.log('Screenshots taken');
            })
            .on('error', function (err) {
                console.error(err);
            })
            .screenshots({
                // Will take screenshots at 20%, 40%, 60% and 80% of the video
                count: 10,
                folder: './assets/'
            });


        let listRequest = [];
        for (let index = 1; index <= 10; index++) {
            listRequest.push({
                request: requestVisual(index)
            })
        }

        Promise.all(listRequest.map(item => item.request.then(request => ({
            item,
            request
        })))).then(results => {
            let countScore = 0;
            for(let result of results) {
                if(result.request.images[0]){
                    if(result.request.images[0].classifiers[0]) {
                        if(result.request.images[0].classifiers[0].classes[0]) {
                            if(result.request.images[0].classifiers[0].classes[0].score != undefined) {
                                if(result.request.images[0].classifiers[0].classes[0].score > 0.75) {
                                    console.log(result.request.images[0].classifiers[0].classes[0].score);
                                    countScore++;
                                }
                            }
                        }
                    }
                }
            }
            console.log(countScore);
        });

    });
}

function requestVisual(index) {
    return new Promise(function (resolve, reject) {

        var visualRecognition = new VisualRecognitionV3({
            version: '2018-03-19',
            iam_apikey: 'EFC2KiU_nWKRHNuXCgNGrhYOxk2NeLBeZNSlQuwveb82'
        });


        var images_file = fs.createReadStream("./assets/tn_" + index + ".png");
        var classifier_ids = ["DefaultCustomModel_916556356"];
        var threshold = 0.6;

        var params = {
            images_file: images_file,
            classifier_ids: classifier_ids,
            threshold: threshold
        };

        visualRecognition.classify(params, function (err, response) {
            if (err) {
                console.log(err);
                resolve(JSON.stringify(response, null, 2));
            } else {
                resolve(response);
            }
        });
    });
}


