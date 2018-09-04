//import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import ResultInfo from './resultInfo';
import FailInfoView from './failInfoView';
import ShowInputView from './showInputView';
import Myapp from './myapp';
// import Background from './img/bg1.jpg';
//采用导入图片包的方式
//import logo from './img/logo.png';//注意图片包要放在和App.js(也就是当前导入图片包的js文件)同一级目录下
import logo from './img/Video.png';
//（同个包下,本demo需要放在src目录下）
// <img src={logo} className="img">

//下面写法也是可以的，但前提是装有图片的img包要放在public文件下
// <img src="../img/logo.png" className="img">
//<img src="./img/logo.png" className="img">
// <img src="img/logo.png" className="img">

var NebPay = require("./dist/nebpay");
var nebPay = new NebPay();

console.log(nebPay)

var Nebulas = require('nebulas')
var Neb = Nebulas.Neb; // Neb
//var neb = new Neb(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
var neb = new Neb(new Nebulas.HttpRequest("https://mainnet.nebulas.io"));
var Account = Nebulas.Account;
var api = neb.api;
//把部署在测试网上的合约的地址赋给常量dappAddress
const dappAddress = "n1iFu87ifaQkuGBEgtwo2tAq1cpTNMVVUhB"
//const dappAddress = "n1hzd3q6g9sqUvVp63b2joqoh2ysv6zxDN1"
//主网合约地址：n1iFu87ifaQkuGBEgtwo2tAq1cpTNMVVUhB
var text ="";

class App extends React.Component {

  // 构造函数
  constructor(props) {
    super(props)
    // state里面的内容属于私有，只有内部能够访问
    // 状态机变量
    // 一旦状态机变量的值一旦发生变化，就会重新调用render函数渲染UI
    this.state = {
      isResult: false,
      resultObj: {},
      isSearchFail: false,
      isShowInputView: false,
      isShowInputRef:true
    }
  }
  ApiGet=(inputRef)=>{
    //console.log(this.refs.inputRef.value)
    // var from = "n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw"
    var from = "n1SUprfkQnwJekKh6DPnNyqTYSvdUCTMkmR"
    //n1SUprfkQnwJekKh6DPnNyqTYSvdUCTMkmR
    var value = "0";
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var callFunction = "get";
    // var callArgs = "[\"" + this.refs.inputRef.value + "\"]"; //in the form of ["args"]
    var callArgs = "[\"" + inputRef+ "\"]"; //in the form of ["args"]
    var contract = {
      "function": callFunction,
      "args": callArgs
    }

    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then( (resp) => {

      console.log("数据查询完成\n")
      console.log(resp)//返回一个对象，该对象含有result，execute_err，estimate_gas三个属性
      //{result: "{"key":"liyuechun","value":"黎跃春","author":"n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw"}",
      //execute_err: "",
      //estimate_gas: "20223"}
      console.log(resp["result"])
      if (resp["result"] !== "null") {
        console.log("========================")
        //修改状态机变量的值
        // 如何修改状态机变量的值
        // this.state.isResult = true
        // 正确的姿势
        this.setState({isResult: true})
        this.setState({isShowInputView: false})
        // this.setState({resultObj: JSON.parse(resp["result"])})
        // "Error: empty key"
        var obj = {}
        if (resp["result"] == "Error: empty key") {
          obj["key"] = ""
          obj["value"] = resp["result"]
          obj["author"] = ""
        } else {
          obj = JSON.parse(resp["result"])
        }
        this.setState({resultObj: obj})

      } else {
        console.log("-------------------------")
        this.setState({isResult: false})
        this.setState({isSearchFail: true})
        this.setState({isShowInputView: false})
      }


    }).catch(function (err) {

      console.log("error:" + err.message)
    })


  }

  // static Submit = ()=>{
  //   console.log("kkkkkkkk")
  // }

  cbPush = (resp) => {
    console.log("response of push: " + JSON.stringify(resp))
    setInterval(() => {
      api.getTransactionReceipt({hash: resp["txhash"]}).then((receipt) => {
        console.log("判断数据提交到区块链的状态")
        // console.log(receipt)
        if (receipt["status"] == 2) {
          console.log("pending.....")
        }else {
          console.log("交易成功......")
        }
      });
    }, 5000);

  }

  render() {
    return (
      /*这里采用es6语法，使用className关键字来链接样式*/

      <div className="div0"  type="text/babel">
        <div className="div00">
        Video World
        </div>
        <img src={logo} className="img">
        </img>
        <Myapp
          isappInputRef={this.state.isShowInputRef}
          myApiGet={(resp)=>{
            this.ApiGet(resp)
            text = resp
        }} />
        {
            this.state.isShowInputView ?
            <ShowInputView
              //addText={this.refs.inputRef.value}
              addText={text}
              addFunction={()=>{
                this.cbPush
              }}
            />
            :
            <div style={{display: "flex",width: "100%",justifyContent: 'center'}}>
              {
                this.state.isResult ?
                <ResultInfo
                  keyInfo={this.state.resultObj["key"]}
                  valueInfo={this.state.resultObj["value"]}
                  accountInfo={this.state.resultObj["author"]}
                />
                :
                <div>
                {
                  this.state.isSearchFail?
                  <FailInfoView
                    addFunc={() => {
                      console.log("app.js FailInfoView")
                      this.setState({isSearchFail:false,isShowInputView: true})
                      this.setState({isShowInputRef:false})
                    }}
                    //searchText={this.refs.inputRef.value}/>
                    searchText={text}/>
                  :
                  <div></div>
                }
                </div>
              }
            </div>
        }
      </div>

    );
  }
}

export default App;
