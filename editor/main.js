
const {app, BrowserWindow,ipcMain,dialog} = require('electron')

let editorWin

let debugMode = true;

let editorOnlineUrl = 'http://192.168.199.139:808/editor/index.php?version='+Math.random()+'_'+Math.random()*9999

function createEditor(){
    editorWin = new BrowserWindow({
      width:1920,
      height:1080,
      frame:false,
      backgroundColor:'rgba(0,0,0,0.8)',
      modal:true,
      scrollBounce:true,
  })
    editorWin.loadURL(editorOnlineUrl)
    editorWin.on('closed',()=>{
        editorWin = null
    })
    if(debugMode){
        //editorWin.webContents.openDevTools()
    }
    ipcMain.on('ctrlbar-message', (event, arg) => {
        switch(arg.type){
          case 'minum':
              editorWin.minimize();

          break;
          case 'oringin':
              if(!editorWin.isMaximized()){
                  editorWin.maximize();
                  
              }else{
                  editorWin.unmaximize();

              }
          break;
          case 'close':
              editorWin.close();
          break;
          case 'openfile':
              dialog.showOpenDialog({
                  properties: ['openFile','multiSelections'],
                  filters: [
                  {name: 'js css html files', extensions: ['html', 'css', 'js']},
              ]
              },(fileurls)=>{
                  if(!fileurls){
                       return;
                  }
                  //这是一个数组
                  //我们现在这个项目暂时只是支持一个读取
                  let fileurl = Array.prototype.shift.call(fileurls);
                  let last=fileurl.lastIndexOf('\\');
                  let filename = fileurl.substr(last+1);
                  fileurl = fileurl.toString();
                  start = fileurl.indexOf('.');
                  extension = fileurl.substr(start+1);
                  let data = {
                      type:'openfile',
                      fileurl:fileurl,
                      extension:extension,
                      filename:filename
                  }
                  event.sender.send('ctrlbar-message', data);
              });

          break;
        }

    })

}

app.on('ready', createEditor)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
    app.quit()
}
})

app.on('activate', () => {
    if (editorWin === null) {
    createEditor()
}
})

