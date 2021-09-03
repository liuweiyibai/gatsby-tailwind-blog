var a1 = {
  key: 1,
  tag: 'li',
  elm: 'aaa1',
};
var a2 = {
  key: 2,
  tag: 'li',
  elm: 'aaa2',
};
var a3 = {
  key: 3,
  tag: 'li',
  elm: 'aaa3',
};
var a4 = {
  key: 4,
  tag: 'li',
  elm: 'aaa4',
};

var a5 = {
  key: 5,
  tag: 'li',
  elm: 'aaa5',
};

var a6 = {
  key: 6,
  tag: 'li',
  elm: 'aaa6',
};

var nodeOps = {
  findIndex: function (target, parent) {
    return parent.findIndex(item => item === target);
  },
  delete: function (target, parent) {
    const index = nodeOps.findIndex(target, parent);
    console.log('删除', index > -1);
    if (index > -1) {
      parent.splice(index, 1);
    }
  },
  insertBefore: function (parent, target, sibling) {
    nodeOps.delete(target, parent);
    if (sibling) {
      const index = nodeOps.findIndex(sibling, parent);
      parent.splice(index, 0, target);
    } else {
      parent.push(target);
    }
  },
  createElement: function (tagName, vnode) {
    return document.createElement(tagName);
  },
  isParentNode: function (target, parent) {
    return parent.includes(target);
  },
  appendChild: function (target, parent) {
    parent.push(target);
  },
  sibling: function (target, parent) {
    const index = nodeOps.findIndex(target, parent);
    return parent[index + 1];
  },
};

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

function insert(parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (nodeOps.isParentNode(ref, parent)) {
        nodeOps.insertBefore(parent, elm, ref);
      }
    } else {
      nodeOps.appendChild(parent, elm);
    }
  }
}

function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
  console.log('新建node');
  if (isDef(vnode) && isDef(ownerArray)) {
    // This vnode was used in a previous render!
    // now it's used as a new node, overwriting its elm would cause
    // potential patch errors down the road when it's used as an insertion
    // reference node. Instead, we clone the node on-demand before creating
    // associated DOM element for it.
    vnode = ownerArray[index] = cloneVNode(vnode);
  }
  var children = vnode.children;
  {
    insert(parentElm, vnode, refElm);
  }
}

function cloneVNode(vnode) {
  const cloned = JSON.parse(JSON.stringify(vnode));
  cloned.isCloned = true;
  return cloned;
}

function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
  }
}

function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    if (isDef(ch)) {
      if (isDef(ch.tag)) {
        console.log('删除相关操作', ch);
        nodeOps.delete(ch, parentElm);
      } else {
        // Text node
        removeNode(ch.elm);
      }
    }
  }
}

function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
  if (oldVnode === vnode) {
    return;
  }
  if (isDef(vnode) && isDef(ownerArray)) {
    console.log('clone ', vnode);
    // clone reused vnode
    vnode = ownerArray[index] = cloneVNode(vnode);
  }

  var elm = (vnode.elm = oldVnode.elm);
  var oldCh = oldVnode.children;
  var ch = vnode.children;
  if (isDef(oldCh) && isDef(ch)) {
    if (oldCh !== ch) {
      updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
    }
  }
}

function isSameNode(oldVnode, newVnode) {
  return isSameContentNode(oldVnode, newVnode);
}

function getVnodeContent(vnode) {
  const content = Object.assign({}, vnode);
  delete content.key;
  return content;
}
// 简单的用字符串来比较。
function isSameContentNode(oldVnode, newVnode) {
  return JSON.stringify(getVnodeContent(oldVnode)) === JSON.stringify(getVnodeContent(newVnode));
}

function findIdxInOld(node, oldCh, start, end) {
  for (var i = start; i < end; i++) {
    var c = oldCh[i];
    if (isDef(c) && sameVnode(node, c)) {
      return i;
    }
  }
}

function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  function printIndex() {
    console.log('old=', oldStartIdx, oldEndIdx, '; new=', newStartIdx, newEndIdx);
  }
  let oldStartIdx = 0,
    oldEndIdx = oldCh.length - 1,
    newStartIdx = 0,
    newEndIdx = newCh.length - 1,
    oldKeyToIdx,
    vnodeToMove;
  let oldStartVnode = oldCh[oldStartIdx],
    oldEndVnode = oldCh[oldEndIdx],
    newStartVnode = newCh[newStartIdx],
    newEndVnode = newCh[newEndIdx];
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    printIndex();
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (oldStartVnode === newStartVnode) {
      console.log('首首相同，平移');
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (oldEndVnode === newEndVnode) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
      console.log('尾尾相同，平移');
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (oldStartVnode == newEndVnode) {
      console.log('首尾相同，右移动');
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
      nodeOps.insertBefore(parentElm, oldStartVnode, nodeOps.sibling(oldEndVnode, parentElm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (oldEndVnode == newStartVnode) {
      console.log('尾兽相同，左移动');
      patchVnode(oldEndVnode, oldStartVnode, insertedVnodeQueue, newCh, newStartIdx);
      nodeOps.insertBefore(parentElm, oldEndVnode, oldStartVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      console.log('无法简单移动');
      if (!oldKeyToIdx) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      var idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
      if (isUndef(idxInOld)) {
        console.log('无key');
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode, false, newCh, newStartIdx);
      } else {
        vnodeToMove = oldCh[idxInOld];
        if (isSameContentNode(vnodeToMove, newStartVnode)) {
          console.log('有key：可以直接移动');
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldCh[idxInOld] = undefined;
          nodeOps.insertBefore(parentElm, cloneVNode(vnodeToMove), oldStartVnode);
        } else {
          console.log('有key：但是没用');
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode, false, newCh, newStartIdx);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  printIndex();
  console.log('while完毕');
  if (oldStartIdx > oldEndIdx) {
    console.log('需要新增');
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
  } else if (newStartIdx > newEndIdx) {
    console.log('需要删除');
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}

function generateElm(children) {
  var elm = document.createElement('ul');
  children.forEach(child => {
    var childElm = document.createElement(child.tag);
    childElm.append(document.createTextNode(child.text));
    elm.append(childElm);
  });
  return elm;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

var oldVnode = {
  tag: 'ul',
  elm: [a1, a2, a3, a4],
  children: [a1, a2, a3, a4],
};

var newVnode = {
  tag: 'ul',
  elm: [a3, a2, a4, a1],
  children: [a3, a2, a4, a1],
};

// var newVnode = {
//   tag: "ul",
//   elm: [a4, a3, a1],
//   children: [a4, a3, a1]
// };

// var newVnode = {
//  tag: "ul",
//  children: [a5, a4, a1, a1, a5, a2, a2]
//};

patchVnode(oldVnode, newVnode);
console.log(newVnode);
