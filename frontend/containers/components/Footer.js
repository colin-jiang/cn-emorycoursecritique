import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className="page-footer"
        style={{
          background: "#d28e00"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">欢迎!</h5>
              <p className="grey-text text-lighten-4">
                Emory教授说旨在帮助埃默里大学的在校留学生选择最适合自己的课程和教授。其中所有评论均为匿名评论。
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">相关链接</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="/about">
                    关于我们
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="/faq">
                    常见问题
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="mailto:colin.jiang@emory.edu?Subject=Hey%20EmoryCourseCritque">
                    联系我们
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2017 CAMAJA
            <a className="grey-text text-lighten-4 right">
              Atlanta, GA
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
