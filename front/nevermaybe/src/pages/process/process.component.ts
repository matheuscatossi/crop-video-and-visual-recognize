import { Component, OnInit } from '@angular/core';
import { ProcessProvider } from 'src/providers/process.provider';

@Component({
    selector: './process.component.css',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.css'],
    providers: [ProcessProvider]
})

export class ProcessComponent implements OnInit {
    uploadedFiles: Array<File>;
    isUpload: boolean;
    src_img = "";

    constructor(
        public processProvider: ProcessProvider
    ) {

    }
    public ngOnInit() {
        this.src_img = "./../../assets/autenticar.gif";

        let self = this;
        document.getElementById('inputGroupFile01').onchange = function() {
           self.upload();
        };

       
        setInterval(function() {
            document.getElementById("img_home").style.display = "inline";
        }, 100);
    }

    public addImageBreak() {
        this.src_img = "./../../assets/autenticar_after_click.png";
    }

    public fileChange(element) {
        
        this.isUpload = true;
        this.uploadedFiles = element.target.files;
    }

    public verify() {
        this.processProvider.verify()
        .subscribe(res => {
            let response = res as any;

            if(response.result == "Você acertou o comando") {
                this.src_img = "./../../assets/validada.gif";
            } else {
                this.src_img = "./../../assets/negada.gif";
            }
            
        }, err=> {
            console.log(err);
        })
    }

    public upload() {
        this.src_img = "./../../assets/loading.gif";
        let formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }

        this.processProvider.uploadDocument(formData)
            .subscribe(res => {
                this.verify();
            }, err => {
                console.log(err);
            })
    }

}