/* eslint-disable */
let regList = {
  phone: /^[1][3,4,5,7,8][0-9]{9}$/,
  // eslint-disable-next-line no-useless-escape
  email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  // password: /^[a-zA-Z0-9]{8,20}$/,
  password: /^[a-zA-Z0-9\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、\`\~\!\#\$\%\^\&\*\(\)\_\[\]{\}\\\|\;\'\'\:\"\"\,\.\/\<\>\?]{8,20}$/,
  username: /^[a-zA-Z0-9]{6,16}$/,
  //teamName:/^[a-zA-Z0-9]([a-zA-Z0-9]{6,30})$/,
  teamName: /^[a-zA-Z0-9]{6,30}$/
}
// 默认规则错误信息
let msgList = {
  phone: '请输入正确的手机号码',
  email: '请输入正确的邮箱',
  password: "密码由数字，大小写字母以及标点符号组成，请输入8-20位密码",
  username: "用户名格式不正确",
  teamName: "团队名称只能包含字母和阿拉伯数字，长度限定在6-30个字符"
}

// // 检测非空
// function checkEmpty(ruleValue, dom, va) {
//   return vaForm.value.trim() !== ''
// }

// // 检测正则
// function checkReg(ruleValue, dom, va) {
//   return ruleValue.test(vaForm.value)
// }

//  添加class
function addClass(kls, dom) {
  kls = " " + kls + " ";
  let classVal = dom.getAttribute("class");
  if (classVal == null) {
    dom.setAttribute("class", kls);
  } else if (classVal.indexOf(kls) == -1) {
    classVal = classVal.concat(kls);
    dom.setAttribute("class", classVal);
  }

}

// 删除class
function removeClass(kls, dom) {
  let classVal = dom.getAttribute("class");
  if (classVal == null) {

  } else {
    classVal = classVal.replace(kls, "");
    dom.setAttribute("class", classVal);
  }

}

//判断是否是dom元素
function isElement(obj) {
  if (typeof obj != 'object') {
    return false
  }
  return (typeof HTMLElement === 'object') ?
    (obj instanceof HTMLElement) :
    !!(obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string');
}

//取得form
function getForm(obj) {
  let thisForm; //定义当前的form对象
  if (isElement(obj)) {
    thisForm = obj;
  } else {
    thisForm = document.getElementById(obj);
  }
  return thisForm
}

//验证每一个元素
function validateChildNodes(rForm) {
  let result = [];
  let inputs = rForm.getElementsByTagName("input");
  let selects = rForm.getElementsByTagName("select");
  let textareas = rForm.getElementsByTagName("textarea");
  for (let i = 0; i < inputs.length; i++) {
    let rules = inputs[i].getAttribute("rules");
    if (rules == null) {
      continue;
    }
    let val = inputs[i].value;
    result.push(checkReg(rules, val, inputs[i]))
    // console.log(checkReg(rules, val))
  }

  for (let i = 0; i < selects.length; i++) {
    let rules = selects[i].getAttribute("rules");
    if (rules == null) {
      continue;
    }
    let val = selects[i].value;
    result.push(checkReg(rules, val, selects[i]))
    // console.log(checkReg(rules, val))
  }

  for (let i = 0; i < textareas.length; i++) {
    let rules = textareas[i].getAttribute("rules");
    if (rules == null) {
      continue;
    }
    let val = textareas[i].value;
    result.push(checkReg(rules, val, textareas[i]))
    // console.log(checkReg(rules, val))
  }
  result.validate = true;
  for (let i = 0; i < result.length; i++) {
    if (!result[i].validate) {
      result.validate = false
    }
  }
  //console.log(result)
  return result
}

//处理规则  返回结果和消息
function checkReg(str, val, dom) {
  let rules = str.trim();
  let flg = true;
  let result = {
    elem: dom,
    rules: [],
    validate: false
  }
  //拆分数组
  if (rules.indexOf("|") != -1) {
    rules = rules.split("|");


    for (let i = 0; i < rules.length; i++) {
      if (regList[rules[i]].test(val) == false) {


        result.rules.push({
          name: rules[i],
          msg: msgList[rules[i]]
        });

        addClass("error", dom);
      } else {
        result.validate = true;
      }
    }
  } else {
    if (regList[rules].test(val) == false) {
      result.rules.push({
        name: rules,
        msg: msgList[rules]
      });
      result.validate = false;
      addClass("error", dom);
    } else {
      result.validate = true;
    }
  }
  //最后判断是否是验证通过
  if (result.validate == true) {
    removeClass("error", dom);
  }
  return result
}

// 传入一个id 或者传入一个dom
export const validateForm = function (domOrStr) {
  let rForm = getForm(domOrStr);
  return validateChildNodes(rForm)

}

/* 是否手机号码*/
export const isPhone = function (value) {
  let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (value == '' || value == undefined || value == null) {
    return false
  } else {
    if ((reg.test(value)) && value != '') {
      return true
    } else {
      return false
    }
  }
}

/* 是否邮箱*/
export const isEmail = function (value) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
  if (value == '' || value == undefined || value == null) {
    return false
  } else {
    if (reg.test(value)) {
      return true
    } else {
      return false
    }
  }
}