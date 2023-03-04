interface ITreeItem<T> {
  id: string;
  parentId: string;
  children?: T[];
  [key: string]: any;
}

// interface ITree {
//   children?: any[]
// }

interface ITreeProps {
  id: string;
  parentId: string;
  children: string;
}
const defaultProps = {
  id: "id",
  parentId: "parentId",
  children: "children",
};

/**
 * 广度优先遍历
 */
export function treeForEach<T extends ITreeItem<T>>(
  tree: T[],
  func: (node: T) => void
) {
  const list = [...tree];
  let node = list.shift();
  while (node) {
    func(node);
    node.children && list.push(...node.children);
    node = list.shift();
  }
}

/**
 * 深度优先遍历 先序遍历
 */
export function treeDeepForEach<T extends ITreeItem<T>>(
  tree: T[],
  func: (node: T) => void
) {
  tree.forEach((node) => {
    func(node);
    node.children && treeDeepForEach(node.children, func);
  });
}

/**
 * 深度优先遍历 后序遍历
 */
// export function treeForEach2(tree, func) {
//   tree.forEach(node => {
//     node.children && treeForEach2(node.children, func)
//     func(node)
//   })
// }

/**
 * 深度优先 先序遍历 循环
 */
// export function treeForEach3(tree, func) {
//   const list = [...tree]
//   let node = list.shift()
//   while (node) {
//     func(node)
//     node.children && list.unshift(...node.children)
//     node = list.shift()
//   }
// }

/**
 * 列表转换成树结构
 */
export function listToTree(list: any[], treeProps?: ITreeProps): any[] {
  const props: ITreeProps = {
    ...defaultProps,
    ...treeProps,
  };
  const info = list.reduce((map, node) => {
    map[node[props.id]] = node;
    node[props.children] = [];
    return map;
  }, <any>{});

  return list.filter((node) => {
    info[node[props.parentId]] &&
      info[node[props.parentId]][props.children].push(node);
    return !node[props.parentId];
  });
}

/**
 * 树结构 转成 列表结构
 */
// export function treeToList(tree) {
//   const result = tree.map(node => {
//     node.level = 1
//     return node
//   })

//   for (let i = 0; i < result.length; i++) {
//     if (!result[i].children) continue
//     const list = result[i].children.map(node => {
//       node.level = result[i].level + 1
//       return node
//     })
//     result.splice(i + 1, 0, ...list)
//   }

//   return result
// }

/**
 * 树结构筛选
 */
// export function treeFilter(tree, func) {
//   return tree
//     .map(node => ({ ...node }))
//     .filter(node => {
//       node.children = node.children && treeFilter(node.children, func)
//       return func(node) || (node.children && node.children.length)
//     })
// }

/**
 * 树结构查找
 */
export function treeFind<T extends ITreeItem<T>>(
  tree: T[],
  func: (node: T) => boolean,
  props = { children: "children" }
): T | null {
  for (const node of tree) {
    if (func(node)) return node;
    if (node[props.children]) {
      const res = treeFind(node[props.children], func, props);
      if (res) return res;
    }
  }
  return null;
}

/**
 * 查找路径
 */
export function treeFindPath<T extends ITreeItem<T>>(
  tree: T[],
  func: (node: T) => boolean,
  path: any[] = [],
  treeProps?: ITreeProps
): any {
  const props: ITreeProps = {
    ...defaultProps,
    ...treeProps,
  };
  if (!tree) return [];

  for (const node of tree) {
    path.push(node);
    if (func(node)) return path;
    if (node[props.children]) {
      const findChildren = treeFindPath(
        node[props.children],
        func,
        path,
        props
      );
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}
