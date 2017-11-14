/**
 *
 * @author paian<pai_an@qq.com>

 * @since  17/8/25
 */
'use strict';

function isWindow(obj) {
  return obj != null && obj === obj.window;
};

var version = '1.0.0';

var myQuery = function(selector, context){
  return new myQuery.fn.init(selector, context);
};

var slice = Array.prototype.slice;

var toString = Object.prototype.toString;

var hasOwn = Object.prototype.hasOwnProperty;

var getProto = Object.getPrototypeOf;

var indexOf = Array.prototype.indexOf;

var class2type = {};
'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').map(function(item, index){
  class2type[ "[object " + item + "]" ] = item.toLowerCase();
});

myQuery.fn = myQuery.prototype = {
  // 当前版本号
  myQuery: version,

  constructor: myQuery,

  // 默认的myQuery对象的length为0
  length: 0,

  toArray: function(){
    return slice.call(this);
  },

  // 若传参，返回第个元素；若不传参或传入null/undefined，返回全部
  get: function(num){
    if (num == null){
      return slice.call(this);
    }

    return num < 0 ? this[num + this.length] : this[num];
  },

  // 把一个元素数组压入栈中，有了这个方法，就可以在链式调用的时候，配合end来回切换选中的元素
  pushStack: function(elems){
    // Build a new myQuery matched element set
    var ret = myQuery.merge(this.constructor(), elems);

    // 以prevObject指针来保存上一步选中内容，以便于重新取回
    ret.prevObject = this;

    return ret;
  },

  each: function(callback){
    return myQuery.each(this, callback); //??
  },

  eq: function(i){
    var len = this.length,
      j = +i + (i < 0 ? len : 0); //如果参数i小于0，那么需要加上一个长度
    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
  },

  first: function(){
    return this.eq(0);
  },

  last: function(){
    return this.eq(-1); //基于eq中如果参数i小于0，那么会加上一个长度的逻辑
  },

  end: function(){
    return this.prevObject || this.constructor(); //返回上一步选中的内容（若有），若没有上一步选中的内容，则返回this.constructor()，即myQuery对象
  },

  // 下面几个方法仅限于内部使用，效果与Array的相关方法相同, not like a myQuery method.
  push: push,
  sort: Array.prototype.sort,
  splice: Array.prototype.splice
};

/**
 *
 * @param {Boolean} isDeepCopy - 是否深拷贝，可选参数
 * @param {Object} target - 被合并往的对象
 * @param {Object} obj - 需要增加的内容的对象，可以传多个对象
 */
myQuery.extend = myQuery.fn.extend = function(){
  var options,
    name,
    targetItemValue,
    optionsItemValue,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // 处理传入了isDeepCopy参数的情况，因为上文中已经读取第一个参数存入target中，如果这个参数传入了一个Boolean值，证明传入了标记是否进行深拷贝的参数，这个参数是可选参数
  if (typeof target === 'boolean'){
    deep = target;

    // 如果传入了isDeepCopy参数，则应该取extend函数第二个参数作为target，默认值是{}
    target = arguments[i] || {};
    i++;
  }

  // 当target不是对象，也不是函数，比如是个字符串或其它的时候 (可能在深拷贝时出现)
  if (typeof target !== 'object' && !myQuery.isFunction(target)){
    target = {};
  }

  // 如果除了isDeepCopy参数之外，其余只传了一个参数的时候，则是对myQuery对象本身进行扩展，注意这里i的处理
  if (i === length){
    target = this; //这里this是myQuery对象
    i--;
  }

  // 用for循环来逐一处理每一个扩展进行的内容对象options
  for (; i<length; i++){
    // 只处理 non-null/undefined options
    if ((options = arguments[i]) != null){ //options表示需要增加的内容的对象
      for (name in options){
        targetItemValue = target[name];
        optionsItemValue = options[name];

        if (optionsItemValue === target){
          // optionsItemValue === target的时候，表示options的某个值是指向 target 的指针，这种值如果扩展进target，会导致循环引用，所以应该忽略掉
          continue; //结束本次循环
        }

        // 如果是深拷贝，而且需要增加的值是plain objects 或者 数组，则进行递归
        if (deep && optionsItemValue && (myQuery.isPlainObject(optionsItemValue) ||
          (copyIsArray = Array.isArray(optionsItemValue)))){

          if (copyIsArray){
            copyIsArray = false;
            clone = targetItemValue && Array.isArray(targetItemValue) ? targetItemValue : [];
          } else{
            clone = targetItemValue && myQuery.isPlainObject(targetItemValue) ? targetItemValue : {};
          }

          // Never move original objects, clone them
          target[name] = myQuery.extend(deep, clone, optionsItemValue);
        } else if (optionsItemValue !== undefined){
          // 不进行深拷贝，或者需要增加的值不是plain objects 和 数组，且不为undefined
          // 注意不能带入undefined
          target[name] = optionsItemValue;
        }
      }
    }
  }

  return target;
};

myQuery.extend({
  // 默认myQuery isReady: true
  isReady: true,

  error: function(msg){
    throw new Error(msg);
  },

  noop: function(){},

  // 将第二个数组的内容合并到第一个数组，合并后第一个数组的将会被修改
  // Support: Android <=4.0 only, PhantomJS 1 only
  // push.apply(_, arraylike) throws on ancient WebKit
  merge: function(first, second){
    var len =  +second.length,
      j = 0,
      i = first.length;

    for (; j < len; j++){
      first[i++] = second[j];
    }

    first.length = i;

    return first;
  },

  isFunction: function(obj){
    // Support: Chrome <=57, Firefox <=52
    // 对于一些浏览器来说，typeof returns "function" for HTML <object> elements
    // 例如, `typeof document.createElement("object") 会返回 "function"`
    // 利用obj.nodeType !== 'number'将节点对象排除在外
    // 最终返回真正的函数
    return typeof obj === 'function' && typeof obj.nodeType !== 'number';
  },

  type: function(obj){
    if (obj == null){
      return obj + '';
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === 'object' || typeof obj === 'function' ?
      class2type[toString.call(obj)] || 'object' :
      typeof obj;
  },

  isNumeric: function(obj){
    // As of myQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = myQuery.type(obj);
    // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    return (type === 'number' || type === 'string') && !isNaN(obj - parseFloat(obj));
  },

  isPlainObject: function(obj){
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of myQuery.type to catch host objects
    if (!obj || toString.call(obj) !== "[object Object]"){
      return false;
    }

    proto = getProto(obj);

    // Objects with no prototype (e.g., `Object.create(null)`) are plain
    if (!proto){
      return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
  },

  isEmptyObject: function(obj){
    /* eslint-disable no-unused-vars */
    // See https://github.com/eslint/eslint/issues/6125
    var name;

    for (name in obj){
      return false;
    }
    return true;
  },

  // Evaluates a script in a global context
  globalEval: function(code){
    DOMEval(code);
  },

  // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (#9572)
  camelCase: function(string){
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  },

  each: function(obj, callback){
    var length, i = 0;

    if (isArrayLike(obj)){
      length = obj.length;
      for (; i < length; i++){
        if (callback.call(obj[i], i, obj[i]) === false){
          break;
        }
      }
    } else{
      for (i in obj){
        if (callback.call(obj[i], i, obj[i]) === false){
          break;
        }
      }
    }

    return obj;
  },

  // Support: Android <=4.0 only
  trim: function(text){
    return text == null ?
      '' :
      (text + '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  },

  // 仅限于本库内部使用
  makeArray: function(arr, results){
    var ret = results || [];

    if (arr != null){
      if (isArrayLike(Object(arr))){
        myQuery.merge(ret,
          typeof arr === "string" ?
            [arr] : arr
        );
      } else{
        push.call(ret, arr);
      }
    }

    return ret;
  },

  /**
   @param {All} value - 任意类型用于查找的值。
   @param {Array} array - 指定被查找的数组。
   @param {Number} fromIndex	可选参数，指定从数组的指定索引位置开始查找，默认为 0。
   */
  inArray: function(elem, arr, i){
    return arr == null ? -1 : indexOf.call(arr, elem, i);
  },

  grep: function(elems, callback, invert){
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for (; i < length; i++){
      callbackInverse = !callback(elems[i], i);
      if (callbackInverse !== callbackExpect){
        matches.push(elems[i]);
      }
    }

    return matches;
  },

  // arg is for internal usage only
  map: function(elems, callback, arg){
    var length, value,
      i = 0,
      ret = [];

    // Go through the array, translating each of the items to their new values
    if (isArrayLike(elems)){
      length = elems.length;
      for (; i < length; i++){
        value = callback(elems[i], i, arg);

        if (value != null){
          ret.push(value);
        }
      }

      // Go through every key on the object,
    } else{
      for (i in elems){
        value = callback(elems[i], i, arg);

        if (value != null){
          ret.push(value);
        }
      }
    }

    // Flatten any nested arrays
    return concat.apply([], ret);
  },

  // A global GUID counter for objects
  guid: 1,

  // Bind a function to a context, optionally partially applying any
  // arguments.
  proxy: function(fn, context){
    var tmp, args, proxy;

    if (typeof context === "string"){
      tmp = fn[context];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if (!myQuery.isFunction(fn)){
      return undefined;
    }

    // Simulated bind
    args = slice.call(arguments, 2);
    proxy = function(){
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || myQuery.guid++;

    return proxy;
  },

  now: Date.now,

  // myQuery.support is not used in Core but other projects attach their
  // properties to it so it needs to exist.
  support: support
});

if (typeof Symbol === 'function'){
  myQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
}

function isArrayLike(obj){

  // Support: real iOS 8.2 only (在模拟器中无法重现)
  // `in` check used to prevent JIT error (https://github.com/jquery/jquery/issues/2145)
  // hasOwn isn't used here due to false negatives
  // regarding Nodelist length in IE
  var length = !!obj && 'length' in obj && obj.length,
    type = myQuery.type(obj);

  if (myQuery.isFunction(obj) || isWindow(obj)){
    return false;
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && (length - 1) in obj;
}

return myQuery;



var handleEventListener = function(){
  var result ={};

  if(typeof window.addEventListener === 'function'){
    result.bindEvent = function (el, event, fn){
      el.addEventListener(event, function(e){
        if(fn() === false){
          e.preventDefault;
          e.cancelBubble = true;
        }
      }, false);
    };

    result.unbindEvent = function (el, event, fn){
      el.removeEventListener(event, fn, false);
    };
  } else if(typeof document.attachEvent === 'function'){
    result.bindEvent = function(el, event, fn){
      el.attachEvent('on'+event, function(e){
        if(fn() === false){
          window.event.cancelBubble = true;
          return false;
        }
      });
    };

    result.unbindEvent = function (el, event, fn){
      el.detachEvent('on'+event, fn);
    };
  } else{
    result.bindEvent = function (el, event, fn){
      el['on'+event] = fn;
    };

    result.unbindEvent = function (el, event, fn){
      el['on'+event] = null;
    };
  };

  return result;
};

function myQuery(args){

};

var $ = function(args){
  return new myQuery(args);
};

myQuery.fn.init = function(){
  this.elements = [];

  switch(typeof args){
    case 'function':
      handleEventListener().bindEvent(window, 'load', args);
      break;
    case 'string':
      this.elements = document.querySelectorAll(args);
      break;
    case 'object':
      this.elements.push(args);
      break;
    default:
      break;
  }

  this.length = this.elements.length || 0;
}

myQuery.fn.trim = function (str){
  var reg = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  if(str == null){
    return '';
  }

  str = str + '';

  if(String.prototype.trim){
    return String.prototype.trim.call(str);
  } else{
    return str.replace(reg, '');
  };
}

prt.isElementNode = function(el){
  return el.nodeType === 1;
}

prt.addClass = function(className){
  this.isElementNode(this);

  if (this.classList){
    this.classList.add(className); //IE10+, Android 3.0+
  } else{
    this.className += ' ' + className;
  }

  return this;
}

prt.after = function(htmlStr){
  this.insertAdjacentHTML('afterend', htmlStr);

  return this;
}

prt.append = function(el){
  this.appendChild(el);
}

prt.children = function(){
  var children = [];

  for(var i = this.children.length; i--;){
    //skip comment elements
    if(this.children[i].nodeType !== 8){
      children.unshift(this.children[i]);
    }
  }

  return this;
}

prt.clone = function(){
  this.cloneNode(true);

  return this;
}

prt.contains = function(child){
  child && this.contains(child);

  return this;
}

prt.find = function(selector){
  var result = this.querySelector(selector);

  result.length = result === null;
  return result;
}

prt.each = function(fn){
  for(var i=0, len=this.length; i<len; i++){
    fn(elements[i], i);
  }
}

prt.html = function (el){
  var that = this;
  var errorMsg = 'myQuery: html函数参数不合法';

  if(typeof el === 'string'){
    prt.innerHTML = el;
  } else{
    that.map(function(item, index){
      try{
        el.cloneNode(true);

        if(el.nodeType !== 1 && el.nodeType !== 9){
          throw new Error(errorMsg);
        } else{
          item.appendChild(el);
        }
      } catch(e){
        throw new Error(errorMsg);
      }
    });
  };

  return this;
};

//扩展对象
$.extend = function(obj){
  for(var i in obj){
    $[i] = obj[i];
  };
};

$.fn = myQuery.prototype;

myQuery.fn.init.prototype = myQuery.fn;    //使用myQuery的原型对象覆盖init的原型对象

//扩展方法
$.fn.extend = function(obj){
  for(var i in obj){
    F.prototype[i] = obj[i];
  }
};

export default $;
