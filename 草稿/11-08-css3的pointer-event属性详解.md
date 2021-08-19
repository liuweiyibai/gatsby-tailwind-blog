---
title: css3 的 pointer-event 属性详解
date: 2020-11-08 18:54:58
category:
  - 编程笔记
tags: ['css3']
slug: pointer-to-the-event-attributes-rounding
thumbnail: '../../thumbnails/css3.png'
---

`pointer-events` 是 `css3` 中的属性，作用是设置或检索在何时成为属性事件的 `target`

## 属性取值

1. `pointer-event:auto;` (默认值)，对于 `svg` 元素，该值与 `visiblePainted` 效果相同

2. `pointer-event:none;` 元素不会成为鼠标事件的 `target`

3. `pointer-event:visiblePainted;` 只适用于 `SVG` 元素，元素只有在以下情况才会成为鼠标事件的目标：

   - `visibility` 属性值：`visible`，且鼠标指针在元素内部，且 `fill` 属性值非 `none`
   - `visibility` 属性值：`visible`，鼠标指针在元素边界上，且 `stroke` 属性值非 `none`

4. `pointer-event:visibleFill;` 只适用于 `SVG` 元素，元素只有在以下情况才会成为鼠标事件的目标：

   - `visibility` 属性值：`visible`，且鼠标指针在元素内部

5. `pointer-event:visibleStroke;` 只适用于 `SVG` 元素，元素只有在以下情况才会成为鼠标事件的目标：

   - `visibility` 属性值：`visible`，且鼠标指针在元素边界

6. `pointer-event:visible;` 只适用于 `SVG` 元素，元素只有在以下情况才会成为鼠标事件的目标：

   - `visibility` 属性值：`visible`，且鼠标指针在元素内部或边界

7. `pointer-event:fill;` 只适用于 `SVG` 元素，元素只有在以下情况才会成为鼠标事件的目标：

   - 只有鼠标指针在元素内部时

8. `pointer-event:stroke;` 只适用于 `SVG` 元素，元素只有在以下情况才会成为鼠标事件的目标：

   - 只有鼠标指针在元素边界上时

9. `pointer-event:stroke;` 只适用于 `SVG` 元素，元素只有在以下情况才会成为鼠标事件的目标：

   - 只有鼠标指针在元素内部或边界时

## 注意

父元素如果设置了 `pointer-event:none` 并不意味着父元素上的事件侦听器永远不会被触发，当子元素上设置 `pointer-event` 值不是 `none`，那么都可以通过事件传播机制来触发父元素上的事件

## **pointer-event:none** 的应用场景

1. 任何元素设置 `pointer-event：none` 的效果相当于 `input[type=text|button|radio|checkbox]` 设置 `disabled` 属性，可以实现事件的禁用，例如：

   ```html
   <a href="xxxxxx" style="pointer-events: none">click me</a>
   <!--
     这个链接，是点不了的，并且 hover 也没有效果，但是可以通过 tab 来选中该元素，并按下 enter 键来触发链接，当 href 属性去掉，就不能通过 tab 进行触发
    -->
   ```

2. 当要禁用 `select` 下拉框可以设置 `pointer-event:none`

3. 当很多元素需要定位在一个地图层上面，需用到绝对定位、相对定位的元素，这样的话，这些元素就会盖住下面的地图层，以至于地图层无法操作。这时元素设置 `pointer-events:none`，然后地图就可以拖动和点击了。但是操作区域本身却无法操作了，可以再给需要操作的元素区域设置为 `pointer-events:auto`
