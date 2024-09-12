# Xolus
A JSX template engine and a modern html rendering framework.    

Xolus a progressive web framework to build web applications by reducing much complexities in known frameworks. 
It is an attempt to have the old way of building applications using just html, css and javaScript beautiful and interesting again. 
It attempts to solve why you do not require over 300 mb of files just to start a "Hello world!" application. Imagine writing just 
html but in a composable way.    

**A typical HTML file may look like this**    

```tsx
<body>
    <div class="container">

        <div id="item1" class="row">
            <div class="column">
                <div class="mt-5"></div>
            </div>
            <div class="column">
                <div class="mt-5"></div>
            </div>
        </div>

        <div id="item2" class="row">
            <div class="column">
                <div class="mt-5"></div>
            </div>
            <div class="column">
                <div class="mt-5"></div>
            </div>
        </div>

        <div id="item3" class="row">
            <div class="column">
                <div class="mt-5"></div>
            </div>
            <div class="column">
                <div class="mt-5"></div>
            </div>
        </div>

    </div>
</body>
```

**It may look this way with Xolus**    

> *App.jsx*     

```tsx
import { createComponent } from 'xolus'

const App = createComponent({
    // Define the view ou UI of the component
    template({parentRef, componentRef, props}){
        const ids = ['item1','item2','item3']
        return (
            <body>
                <div className="container">
                    <Slot props={ids[0]}>{Row}</Slot>
                    <Slot props={ids[1]}>{Row}</Slot>
                    <Slot props={ids[2]}>{Row}</Slot>
                </div>
            </body>
        )
    },
    // Gather all data needed for the UI or view to render
    templateData(){
        return <template-data done={true}></template-data>
    },
})

export default App

```   

**It may also look this way with Xolus Maps**    

> *App.jsx*    

```tsx
import { createComponent } from 'xolus'

const App = createComponent({
    // Define the view ou UI of the component
    template({parentRef, componentRef, props}){
        const ids = ['item1','item2','item3']
        return (
            <body>
                <div className="container">
                    <Map data={ids}>{Row}</Map>
                </div>
            </body>
        )
    },
    // Gather all data needed for the UI or view to render
    templateData({componentRef, done}){
        const data = fetch('/get/data').then(()=>done(componentRef))
        return <template-data done={false}></template-data>
    },
})

export default App

```

The xolus codes above will be converted to JavaScript codes that are only executable on the server to generate the corresponding HTML. 
Your template codes only runs on the server hence, can perform all database requests for data in the `templateData` method. The 
generated HTML is shipped along with `action` codes (more on action codes later) that allows your application to be interactable at first 
sight with [statestore.js](https://github.com/kbismark/statestore.js) as the backbone for ensuring data access to your application both on the 
server and on the browser. (TODO: Make the application composable on the broswer too since the template codes aren't available on the browser.)    
Xolus also exposes APIs to allow pre-generation of HTML files for static websites.      

Try Xolus with `npx create-xolus-app myapp`. Create Xolus App comes with Expressjs as the server framework and xolus us your JSX template engine.    

```js
const {configure, renderPage, getSiteStats } = require('xolus')
const express = require('express');
// import from App.jsx
const App = require('./dist/App').default;
const app = express();
// Configure Xolus Renderer
configure({
    root: __dirname
});

app.get('/', async (req, res)=>{
    res.setHeader('content-type','text/html');
    let html = ''
    try {
        html = await renderPage(App, {/* some props... */})
    } catch (error) {
        throw error
    };
    res.status(200)
    .send(html);
})

```    


**This project is in development and has some features not fully stable and not recommended for any production use. Unless you know what you are doing, do not use in production yet!**    
