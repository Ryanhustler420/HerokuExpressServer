class HtmlTemplateGenerator {

    static table(object = {}) {
        let trs = ``;
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                trs += `<tr><td>${key}</td><td>${element}</td></tr>`
            }
        }
        return `
            <!DOCTYPE html><html><head><style>table, th, td { border: 1px solid; border-collapse: collapse; padding: 10px; }</style></head><body>
            <h2>Data that you have provided to us.</h2><table><tr><th>Fields</th><th>Values</th></tr>${trs}</table></body></html>
        `;
    }

    static boilerplate() {
        return `<!DOCTYPE html><html><head><style>table, th, td { border: 1px solid; } body { margin: 20px; box-shadow: 2px 2px 20px 2px rgba(0,0,0,.3); max-width: 30%; border-radius: 20px; } div.pad { padding: 15px; cursor: pointer; } </style></head>
        <body><div class="pad"><strong>Company Private Limited,</strong><br />Jamshedpur, Jharkhand, 832108</div><hr><div class="pad"><b>+91 89690 88400</b></div></body></html>`;
    }

}

module.exports = HtmlTemplateGenerator;