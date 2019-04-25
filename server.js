const express = require('express');
const app = express();
const html = require('pa11y-reporter-html');
const pa11y = require('pa11y');

app.get('/', (req, res) => {
    pa11y(req.query.url,
        {log: {
                debug: console.log,
                error: console.error,
                info: console.info
            },
                includeNotices: true,
                includeWarnings: true
            }).then(async results => {
    // Returns a string with the results formatted as HTML
    const htmlResults = await html.results(results);
    res.send(htmlResults);
}, async error =>{
        console.log(error);
    var htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
    
            <meta charset="utf-8"/>
            <title>Accessibility Report For ` + req.query.url +`</title>
    
            <style>
    
                    html, body {
                            margin: 0;
                            padding: 0;
                            background-color: #fff;
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 16px;
                            line-height: 22px;
                            color: #333;
                    }
                    li {
                            margin-bottom: 15px;
                    }
                    h1, h2, p, pre, ul {
                            margin-top: 0;
                            margin-bottom: 0;
                    }
                    h1 {
                            margin-bottom: 10px;
                            font-size: 24px;
                            line-height: 24px;
                    }
                    h2 {
                            font-size: 16px;
                    }
                    pre {
                            white-space: pre-wrap;
                            overflow: auto;
                    }
    
                    .page {
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 25px;
                    }
    
                    .counts {
                            margin-top: 30px;
                            font-size: 20px;
                    }
                    .count {
                            display: inline-block;
                            padding: 5px;
                            border-radius: 5px;
                            border: 1px solid #eee;
                    }
    
                    .clean-list {
                            margin-left: 0;
                            padding-left: 0;
                            list-style: none;
                    }
                    .results-list {
                            margin-top: 30px;
                    }
    
                    .result {
                            padding: 10px;
                            border-radius: 5px;
                            border: 1px solid #eee;
                    }
                    .error {
                            background-color: #fdd;
                            border-color: #ff9696;
                    }
                    .warning {
                            background-color: #ffd;
                            border-color: #e7c12b;
                    }
                    .notice {
                            background-color: #eef4ff;
                            border-color: #b6d0ff;
                    }
    
            </style>
    
    </head>
    <body>
    
            <div class="page">
    
                    <h1>Accessibility Report For `+ req.query.url +`</h1>
    
                    <p class="counts">
                            <span class="count error">0 Errors</span>
                            <span class="count warning">0 Warnings</span>
                            <span class="count notice">0 Notices</span>
                    </p>
    
                    <ul class="clean-list results-list">
                    </ul>
    
            </div>
    
    </body>
    </html>`
    res.send(htmlTemplate);
});
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
