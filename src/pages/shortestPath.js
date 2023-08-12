
export function shortestPath(source, destination, v,e,g){
    const PriorityQueue = require('priorityqueuejs');
    let adj = []

    // creating an adjacency list

    for(let i = 0; i < v; i++){
        adj.push([])
    }

    for(let i = 0; i < e; i++){                

        adj[g[i][0]].push([g[i][1],g[i][2]])
        adj[g[i][1]].push([g[i][0],g[i][2]])
        
    }
    
    // creating priority queue
    let pq = new PriorityQueue((a, b) => a.weight - b.weight) 
    
    // creating distance array and the parent array
    let dist = []
    let parent = []

    // setting the distances to infinite and parent to it index value
    for(let i = 0;i < v; i++){
        dist[i] = 1e9
        parent[i] = i
    }

    
    // the distance from source to itself will be zero
    dist[source] = 0
    
    // add it to queue (weight, node)
    pq.enq([0,source])

    while(!pq.isEmpty()){
        
        let [dis,node] = pq.deq()
        
        for(let i = 0; i < adj[node].length; i++){

            
            
            let adjNode = adj[node][i][0]
            let edgeWeight = adj[node][i][1]
            
            if(dis + edgeWeight < dist[adjNode]){
                dist[adjNode] = dis + edgeWeight
                pq.enq([dis + edgeWeight, adjNode])
                parent[adjNode] = node
            }
        }
    }

    let shortestPath = []
    
    if(dist[v] === 1e9){
        shortestPath.push(-1)
        return shortestPath
    }
    
    let node = destination
    
    while(parent[node] !== node){
        shortestPath.push(node)
        node = parent[node]
    }

    shortestPath.push(source)
    
    shortestPath.reverse()
    return shortestPath
}
