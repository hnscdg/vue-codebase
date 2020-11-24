## 组件介绍

组件是可复用的Vue实例，且带有一个名字。它与`new Vue`接收相同的选项例如`data`,`computed`,`watch`,`methods`,以及生命周期钩子等。另外像`el`,这样的根实例才有该属性。

```javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

### 组件复用

组件可以任意次数的复用

```javascript
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

点击按钮的时候，每个组件会独自维护自己的`count`。因为每次使用组件时，都会重新创建实例。

### 组件的命名规则

在注册组件时，我们始终需要给组件起一个名字。比如在全局注册的时候如下：

```javascript
Vue.component('my-component', { /* ... */ })
```

该组件的名字就是`Vue.component`的第一个参数。组件名的写法有两种：

1. 使用kebab-case

   ```javascript
   Vue.component('my-component-name', { /* ... */ })
   ```

2. 使用PascalCase

   ```javascript
   Vue.component('MyComponentName', { /* ... */ })
   ```

### data 必须是一个函数

一个组件的`data`选项必须是**一个函数**，这样的目的组件被多次的引用时，数据是独立的不会相互影响。

### 组件的组织

通常一个应用会以一颗嵌套的组件树的形式来组织：

![Component Tree](https://cn.vuejs.org/images/components.png)

为了能在模板中使用组件，这些组件必须首先注册以便Vue能识别。Vue组件的注册类型有两种：全局注册和局部注册。

- 全局注册组件的方法

  ```hmtl
  <div id="example">
  	<my-component-name></my-component-name>
  	/* 转换成以下格式 */
  	/* <div>A customer component!</div>*/
  </div>
  ```

  ```javascript
  // 注册
  Vue.component('my-component-name', {
      template: '<div>A customer component!</div>'
  })
  
  var vm = new Vue({
      el: '#example',
      data: {
          // ... options ...
      }
  });
  ```

- 通过全局API来注册组件

  ```javascript
  // definitation
  var MyComponet = Vue.extend({
      template: '<div>A custome component!</div>'
  });
  // register
  Vue.component('my-component', MyComponent);
  ```

- 局部注册组件的方法

可通过某个Vue实例/组件的实例选项components注册局部组件，在这种情况下全局不可用

```javascript
var ChildA = { template: '<div> A child component!</div>' }
var ChildB = { /* ... */ }
var ChildC = { /* ... */ }

new Vue({
    // ...
    components: {
        // 在这种情况下，<my-component>组件只能在父组件中可用
        'child-a': ChildA,
        'child-b': ChildB,
        'child-c': ChildC
    },
});
```

对于`components`对象中的每个property来说，其property名就是自定义的名字，其property值就是这个组件的选项对象。