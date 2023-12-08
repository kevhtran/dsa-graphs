class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex)
      }
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS (stack)
  depthFirstSearch(start) {
    let VisitedStack = [start];
    let seen = new Set(VisitedStack);
    let arrayOfNodes = []
    // go through the stack
    while (VisitedStack.length) {
      let currentNode = VisitedStack.pop();
      arrayOfNodes.push(currentNode.value);

      for (let adjacent of currentNode.adjacent) {
        if (!seen.has(adjacent)) {
          seen.add(adjacent);
          VisitedStack.push(adjacent);
        }
      }

    }
    return arrayOfNodes
  }

  // this function returns an array of Node values using BFS (queue)
  breadthFirstSearch(start) {
    let VisitedQueue = [start];
    let seen = new Set(VisitedQueue);
    const result = [];

    while (VisitedQueue.length) {
      let currentNode = VisitedQueue.shift();
      result.push(currentNode.value)

      for (let neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          VisitedQueue.push(neighbor)
          seen.add(neighbor)
        }

      }

    }
    return result;
  }
  shortestPath(start, end) {
    // if start === end then there is no need to search for the path
    if (start === end) {
      return [start.value];
    }

    let queue = [[start, 0]];
    let visited = new Set(queue);
    let path = [];

    while (queue.length) {
      let [currentNode, distance] = queue.shift();
      path.push([currentNode.value, distance])

      for (let neighbor of currentNode.adjacent) {
        if (!visited.has(neighbor)) {
          queue.push([neighbor, distance + 1])
          visited.add(neighbor)
        }

      }

    }


    return path


  }
  // shortestPath(start, end) {
  //   if (start === end) {
  //     return [start.value];
  //   }

  //   var queue = [start];
  //   let visited = new Set();
  //   let predecessors = {};
  //   let path = [];

  //   while (queue.length) {
  //     let currentVertex = queue.shift();

  //     if (currentVertex === end) {
  //       console.log(currentVertex.value)
  //       console.log("predecessors", predecessors)
  //       console.log("predecessors[end.value] before", predecessors[end.value])
  //       let stop = predecessors[end.value];
  //       console.log("predecessors[end.value] after / stop", predecessors[end.value])
  //       while (stop) {
  //         console.log("path", path)
  //         path.push(stop);
  //         stop = predecessors[stop];
  //       }
  //       path.reverse();
  //       path.push(currentVertex.value);
  //       return path;
  //     }

  //     visited.add(currentVertex);
  //     for (let vertex of currentVertex.adjacent) {
  //       if (!visited.has(vertex)) {
  //         predecessors[vertex.value] = currentVertex.value;
  //         queue.push(vertex);
  //       }
  //     }
  //   }
  // }
}

module.exports = { Graph, Node }