

var NavBar =React.createClass({
    removeNode:function(){
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
    },
    liClick:function(){
        this.removeNode();
        ReactDOM.render(
            <PicList source="http://laijiadayuan.com/project/apistore/api.php" type="4002" page="1"/>
            ,
            document.getElementById("container")
        )
    },
    newsClick:function(){
        this.removeNode();
        ReactDOM.render(
            <div>
                <NewsList source="http://laijiadayuan.com/project/apistore/news.php" channelId="5572a109b3cdc86cf39001db" channelName="国内最新" title="" page="1" needContent="1" needHtml="1" />
                <CommentBox/>
            </div>
            ,
            document.getElementById("container")
        )
    },
    render:function(){
        return <div className="container">
            <ul className="nav navbar-nav">
                <li><a href="javascript://" onClick={this.liClick}>最新美图</a></li>
                <li><a href="javascript://" onClick={this.newsClick}>最新新闻</a></li>
            </ul>
            <SearchText class="form-control"/>
        </div>
    }
})
//搜索框组件
var SearchText=React.createClass({
    render:function(){
        return <form className="navbar-form navbar-left">
                <div className="form-group"><input type="text" className={this.props.class} id="search" placeholder="请输入关键字!" /></div>
                <button type="submit" className="btn btn-default">搜索</button>
            </form>
    }
})
//渲染图片列表
var PicList = React.createClass(
    {
        getInitialState:function(){
            return {
                picture:[]//保存我们的图片json数组
            }
        },
        componentDidMount:function(){

            $.get(this.props.source,
                {
                    type:this.props.type,
                    page:this.props.page
                },function (res) {
                    res = JSON.parse(res);
                    this.setState({
                        picture: res.showapi_res_body.pagebean.contentlist
                    });
            }.bind(this),'JSON');
        },
        componentDidUpdate:function(){
            $('.thumbnail').magnificPopup({
                type: 'image',
                mainClass: 'mfp-fade'
            });
        },
        render:function(){
             if(this.state.picture.length===0){

                 return <div className="loader">
                             <div className="loader-inner ball-grid-pulse">
                                 <div></div>
                                 <div></div>
                                 <div></div>
                                 <div></div>
                                 <div></div>
                                 <div></div>
                                 <div></div>
                                 <div></div>
                                 <div></div>
                             </div>
                         </div>
             }else{

                 var picList = this.state.picture.map(function(p){
                     var itemList = p.list.map(function(l){
                         return <div className="col-md-3">
                             <a href={l.big} className="thumbnail">
                                 <img src={l.middle}/>
                             </a>
                         </div>
                     })
                     return <div  key={p.itemId} className="col-md-12">
                         <h3>{p.typeName}</h3>
                         <p>{p.title}</p>
                         <p>{p.ct}</p>
                         {itemList}
                     </div>
                 })

                 return <div  className="col-sm-12 col-md-12">
                     {picList}
                 </div>
             }

        }
    }
)
//渲染评论列表
var NewsList = React.createClass(
    {
        getInitialState:function(){
            return {
                news:[],//保存我们的新闻json数组
                timer:null
            }
        },
        componentDidMount:function(){

            this.state.timer=setInterval(function(){
                $.get(this.props.source,
                    {
                        channelId:this.props.channelId,
                        channelName:this.props.channelName,
                        title:this.props.title,
                        page:this.props.page,
                        needContent:this.props.needContent,
                        needHtml:this.props.needHtml,
                    },function (res) {
                        res = JSON.parse(res);
                        this.setState({
                            news: res.showapi_res_body.pagebean.contentlist
                        });
                    }.bind(this),'JSON');
            }.bind(this),3000);

        },
        componentWillUnmount:function(){

            if(this.state.timer){
                clearInterval(this.state.timer);

            }
        },
        componentDidUpdate:function(){

        },
        render:function(){
            if(this.state.news.length===0){

                return <div className="loader">
                    <div className="loader-inner ball-grid-pulse">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }else{
                var newsList = this.state.news.map(function(news){

                        var imghtml = <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MSAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2OTZhMWVmYzUgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTY5NmExZWZjNSI+PHJlY3Qgd2lkdGg9IjE3MSIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI2MC41IiB5PSI5NC44Ij4xNzF4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" alt=""/>

                        if(news.imageurls.length !==0){
                            imghtml =  <img className="media-object" src={news.imageurls[0].url}  width="171"  alt=""/>
                        }
                        return <div className="media">
                            <div className="media-left">
                                <a href={news.link} target="_blank">{imghtml}</a>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading"><a href={news.link} target="_blank">{news.title}</a></h4>
                                <p>{news.desc}</p>
                                <p>{news.content}</p>
                            </div>
                        </div>

                })
                var commentBox=<div/>;
                return <div  className="col-sm-12 col-md-12">
                    {newsList}

                </div>
            }

        }
    }
)
var CommentBox=React.createClass({
    getInitialState:function(){
        return {
            nickname:'网友',//用户昵称
            email:'12345692@qq.com',//邮箱
            comment:'很不错喔！我喜欢这样的新闻！',//评论
            commentNum:100,
            position:'leftTop',//默认左上角
            positionVal:'左上角'
        };
    },
    componentDidMount:function(){
        this.setState({
            commentNum:this.state.comment.length
        });
    },
    submit:function(event){
        event.stopPropagation();
        event.preventDefault();
        console.log(this.state.position);
        console.log(this.state.positionVal);
    },
    nickNameChange:function(event){
        this.setState({
            nickname:event.target.value
        });
    },
    emailChange:function(event){
        this.setState({
            email:event.target.value
        });
    },
    commentChange:function(event){

        this.setState({
            comment:event.target.value
        });
        this.setState({
            commentNum:this.state.comment.length
        });
    },
    selectChange:function(event){
        this.setState({
            position:event.target.value,
            positionVal:event.target.selectedOptions[0].text
        });
    },
    render:function(){
        return <div className="panel panel-default" id="reviewBox">
                    <div className="panel-heading">
                        <h3 className="panel-title">我要评论</h3>
                    </div>
                    <div className="panel-body">
                        <form name="reviewform" onSubmit={this.submit} className="form-horizontal">
                            <div className="form-group">
                                <label  htmlFor="" className="col-sm-2 control-label">昵称：</label>

                                <div className="col-sm-10"><input name="nickname" type="text" value={this.state.nickname} onChange={this.nickNameChange} className="form-control" placeholder=""/></div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-sm-2 control-label">邮箱：</label>

                                <div className="col-sm-10"><input name="email" type="text" value={this.state.email} onChange={this.emailChange} className="form-control" placeholder="" /></div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-sm-2 control-label"></label>
                                <div className="col-sm-10">
                                    <textarea name="comment" id="" cols="30" rows="5" className="form-control" value={this.state.comment} onChange={this.commentChange}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    已经输入{this.state.commentNum}个字！
                                </div>
                            </div>
                            <div className="form-group">
                                 <div className="col-sm-offset-2 col-sm-10">
                                     <select value={this.state.position} onChange={this.selectChange} className="form-control" >
                                         <option value="rightTop" >右上角</option>
                                         <option value="leftTop" defaultValue>左上角</option>
                                         <option value="leftBottom">左下角</option>
                                         <option value="rightBottom">右下角</option>
                                     </select>
                                 </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit"  className="btn btn-default">评论</button>
                                </div>
                            </div>
                        </form>
                    </div>
        </div>
    }
});
ReactDOM.render(
    <NavBar/>
    ,
    document.getElementById("navbar")
)

ReactDOM.render(
<PicList source="http://laijiadayuan.com/project/apistore/api.php" type="4002" page="1"/>
,
document.getElementById("container")
)

