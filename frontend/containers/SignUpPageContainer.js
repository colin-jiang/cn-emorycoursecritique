import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'

class SignUpPageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeated: "",
      success: false,
      formErrors: {Email: '', Password: ''},
      emailValid: false,
      passwordValid: false,
      signUpBtnClicked: false
    }
    this.resend = this.resend.bind(this);
  }

  updateFirstname(event){
    console.log(this.state.firstname)
    this.setState({firstname: event.target.value});
  }

  updateLastname(event){
    this.setState({lastname: event.target.value});
  }

  updateEmail(event){
    this.setState({email: event.target.value});
  }

  updatePassword(event){
    this.setState({password: event.target.value});
  }

  updateRepeated(event){
    this.setState({repeated: event.target.value});
  }


  validateFieldName(fieldName){
    let fieldValidationErrors = this.state.formErrors;
    switch (fieldName) {
      case "email":
        var emailStatus = this.checkEmail();
        this.state.emailValid = (emailStatus.length == 0) ? true : false;
        fieldValidationErrors.Email = emailStatus;
        break;
      case "password":
        var passwordStatus = this.checkPwd();
        this.state.passwordValid = (passwordStatus.length == 0) ? true : false;
        fieldValidationErrors.Password = passwordStatus;
        default:
        break;
    }
  }

  checkEmail(){
    var str = this.state.email;
    var reg = /^[a-zA-Z0-9_.%+-]+@emory.edu$/
    if (reg.test(str)){
      return("")
    }
    else{
         Materialize.toast('邮箱必须以“@emory.edu”结尾', 4000);
    }
  }

  checkPwd() {
    var str = this.state.password;
    if (str.length < 6) {
        Materialize.toast('密码必须至少为六位', 4000);

    } else if (str.length > 50) {
         Materialize.toast('密码过长', 4000);
    } else if (str.search(/\d/) == -1) {
         Materialize.toast('密码必须至少包含一个数字', 4000);
    } else if (str.search(/[a-zA-Z]/) == -1) {
        Materialize.toast('密码必须至少包含一个字母', 4000);

    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1) {
        Materialize.toast('密码中不能包含符号', 4000);

    }
    return("");
  }

  signup() {
        if(!this.state.signUpBtnClicked){
          this.setState({signUpBtnClicked:true});
        }
        else{
          return;
        }
        this.validateFieldName("email")
        this.validateFieldName("password")

        if (this.state.password !== this.state.repeated) {
         Materialize.toast("两次密码不一致", 4000);
        }
        else if (!this.state.emailValid | !this.state.passwordValid){
          for (var x in this.state.formErrors){
            if(this.state.formErrors[x].length!=0){
              Materialize.toast(x + this.state.formErrors[x], 4000);

            }
          }
        } else {
        var self=this;
        axios({
          method: 'post',
          url: '/account/signup',
          data: {
            firstname: self.state.firstname,
            lastname: self.state.lastname,
            email: self.state.email,
            password: self.state.password
          }
        })

        .then(function (response) {
          console.log(this);
          console.log(response);
          self.setState({success:true});
          self.props.history.push('/signup?success');
          // window.location.replace("/success");
        })
        .catch(function (error) {
          console.log(error);
          Materialize.toast(error.response.data.message, 4000);

        });
      }
  }

  resend() {
    var self=this;
        axios({
          method: 'post',
          url: '/account/resend-verification',
          data: {
            email: this.state.email
          }
        })
        .then(function (response) {
          console.log(response);
          Materialize.toast("确认邮件已发送至您的邮箱！", 4000);

          //self.props.history.push('/success')
          // window.location.replace("/success");
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  componentWillMount() {
    if(location.search.includes("success"))
    {
      this.setState({success:true});
    }
  }

componentDidMount() {
   $(document).ready(function(){
      $(document).on("keydown", function(e){
         if(e.keyCode == 13 ){
            document.getElementById('signUpBtn').click();
         }
      });
   });
  }
  render() {
    if(this.state.success)
    {
      return(
        <div>

          <div className = "register-body-success">
            <div className = "register-body-main-component-success">
              <div className="register-body-title-success"><h2>发送成功！</h2></div>
                  <div className="inputs-sizes-success">
                    <h3>确认邮件已发送至您的邮箱！</h3>
                  </div>
                  <div className="submit-button-row">
                    <button
                    type="button"
                    className = "submit-button"
                    onClick ={this.resend}>
                    点此重新发送
                  </button>
              </div>
            </div>
          </div>

        </div>
      )
    }
    else
    {
      return(
        <div>

        <div className = "header">
            <Link to='/' className = "header-title" style={{color: '#FFD700'}}> <span className = "header-title-emory">Emory</span>教授说</Link>
        </div>

        <lbody >


          <div id="login-page" className="row">
            <div className="col l6 push-l3 m10 push-m1 s12 z-depth-4 card-panel nohover2" style={{position: 'relative' , top: '50px', padding: '0 48px'}}>
              <form className="login-form">
                <div className="row">
                  <div className="input-field col s12 center">


                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">person</i>
                    <input id="firstname" type="text" value={this.state.firstname}
             onChange={(event) => this.updateFirstname(event)}/>
                    <label htmlFor="firstname" className="center-align">名</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="lastname" type="text" value={this.state.lastname}
             onChange={(event) => this.updateLastname(event)}/>
                    <label htmlFor="lastname">姓</label>
                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input id="username" type="text" value={this.state.email}
             onChange={(event) => this.updateEmail(event)}/>
                    <label htmlFor="username" className="center-align">邮箱</label>
                  </div>
                </div>
                <div className="row margin">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" type="password" value={this.state.password}
             onChange={(event) => this.updatePassword(event)}/>
                    <label htmlFor="password" className="center-align">密码</label>
                  </div>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <input id="rpassword" type="password" value={this.state.repeated}
             onChange={(event) => this.updateRepeated(event)}/>
                    <label htmlFor="rpassword" className="center-align">重复密码</label>
                  </div>
                </div>
                <div className="row margin">
                  <div className="center">
                    <a id="signUpBtn" onClick={() => this.signup()} className="btn-large waves-effect waves-light">点此注册</a>
                  </div>
                </div>
                <div className="input-field">
                  <p className="margin center medium-small sign-up" style={{margin: '30px'}}>已经有账号了？ <Link to='/login'>登录</Link></p>
                </div>

              </form>
            </div>
          </div>



        </lbody>
        </div>
      )
    }
  }
};

const mapStateToProps = state => {
  return{
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPageContainer);
